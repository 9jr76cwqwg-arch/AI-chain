const CACHE_SECONDS = 60 * 60 * 6;
const PROVIDER = "Financial Modeling Prep";

const FREE_PLAN_SUPPORTED_SYMBOLS = new Set([
  "NVDA",
  "AMD",
  "TSM",
  "MSFT",
  "GOOGL",
  "AMZN",
  "META",
  "PLTR",
  "TSLA",
  "INTC",
  "CSCO",
  "ADBE",
  "BABA",
  "BIDU"
]);

function sendJson(res, status, payload, cacheControl) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", cacheControl ?? `s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS * 4}`);
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

function providerMessage(payload, fallback) {
  return payload?.["Error Message"] || payload?.error || payload?.message || fallback || "Quote provider failed";
}

function normalizeFmpQuote(item) {
  return {
    symbol: item.symbol,
    name: item.name ?? item.companyName ?? null,
    price: firstNumber(item.price, item.previousClose, item.open),
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
    timestamp: firstNumber(item.timestamp)
  };
}

async function fetchStableQuotes(symbols, apiKey) {
  if (!symbols.length) return [];

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

  if (!upstream.ok || payload?.["Error Message"]) {
    const error = new Error(`Quote provider returned HTTP ${upstream.status}`);
    error.status = upstream.status;
    error.providerMessage = providerMessage(payload, upstream.statusText);
    throw error;
  }

  return Array.isArray(payload) ? payload.filter((item) => item?.symbol).map(normalizeFmpQuote) : [];
}

function skippedErrors(symbols) {
  return symbols.map((symbol) => ({
    symbol,
    status: 402,
    skipped: true,
    message: "Skipped on FMP Free Plan to protect the 250-call daily quota."
  }));
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
      requested: symbols.length,
      eligible: 0,
      returned: 0,
      skipped: symbols.length,
      rateLimited: false,
      quotes: [],
      errors: [],
      message: "Set FMP_API_KEY in Vercel environment variables to enable live price, market cap and P/E."
    });
    return;
  }

  const eligibleSymbols = symbols.filter((symbol) => FREE_PLAN_SUPPORTED_SYMBOLS.has(symbol));
  const skippedSymbols = symbols.filter((symbol) => !FREE_PLAN_SUPPORTED_SYMBOLS.has(symbol));

  try {
    const quotes = await fetchStableQuotes(eligibleSymbols, apiKey);
    const returned = new Set(quotes.map((quote) => quote.symbol));
    const missingEligible = eligibleSymbols.filter((symbol) => !returned.has(symbol));

    const payload = {
      configured: true,
      provider: PROVIDER,
      planMode: "free-plan-safe",
      asOf: new Date().toISOString(),
      requested: symbols.length,
      eligible: eligibleSymbols.length,
      returned: quotes.length,
      skipped: skippedSymbols.length,
      rateLimited: false,
      quotes,
      errors: [
        ...skippedErrors(skippedSymbols),
        ...missingEligible.map((symbol) => ({
          symbol,
          status: 204,
          message: "No quote returned by provider."
        }))
      ]
    };

    sendJson(res, 200, payload);
  } catch (error) {
    const rateLimited = error.status === 429;

    const payload = {
      configured: true,
      provider: PROVIDER,
      planMode: "free-plan-safe",
      asOf: new Date().toISOString(),
      requested: symbols.length,
      eligible: eligibleSymbols.length,
      returned: 0,
      skipped: skippedSymbols.length,
      rateLimited,
      quotes: [],
      errors: [
        ...eligibleSymbols.map((symbol) => ({
          symbol,
          status: error.status ?? 502,
          message: error.providerMessage || error.message || "Quote provider failed"
        })),
        ...skippedErrors(skippedSymbols)
      ],
      error: error instanceof Error ? error.message : "Quote provider failed"
    };

    sendJson(res, 200, payload, rateLimited ? "no-store, max-age=0" : undefined);
  }
};
