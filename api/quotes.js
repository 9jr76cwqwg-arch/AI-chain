const CACHE_SECONDS = 60;
const PROVIDER = "Financial Modeling Prep";
const MAX_BATCH_SIZE = 12;

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", `s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS * 4}`);
  res.end(JSON.stringify(payload));
}

function cleanSymbols(value) {
  return [...new Set(
    String(value || "")
      .split(",")
      .map((symbol) => symbol.trim().toUpperCase())
      .filter((symbol) => /^[A-Z0-9.-]{1,12}$/.test(symbol))
  )].slice(0, 120);
}

function numberOrNull(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function firstNumber(...values) {
  for (const value of values) {
    const number = numberOrNull(value);
    if (number !== null) return number;
  }
  return null;
}

function normalizeFmpQuote(item) {
  return {
    symbol: item.symbol,
    name: item.name ?? item.companyName ?? null,
    price: firstNumber(item.price, item.previousClose, item.open),
    marketCap: firstNumber(item.marketCap, item.marketCapitalization),
    pe: firstNumber(item.pe, item.peRatio, item.priceEarningsRatio, item.priceEarningsRatioTTM, item.peRatioTTM),
    eps: firstNumber(item.eps, item.epsTTM),
    change: firstNumber(item.change, item.priceChange),
    changesPercentage: firstNumber(item.changesPercentage, item.changePercentage, item.priceChangePercentage),
    dayLow: firstNumber(item.dayLow, item.low),
    dayHigh: firstNumber(item.dayHigh, item.high),
    yearLow: firstNumber(item.yearLow, item.low52Week),
    yearHigh: firstNumber(item.yearHigh, item.high52Week),
    volume: firstNumber(item.volume),
    exchange: item.exchange ?? item.exchangeShortName ?? null,
    timestamp: firstNumber(item.timestamp)
  };
}

function chunkSymbols(symbols, size) {
  const chunks = [];
  for (let index = 0; index < symbols.length; index += size) {
    chunks.push(symbols.slice(index, index + size));
  }
  return chunks;
}

async function fetchStableQuote(symbols, apiKey) {
  const url = new URL("https://financialmodelingprep.com/stable/quote");
  url.searchParams.set("symbol", symbols.join(","));
  url.searchParams.set("apikey", apiKey);

  const upstream = await fetch(url, {
    headers: {
      "Accept": "application/json",
      "User-Agent": "AI-Value-Chain-Terminal/1.0"
    }
  });

  const text = await upstream.text();
  let payload;
  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    payload = { raw: text.slice(0, 240) };
  }

  if (!upstream.ok) {
    const providerMessage = payload?.["Error Message"] || payload?.error || payload?.message || upstream.statusText;
    const error = new Error(`Quote provider returned HTTP ${upstream.status}`);
    error.status = upstream.status;
    error.providerMessage = providerMessage;
    throw error;
  }

  return Array.isArray(payload) ? payload.map(normalizeFmpQuote) : [];
}

async function fetchQuotesResilient(symbols, apiKey) {
  const quotes = [];
  const errors = [];

  async function trySymbols(group) {
    try {
      const result = await fetchStableQuote(group, apiKey);
      quotes.push(...result);
      const returned = new Set(result.map((quote) => quote.symbol));
      group
        .filter((symbol) => !returned.has(symbol))
        .forEach((symbol) => errors.push({
          symbol,
          status: 204,
          message: "No quote returned by provider"
        }));
    } catch (error) {
      if (group.length > 1 && error.status === 402) {
        await Promise.all(group.map((symbol) => trySymbols([symbol])));
        return;
      }

      group.forEach((symbol) => errors.push({
        symbol,
        status: error.status ?? 502,
        message: error.providerMessage || error.message || "Quote provider failed"
      }));
    }
  }

  for (const group of chunkSymbols(symbols, MAX_BATCH_SIZE)) {
    await trySymbols(group);
  }

  return { quotes, errors };
}

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  const symbols = cleanSymbols(req.query.symbols);
  if (!symbols.length) {
    sendJson(res, 400, { error: "Missing symbols" });
    return;
  }

  const apiKey = process.env.FMP_API_KEY;
  if (!apiKey) {
    sendJson(res, 200, {
      configured: false,
      provider: PROVIDER,
      asOf: new Date().toISOString(),
      quotes: [],
      errors: [],
      message: "Set FMP_API_KEY in Vercel environment variables to enable live price, market cap and P/E."
    });
    return;
  }

  try {
    const { quotes, errors } = await fetchQuotesResilient(symbols, apiKey);

    sendJson(res, 200, {
      configured: true,
      provider: PROVIDER,
      asOf: new Date().toISOString(),
      requested: symbols.length,
      returned: quotes.length,
      quotes,
      errors
    });
  } catch (error) {
    sendJson(res, 200, {
      configured: true,
      provider: PROVIDER,
      asOf: new Date().toISOString(),
      quotes: [],
      errors: symbols.map((symbol) => ({
        symbol,
        status: error.status ?? 502,
        message: error.providerMessage || error.message || "Quote provider failed"
      })),
      error: error instanceof Error ? error.message : "Quote provider failed"
    });
  }
};
