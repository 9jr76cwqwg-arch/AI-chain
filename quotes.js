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
  if (value === null || value === undefined || value === "") return null;
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

function normalizeFmpQuote(item, source = "quote") {
  return {
    symbol: item.symbol,
    name: item.name ?? item.companyName ?? null,
    price: firstNumber(item.price, item.previousClose, item.open, item.priceAvg50),
    marketCap: firstNumber(item.marketCap, item.marketCapitalization, item.mktCap),
    pe: firstNumber(
      item.pe,
      item.peRatio,
      item.priceEarningsRatio,
      item.priceEarningsRatioTTM,
      item.priceToEarningsRatio,
      item.priceToEarningsRatioTTM,
      item.peRatioTTM
    ),
    eps: firstNumber(item.eps, item.epsTTM),
    change: firstNumber(item.change, item.priceChange),
    changesPercentage: firstNumber(item.changesPercentage, item.changePercentage, item.priceChangePercentage),
    dayLow: firstNumber(item.dayLow, item.low),
    dayHigh: firstNumber(item.dayHigh, item.high),
    yearLow: firstNumber(item.yearLow, item.low52Week),
    yearHigh: firstNumber(item.yearHigh, item.high52Week),
    volume: firstNumber(item.volume),
    exchange: item.exchange ?? item.exchangeShortName ?? null,
    timestamp: firstNumber(item.timestamp),
    source
  };
}

function mergeQuotes(base, overlay) {
  if (!base) return overlay;
  if (!overlay) return base;
  return {
    ...base,
    ...overlay,
    symbol: base.symbol ?? overlay.symbol,
    name: base.name ?? overlay.name,
    price: firstNumber(base.price, overlay.price),
    marketCap: firstNumber(base.marketCap, overlay.marketCap),
    pe: firstNumber(base.pe, overlay.pe),
    eps: firstNumber(base.eps, overlay.eps),
    change: firstNumber(base.change, overlay.change),
    changesPercentage: firstNumber(base.changesPercentage, overlay.changesPercentage),
    dayLow: firstNumber(base.dayLow, overlay.dayLow),
    dayHigh: firstNumber(base.dayHigh, overlay.dayHigh),
    yearLow: firstNumber(base.yearLow, overlay.yearLow),
    yearHigh: firstNumber(base.yearHigh, overlay.yearHigh),
    volume: firstNumber(base.volume, overlay.volume),
    exchange: base.exchange ?? overlay.exchange,
    timestamp: firstNumber(base.timestamp, overlay.timestamp),
    source: base.source === overlay.source ? base.source : `${base.source}+${overlay.source}`
  };
}

function chunkSymbols(symbols, size) {
  const chunks = [];
  for (let index = 0; index < symbols.length; index += size) {
    chunks.push(symbols.slice(index, index + size));
  }
  return chunks;
}

async function fetchFmpJson(path, params, apiKey) {
  const url = new URL(`https://financialmodelingprep.com${path}`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
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

  if (!upstream.ok || payload?.["Error Message"]) {
    const providerMessage = payload?.["Error Message"] || payload?.error || payload?.message || upstream.statusText;
    const error = new Error(`Quote provider returned HTTP ${upstream.status}`);
    error.status = upstream.status;
    error.providerMessage = providerMessage;
    throw error;
  }

  return payload;
}

function normalizeFmpArray(payload, source) {
  if (!Array.isArray(payload)) return [];
  return payload
    .filter((item) => item && item.symbol)
    .map((item) => normalizeFmpQuote(item, source));
}

async function fetchBatchQuote(symbols, apiKey) {
  const payload = await fetchFmpJson("/stable/batch-quote", { symbols: symbols.join(",") }, apiKey);
  return normalizeFmpArray(payload, "batch-quote");
}

async function fetchStockQuote(symbol, apiKey) {
  const payload = await fetchFmpJson("/stable/quote", { symbol }, apiKey);
  return normalizeFmpArray(payload, "quote")[0] ?? null;
}

async function fetchQuoteShort(symbol, apiKey) {
  const payload = await fetchFmpJson("/stable/quote-short", { symbol }, apiKey);
  return normalizeFmpArray(payload, "quote-short")[0] ?? null;
}

async function fetchProfileQuote(symbol, apiKey) {
  const payload = await fetchFmpJson("/stable/profile", { symbol }, apiKey);
  return normalizeFmpArray(payload, "profile")[0] ?? null;
}

async function fetchKeyMetricsTtm(symbol, apiKey) {
  const payload = await fetchFmpJson("/stable/key-metrics-ttm", { symbol }, apiKey);
  const item = Array.isArray(payload) ? payload[0] : payload;
  if (!item || typeof item !== "object") return null;
  return normalizeFmpQuote({ symbol, ...item }, "key-metrics-ttm");
}

async function fetchSingleWithFallback(symbol, apiKey) {
  const errors = [];
  let quote = null;

  for (const attempt of [
    () => fetchStockQuote(symbol, apiKey),
    () => fetchQuoteShort(symbol, apiKey),
    () => fetchProfileQuote(symbol, apiKey),
    () => fetchKeyMetricsTtm(symbol, apiKey)
  ]) {
    try {
      const next = await attempt();
      if (next) quote = mergeQuotes(quote, next);
      if (quote?.price && quote?.marketCap && quote?.pe) break;
    } catch (error) {
      errors.push({
        status: error.status ?? 502,
        message: error.providerMessage || error.message || "Quote provider failed"
      });
    }
  }

  if (quote) return quote;

  const lastError = errors[errors.length - 1] ?? {
    status: 204,
    message: "No quote returned by provider"
  };
  const error = new Error(lastError.message);
  error.status = lastError.status;
  error.providerMessage = lastError.message;
  throw error;
}

async function fetchQuotesResilient(symbols, apiKey) {
  const quotes = [];
  const errors = [];

  async function trySymbols(group) {
    try {
      const result = await fetchBatchQuote(group, apiKey);
      quotes.push(...result);
      const returned = new Set(result.map((quote) => quote.symbol));
      const missing = group.filter((symbol) => !returned.has(symbol));
      if (missing.length) {
        if (group.length > 1) {
          await Promise.all(missing.map((symbol) => trySymbols([symbol])));
          return;
        }

        const symbol = group[0];
        try {
          const quote = await fetchSingleWithFallback(symbol, apiKey);
          quotes.push(quote);
        } catch (fallbackError) {
          errors.push({
            symbol,
            status: fallbackError.status ?? 204,
            message: fallbackError.providerMessage || fallbackError.message || "No quote returned by provider"
          });
        }
      }
    } catch (error) {
      if (group.length > 1) {
        await Promise.all(group.map((symbol) => trySymbols([symbol])));
        return;
      }

      const symbol = group[0];
      try {
        const quote = await fetchSingleWithFallback(symbol, apiKey);
        quotes.push(quote);
      } catch (fallbackError) {
        errors.push({
          symbol,
          status: fallbackError.status ?? error.status ?? 502,
          message: fallbackError.providerMessage || fallbackError.message || error.providerMessage || error.message || "Quote provider failed"
        });
      }
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
