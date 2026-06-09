const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const dataPath = path.join(root, "data.js");
const valuationPath = path.join(root, "valuation.js");
const source = [
  fs.readFileSync(dataPath, "utf8"),
  fs.existsSync(valuationPath) ? fs.readFileSync(valuationPath, "utf8") : ""
].join("\n");
const context = {};

vm.createContext(context);
vm.runInContext(
  `${source}\nObject.assign(this, { snapshotMeta, companies, sources, globalRegions, newsItems, valuationData: typeof valuationData !== "undefined" ? valuationData : [] });`,
  context
);

const snapshot = new Date(`${context.snapshotMeta.asOf}T00:00:00+08:00`);
const sourceIds = new Set(context.sources.map((sourceItem) => sourceItem.id));
const valuationTickers = new Set(context.valuationData.map((item) => item.ticker));

function daysSince(dateString) {
  const date = new Date(`${dateString}T00:00:00+08:00`);
  if (Number.isNaN(date.valueOf())) return 9999;
  return Math.max(0, Math.round((snapshot - date) / 86400000));
}

const companyFindings = context.companies
  .map((company) => {
    const age = daysSince(company.lastReport);
    const missingSources = (company.sourceIds ?? []).filter((id) => !sourceIds.has(id));
    const estimated = /estimated|估计/i.test(company.nextWindow);
    const hardFlags = [];
    const watchFlags = [];

    if (!company.sourceIds?.length) hardFlags.push("NO_SOURCE");
    if (missingSources.length) hardFlags.push(`BAD_SOURCE:${missingSources.join(",")}`);
    if (age > 75) watchFlags.push("STALE_75D");
    else if (age > 45) watchFlags.push("REVIEW_45D");
    if (estimated) watchFlags.push("ESTIMATED_NEXT_WINDOW");

    return {
      ticker: company.ticker,
      company: company.company,
      lastReport: company.lastReport,
      age,
      nextWindow: company.nextWindow,
      hardFlags,
      watchFlags
    };
  })
  .filter((item) => item.hardFlags.length > 0 || item.watchFlags.length > 0)
  .sort((a, b) => b.age - a.age || a.ticker.localeCompare(b.ticker));

const regionalBadSources = context.globalRegions.flatMap((region) =>
  region.players.flatMap((player) =>
    (player.sourceIds ?? [])
      .filter((id) => !sourceIds.has(id))
      .map((id) => ({
        region: region.region,
        player: player.name,
        missingSource: id
      }))
  )
);

const regionalUnlinkedCount = context.globalRegions.reduce(
  (count, region) => count + region.players.filter((player) => !(player.sourceIds ?? []).length).length,
  0
);

const newsBadSources = context.newsItems
  .filter((item) => !sourceIds.has(item.sourceId))
  .map((item) => ({
    id: item.id,
    sourceId: item.sourceId,
    headline: item.headline
  }));

const missingValuation = context.companies
  .filter((company) => !valuationTickers.has(company.ticker))
  .map((company) => ({
    ticker: company.ticker,
    company: company.company
  }));

const missingForwardPe = context.valuationData
  .filter((item) => !item.forwardPe)
  .map((item) => ({
    ticker: item.ticker,
    pe: item.pe
  }));

const hardCompanyFindings = companyFindings.filter((item) => item.hardFlags.length > 0);
const watchCompanyFindings = companyFindings.filter((item) => item.watchFlags.length > 0);
const hardIssueCount = hardCompanyFindings.length + regionalBadSources.length + newsBadSources.length + missingForwardPe.length;

console.log(`AI value-chain data snapshot: ${context.snapshotMeta.asOf}`);
console.log(`Companies: ${context.companies.length}`);
console.log(`Sources: ${context.sources.length}`);
console.log(`News items: ${context.newsItems.length}`);
console.log(`Valuation items: ${context.valuationData.length}`);
console.log(`Company hard source issues: ${hardCompanyFindings.length}`);
console.log(`Company freshness watch items: ${watchCompanyFindings.length}`);
console.log(`Companies missing valuation: ${missingValuation.length}`);
console.log(`Valuation items missing forward P/E: ${missingForwardPe.length}`);
console.log(`Regional players without linked source yet: ${regionalUnlinkedCount}`);
console.log(`Regional bad source links: ${regionalBadSources.length}`);
console.log(`News bad source links: ${newsBadSources.length}`);

if (hardCompanyFindings.length) {
  console.log("\nHard company source issues:");
  console.table(hardCompanyFindings);
}

if (watchCompanyFindings.length) {
  console.log("\nCompany freshness watchlist:");
  console.table(watchCompanyFindings);
}

if (regionalBadSources.length) {
  console.log("\nRegional bad source links:");
  console.table(regionalBadSources);
}

if (newsBadSources.length) {
  console.log("\nNews bad source links:");
  console.table(newsBadSources);
}

if (missingValuation.length) {
  console.log("\nCompanies missing valuation coverage:");
  console.table(missingValuation);
}

if (missingForwardPe.length) {
  console.log("\nValuation items missing forward P/E:");
  console.table(missingForwardPe);
}

if (hardIssueCount) {
  process.exitCode = 1;
} else {
  console.log("\nNo broken source references found. Freshness items are review watchlist warnings.");
}
