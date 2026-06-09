const CACHE_SECONDS = 60;

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", `s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS * 4}`);
  res.end(JSON.stringify(payload));
}

function cleanSymbols(value) {
  return String(value || "")
    .split(",")
    .map((symbol) => symbol.trim().toUpperCase())
    .filter((symbol) => /^[A-Z0-9.-]{1,12}$/.test(symbol))
    .slice(0, 120);
}

function numberOrNull(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function normalizeFmpQuote(item) {
  return {
    symbol: item.symbol,
    name: item.name ?? null,
    price: numberOrNull(item.price),
    marketCap: numberOrNull(item.marketCap),
    pe: numberOrNull(item.pe),
    eps: numberOrNull(item.eps),
    change: numberOrNull(item.change),
    changesPercentage: numberOrNull(item.changesPercentage),
    dayLow: numberOrNull(item.dayLow),
    dayHigh: numberOrNull(item.dayHigh),
    yearLow: numberOrNull(item.yearLow),
    yearHigh: numberOrNull(item.yearHigh),
    volume: numberOrNull(item.volume),
    exchange: item.exchange ?? null,
    timestamp: numberOrNull(item.timestamp)
  };
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
      provider: "Financial Modeling Prep",
      asOf: new Date().toISOString(),
      quotes: [],
      message: "Set FMP_API_KEY in Vercel environment variables to enable live price, market cap and P/E."
    });
    return;
  }

  const url = `https://financialmodelingprep.com/stable/quote?symbol=${encodeURIComponent(symbols.join(","))}&apikey=${encodeURIComponent(apiKey)}`;
  try {
    const upstream = await fetch(url, {
      headers: {
        "Accept": "application/json",
        "User-Agent": "AI-Value-Chain-Terminal/1.0"
      }
    });

    if (!upstream.ok) {
  console.log("FMP error:", upstream.status);

  sendJson(res, 200, {
    configured: true,
    provider: "Financial Modeling Prep",
    quotes: [],
    error: `Quote provider returned HTTP ${upstream.status}`
  });

  return;
}

    const payload = await upstream.json();
    const quotes = Array.isArray(payload) ? payload.map(normalizeFmpQuote) : [];

    sendJson(res, 200, {
      configured: true,
      provider: "Financial Modeling Prep",
      asOf: new Date().toISOString(),
      quotes
    });
  } catch (error) {
    sendJson(res, 502, {
      configured: true,
      provider: "Financial Modeling Prep",
      error: error instanceof Error ? error.message : "Quote provider failed"
    });
  }
};
