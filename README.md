# AI Value Chain Investment Terminal

AI 全产业链投资研究终端。This is a Vercel-ready static dashboard for tracking the AI investment value chain from power and grid infrastructure to models, software applications and physical AI.

## What It Includes / 包含内容

- Bilingual English and Chinese interface / 中英双语界面
- 0-10 layer AI industry landscape / 0-10 层 AI 产业链全景图
- Public-company coverage with earnings dates, latest financial read, catalysts, risks and sources / 上市公司覆盖，包含财报日期、财务解读、催化剂、风险和来源
- Modular valuation layer in `valuation.js` with market-cap tiers, TTM P/E, forward P/E and analyst valuation bands / `valuation.js` 中独立估值层，包含市值层级、当前 P/E、前瞻 P/E 和分析师估值分组
- Live quote API route for price, market cap and TTM P/E when `FMP_API_KEY` is configured / 配置 `FMP_API_KEY` 后，可通过 API route 显示实时价格、市值和当前 P/E
- Accuracy Center with freshness flags / 准确性中心，显示信息时效
- Source library prioritizing investor-relations and SEC materials / 来源库优先使用公司 IR 和 SEC 材料

## Update Discipline / 更新纪律

This dashboard uses a dated research snapshot. Financial data, guidance, earnings dates and market narratives can change quickly.

本仪表盘使用带日期的研究快照。财务数据、指引、财报日期和市场叙事会快速变化。

Recommended workflow:

1. Update `snapshotMeta.asOf` in `data.js`.
2. Check each company whose latest report is older than 45 days.
3. Replace estimated earnings windows with announced dates once companies publish them.
4. Use official investor-relations pages or SEC filings first.
5. Keep speculative/private companies in the landscape map separate from public-company financial coverage.
6. Refresh `valuation.js` when market multiples or forward earnings estimates materially change.

建议流程：

1. 更新 `data.js` 中的 `snapshotMeta.asOf`。
2. 复核最近财报超过 45 天的公司。
3. 公司公布正式财报日期后，替换估算窗口。
4. 优先使用公司投资者关系网站或 SEC 文件。
5. 将投机性/非上市公司放在全景图中，与上市公司财务覆盖分开。
6. 市场倍数或前瞻盈利预期明显变化时，刷新 `valuation.js`。

## Local Verification / 本地核验

Run the staleness checker with Node:

```bash
node scripts/check-staleness.js
```

The script flags:

- `NO_SOURCE`: company has no source
- `BAD_SOURCE`: source id does not exist
- `ESTIMATED_NEXT_WINDOW`: next earnings window is estimated
- `REVIEW_45D`: latest report is older than 45 days
- `STALE_75D`: latest report is older than 75 days

## Live Quotes / 实时行情

The live quote endpoint is `/api/quotes`. It uses Financial Modeling Prep when this Vercel environment variable is set:

实时行情接口是 `/api/quotes`。在 Vercel 设置以下环境变量后，会使用 Financial Modeling Prep：

```bash
FMP_API_KEY=your_key_here
```

Vercel setup path:

Vercel 设置路径：

1. Project Settings
2. Environment Variables
3. Add `FMP_API_KEY`
4. Redeploy

If the key is missing, the site still loads and falls back to the static valuation snapshot.

如果缺少 key，网站仍会正常加载，并回退到静态估值快照。

If a provider plan does not support every ticker, `/api/quotes` returns available quotes plus an `errors` array for unsupported symbols; one 402 symbol does not block the rest of the dashboard.

如果行情套餐不支持某些 ticker，`/api/quotes` 会返回可用行情，并把受限 ticker 放进 `errors` 数组；单个 402 ticker 不会拖垮整个仪表盘。

## Deploy To Vercel / 部署到 Vercel

This is a dependency-free static site. It can be deployed directly to Vercel without npm install.

这是一个无依赖静态站点，可以直接部署到 Vercel，无需 npm install。
