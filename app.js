const state = {
  search: "",
  layer: "all",
  sector: "all",
  type: "all",
  sort: "score",
  newsSearch: "",
  newsSource: "all",
  newsRegion: "all",
  newsSector: "all",
  newsImportance: "all",
  selectedId: companies[0]?.id ?? null
};

const layerById = new Map(chainLayers.map((layer) => [layer.id, layer]));
const sectorById = new Map(sectorTaxonomy.map((sector) => [sector.id, sector]));
const sourceById = new Map(sources.map((source) => [source.id, source]));
const valuationByTicker = new Map(
  (typeof valuationData !== "undefined" ? valuationData : []).map((item) => [item.ticker, item])
);

const selectors = {
  snapshotPill: document.querySelector("#snapshot-pill"),
  companyCount: document.querySelector("#company-count"),
  sourceCount: document.querySelector("#source-count"),
  reviewCount: document.querySelector("#review-count"),
  nextCatalyst: document.querySelector("#next-catalyst"),
  search: document.querySelector("#search"),
  layerFilter: document.querySelector("#layer-filter"),
  sectorFilter: document.querySelector("#sector-filter"),
  typeFilter: document.querySelector("#type-filter"),
  sortSelect: document.querySelector("#sort-select"),
  resetFilters: document.querySelector("#reset-filters"),
  landscapeMap: document.querySelector("#landscape-map"),
  regionalMap: document.querySelector("#regional-map"),
  newsSearch: document.querySelector("#news-search"),
  newsSourceFilter: document.querySelector("#news-source-filter"),
  newsRegionFilter: document.querySelector("#news-region-filter"),
  newsSectorFilter: document.querySelector("#news-sector-filter"),
  newsImportanceFilter: document.querySelector("#news-importance-filter"),
  newsFeed: document.querySelector("#news-feed"),
  chainMap: document.querySelector("#chain-map"),
  resultCount: document.querySelector("#result-count"),
  valuationSummary: document.querySelector("#valuation-summary"),
  companyTable: document.querySelector("#company-table"),
  companyDetail: document.querySelector("#company-detail"),
  playbooks: document.querySelector("#playbooks"),
  calendar: document.querySelector("#calendar"),
  accuracyCenter: document.querySelector("#accuracy-center"),
  sourceList: document.querySelector("#source-list"),
  disclaimer: document.querySelector("#disclaimer"),
  disclaimerCn: document.querySelector("#disclaimer-cn")
};

function formatDate(dateString) {
  if (!dateString) return "-";
  const date = new Date(`${dateString}T00:00:00+08:00`);
  if (Number.isNaN(date.valueOf())) return dateString;
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

function daysSince(dateString) {
  const reportDate = new Date(`${dateString}T00:00:00+08:00`);
  const snapshotDate = new Date(`${snapshotMeta.asOf}T00:00:00+08:00`);
  if (Number.isNaN(reportDate.valueOf()) || Number.isNaN(snapshotDate.valueOf())) return 999;
  return Math.max(0, Math.round((snapshotDate - reportDate) / 86400000));
}

function getFreshness(company) {
  const age = daysSince(company.lastReport);
  const estimated = /estimated|估计/i.test(company.nextWindow);
  const sourceCount = company.sourceIds?.length ?? 0;
  if (sourceCount === 0) {
    return {
      label: "No source",
      labelCn: "缺少来源",
      className: "danger",
      needsReview: true,
      age
    };
  }
  if (age > 75) {
    return {
      label: "Stale",
      labelCn: "过期",
      className: "danger",
      needsReview: true,
      age
    };
  }
  if (age > 45) {
    return {
      label: "Watch",
      labelCn: "关注",
      className: "warning",
      needsReview: true,
      age
    };
  }
  if (estimated) {
    return {
      label: "Estimate",
      labelCn: "估算",
      className: "warning",
      needsReview: false,
      age
    };
  }
  return {
    label: "Current",
    labelCn: "当前",
    className: "good",
    needsReview: false,
    age
  };
}

function sourceQuality(source) {
  if (!source) return "Missing / 缺失";
  const url = source.url.toLowerCase();
  const primarySignals = [
    "investor.",
    "investors.",
    "ir.",
    "sec.gov",
    "q4cdn.com",
    "microsoft.com/en-us/investor",
    "nvidia.com",
    "amd.com",
    "asml.com",
    "tsmc.com",
    "oracle.com/investor",
    "gevernova.com",
    "news.samsung.com",
    "skhynix.com",
    "foxconn.com",
    "mediatek.com",
    "se.com",
    "abb.com",
    "siemens-energy.com",
    "infineon.com",
    "static.www.tencent.com",
    "ir.baidu.com",
    "hkexnews.hk",
    "tokyoelectron.com",
    "advantest.com",
    "renesas.com",
    "constellationenergy.com",
    "vistracorp.com",
    "oklo.com",
    "bwxt.com",
    "hubbell.com",
    "comfortsystemsusa.com",
    "intc.com",
    "qualcomm.com",
    "asteralabs.com",
    "wdc.com",
    "seagate.com",
    "gf.com",
    "umc.com",
    "investors.st.com",
    "coherent.com",
    "lumentum.com",
    "cisco.com",
    "ciena.com",
    "equinix.com",
    "digitalrealty.com",
    "ibm.com/investor",
    "adobe.com/investor",
    "sap.com/investors",
    "alibabagroup.com",
    "semianalysis.com",
    "bloomberg.com/professional"
  ];
  return primarySignals.some((signal) => url.includes(signal))
    ? "Primary / 官方或监管来源"
    : "Secondary / 二级来源";
}

function getCompanySectors(company) {
  return companySectorOverrides[company.ticker] ?? sectorTaxonomy
    .filter((sector) => sector.layers.includes(company.layer))
    .map((sector) => sector.id);
}

function getNewsSectors(item) {
  return newsSectorOverrides[item.id] ?? sectorTaxonomy
    .filter((sector) => sector.layers.includes(item.layer))
    .map((sector) => sector.id);
}

function getValuation(company) {
  return valuationByTicker.get(company.ticker) ?? {
    capTier: "N.A.",
    pe: "N.A.",
    band: "Not classified",
    bandCn: "未分类",
    read: "Valuation data has not been refreshed for this name.",
    readCn: "该公司的估值数据尚未刷新。"
  };
}

function capTierRank(tier) {
  return {
    Mega: 4,
    Large: 3,
    Mid: 2,
    Small: 1
  }[tier] ?? 0;
}

function getFilteredCompanies() {
  const query = state.search.trim().toLowerCase();
  const filtered = companies.filter((company) => {
    const valuation = getValuation(company);
    const layerMatch = state.layer === "all" || company.layer === state.layer;
    const sectorMatch = state.sector === "all" || getCompanySectors(company).includes(state.sector);
    const typeMatch = state.type === "all" || company.type === state.type;
    const haystack = [
      company.ticker,
      company.company,
      company.companyCn,
      company.role,
      company.roleCn,
      company.aiRead,
      company.aiReadCn,
      company.financials,
      company.financialsCn,
      company.catalysts.join(" "),
      company.catalystsCn.join(" "),
      valuation.band,
      valuation.bandCn,
      valuation.read,
      valuation.readCn,
      valuation.capTier,
      valuation.pe
    ]
      .join(" ")
      .toLowerCase();
    return layerMatch && sectorMatch && typeMatch && (!query || haystack.includes(query));
  });

  return filtered.sort((a, b) => {
    if (state.sort === "ticker") return a.ticker.localeCompare(b.ticker);
    if (state.sort === "marketCap") return capTierRank(getValuation(b).capTier) - capTierRank(getValuation(a).capTier) || b.score - a.score;
    if (state.sort === "lastReport") return b.lastReport.localeCompare(a.lastReport);
    if (state.sort === "risk") return riskRank(b.valuationRisk) - riskRank(a.valuationRisk);
    return b.score - a.score;
  });
}

function riskRank(risk) {
  return {
    Low: 1,
    Medium: 2,
    High: 3,
    "Very High": 4
  }[risk] ?? 0;
}

function renderSummary() {
  const reviewCount = companies.filter((company) => getFreshness(company).needsReview).length;
  const declared = companies.find((company) => /2026-\d{2}-\d{2}/.test(company.nextWindow));

  selectors.snapshotPill.textContent = `Snapshot ${snapshotMeta.asOf} / 快照 ${snapshotMeta.asOf}`;
  selectors.companyCount.textContent = companies.length;
  selectors.sourceCount.textContent = sources.length;
  selectors.reviewCount.textContent = reviewCount;
  selectors.nextCatalyst.textContent = declared ? `${declared.ticker} ${declared.nextWindow}` : "See calendar";
  selectors.disclaimer.textContent = snapshotMeta.disclaimer;
  selectors.disclaimerCn.textContent = snapshotMeta.disclaimerCn;
}

function renderLayerOptions() {
  chainLayers.forEach((layer) => {
    const option = document.createElement("option");
    option.value = layer.id;
    option.textContent = `${layer.label} / ${layer.labelCn}`;
    selectors.layerFilter.append(option);
  });

  sectorTaxonomy.forEach((sector) => {
    const option = document.createElement("option");
    option.value = sector.id;
    option.textContent = `${sector.name} / ${sector.nameCn}`;
    selectors.sectorFilter.append(option);

    const newsOption = document.createElement("option");
    newsOption.value = sector.id;
    newsOption.textContent = `${sector.name} / ${sector.nameCn}`;
    selectors.newsSectorFilter.append(newsOption);
  });

  [...new Set(newsItems.map((item) => item.sourceName))].sort().forEach((sourceName) => {
    const option = document.createElement("option");
    option.value = sourceName;
    option.textContent = sourceName;
    selectors.newsSourceFilter.append(option);
  });

  [...new Set(newsItems.map((item) => item.region))].sort().forEach((region) => {
    const option = document.createElement("option");
    option.value = region;
    option.textContent = region;
    selectors.newsRegionFilter.append(option);
  });
}

function normalizeName(value) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function findCompanyByPlayer(player) {
  const normalizedPlayer = normalizeName(player);
  return companies.find((company) => {
    const aliases = [
      company.ticker,
      company.company,
      company.companyCn,
      company.company.replace(/ Technologies| Technology| Holdings| Platforms| Corporation| Inc\.?| plc| N\.V\./gi, "")
    ];
    return aliases.some((alias) => {
      const normalizedAlias = normalizeName(alias);
      return normalizedAlias && (normalizedPlayer.includes(normalizedAlias) || normalizedAlias.includes(normalizedPlayer));
    });
  });
}

function renderLandscapeMap() {
  selectors.landscapeMap.innerHTML = landscapeLayers
    .map((layer) => {
      const segments = layer.segments
        .map((segment) => {
          const players = segment.players
            .map((player) => {
              const company = findCompanyByPlayer(player);
              if (company) {
                return `<button class="player public" type="button" data-company="${company.id}" title="Tracked public company / 已跟踪上市公司">${player}</button>`;
              }
              return `<span class="player private" title="Reference company or private/non-covered name / 参考公司或非覆盖公司">${player}</span>`;
            })
            .join("");
          return `
            <div class="landscape-segment">
              <h4>${segment.name}<br /><span>${segment.nameCn}</span></h4>
              <div class="player-grid">${players}</div>
            </div>
          `;
        })
        .join("");

      const trends = layer.trend
        .map((item, index) => `<li>${item}<br /><span>${layer.trendCn[index]}</span></li>`)
        .join("");

      return `
        <article class="landscape-row">
          <div class="level-card">
            <span>Layer ${layer.level}</span>
            <strong>${layer.title}</strong>
            <em>${layer.titleCn}</em>
            <small>${layer.subtitle}<br />${layer.subtitleCn}</small>
          </div>
          <div class="landscape-segments">${segments}</div>
          <div class="trend-card">
            <strong>Key Trends / 关键趋势</strong>
            <ul>${trends}</ul>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderRegionalMap() {
  selectors.regionalMap.innerHTML = globalRegions
    .map((region) => {
      const players = region.players
        .map((player) => {
          const linked = companies.find((company) => company.ticker === player.ticker || player.ticker.includes(company.ticker));
          const sourceLabels = (player.sourceIds ?? [])
            .map((id) => sourceById.get(id))
            .filter(Boolean)
            .map((source) => `<a href="${source.url}" target="_blank" rel="noreferrer">${source.name}</a>`)
            .join("");
          const statusClass = player.status === "Tracked" ? "tracked" : player.status.includes("private") || player.status.includes("Strategic") ? "private" : "radar";
          const nameContent = linked
            ? `<button type="button" data-company="${linked.id}">${player.name}</button>`
            : `<strong>${player.name}</strong>`;
          return `
            <article class="regional-player ${statusClass}">
              <div>
                ${nameContent}
                <span>${player.ticker}</span>
              </div>
              <p>${player.layer}<br />${player.layerCn}</p>
              <em>${player.status}</em>
              <div class="regional-sources">${sourceLabels || "<small>Source to add / 待补来源</small>"}</div>
            </article>
          `;
        })
        .join("");

      return `
        <article class="regional-card">
          <header>
            <h3>${region.region}<br /><span>${region.regionCn}</span></h3>
            <p>${region.thesis}</p>
            <p>${region.thesisCn}</p>
          </header>
          <div class="regional-players">${players}</div>
        </article>
      `;
    })
    .join("");
}

function getFilteredNews() {
  const query = state.newsSearch.trim().toLowerCase();
  return newsItems
    .filter((item) => {
      const sourceMatch = state.newsSource === "all" || item.sourceName === state.newsSource;
      const regionMatch = state.newsRegion === "all" || item.region === state.newsRegion;
      const sectorMatch = state.newsSector === "all" || getNewsSectors(item).includes(state.newsSector);
      const importanceMatch = state.newsImportance === "all" || item.importance === state.newsImportance;
      const haystack = [
        item.sourceName,
        item.region,
        item.headline,
        item.headlineCn,
        item.summary,
        item.summaryCn,
        item.analystTake,
        item.analystTakeCn,
        item.tickers.join(" "),
        getNewsSectors(item).map((id) => sectorById.get(id)?.name).join(" "),
        getNewsSectors(item).map((id) => sectorById.get(id)?.nameCn).join(" ")
      ]
        .join(" ")
        .toLowerCase();

      return sourceMatch && regionMatch && sectorMatch && importanceMatch && (!query || haystack.includes(query));
    })
    .sort((a, b) => b.dateSort.localeCompare(a.dateSort));
}

function renderNewsFeed() {
  const filteredNews = getFilteredNews();
  selectors.newsFeed.innerHTML = filteredNews
    .map((item) => {
      const source = sourceById.get(item.sourceId);
      const sectors = getNewsSectors(item)
        .map((id) => sectorById.get(id))
        .filter(Boolean)
        .map((sector) => `<span>${sector.nameCn}</span>`)
        .join("");
      const tickers = item.tickers
        .map((ticker) => {
          const company = companies.find((candidate) => candidate.ticker === ticker);
          return company
            ? `<button type="button" data-company="${company.id}">${ticker}</button>`
            : `<span>${ticker}</span>`;
        })
        .join("");
      return `
        <article class="news-card">
          <div class="news-meta">
            <strong>${item.sourceName}</strong>
            <span>${item.dateLabel}</span>
            <em>${item.importance} / ${item.importance === "High" ? "高" : "中"}</em>
          </div>
          <h3>${item.headline}<br /><span>${item.headlineCn}</span></h3>
          <p>${item.summary}</p>
          <p>${item.summaryCn}</p>
          <div class="analyst-take">
            <strong>Analyst take / 分析师观点</strong>
            <p>${item.analystTake}</p>
            <p>${item.analystTakeCn}</p>
          </div>
          <div class="news-tags">
            <div>${sectors}</div>
            <div>${tickers}</div>
          </div>
          <a class="news-source-link" href="${source?.url ?? "#"}" target="_blank" rel="noreferrer">
            ${source?.name ?? item.sourceName}<br /><span>${source?.nameCn ?? ""}</span>
          </a>
        </article>
      `;
    })
    .join("");
}

function renderChainMap(filteredCompanies) {
  const filteredIds = new Set(filteredCompanies.map((company) => company.id));
  selectors.chainMap.innerHTML = chainLayers
    .map((layer) => {
      const layerCompanies = companies.filter((company) => company.layer === layer.id);
      const chips = layerCompanies
        .map((company) => {
          const active = filteredIds.has(company.id);
          const selected = company.id === state.selectedId;
          return `
            <button class="ticker-chip ${active ? "active" : "dim"} ${selected ? "selected" : ""}"
              data-company="${company.id}" type="button">
              <span>${company.ticker}</span>
              <small>${company.score}</small>
            </button>
          `;
        })
        .join("");

      return `
        <article class="chain-row">
          <div class="chain-copy">
            <h3>${layer.label}<br /><span>${layer.labelCn}</span></h3>
            <p>${layer.thesis}</p>
            <p>${layer.thesisCn}</p>
          </div>
          <div class="chain-tickers">${chips}</div>
        </article>
      `;
    })
    .join("");
}

function renderCompanyTable(filteredCompanies) {
  selectors.resultCount.textContent = `${filteredCompanies.length} results / ${filteredCompanies.length} 个结果`;
  selectors.companyTable.innerHTML = filteredCompanies
    .map((company) => {
      const layer = layerById.get(company.layer);
      const freshness = getFreshness(company);
      const valuation = getValuation(company);
      const selected = company.id === state.selectedId ? "selected-row" : "";
      return `
        <tr class="${selected}" data-company="${company.id}" tabindex="0">
          <td>
            <strong>${company.ticker}</strong>
            <span class="type-badge">${company.type}</span>
          </td>
          <td>
            <span>${company.company}</span>
            <small>${company.companyCn}</small>
          </td>
          <td>
            <span>${layer?.label ?? company.layer}</span>
            <small>${layer?.labelCn ?? ""}</small>
          </td>
          <td>
            <span class="valuation-badge">${valuation.bandCn}</span>
            <small>${valuation.capTier} cap / ${valuation.pe}</small>
          </td>
          <td><span class="score">${company.score}</span></td>
          <td>
            <span>${formatDate(company.lastReport)}</span>
            <small>${company.nextWindow}</small>
          </td>
          <td>
            <span class="freshness ${freshness.className}">${freshness.label} / ${freshness.labelCn}</span>
            <small>${freshness.age} days / ${freshness.age} 天</small>
          </td>
        </tr>
      `;
    })
    .join("");
}

function renderCompanyDetail() {
  const company = companies.find((item) => item.id === state.selectedId) ?? companies[0];
  if (!company) {
    selectors.companyDetail.innerHTML = "";
    return;
  }

  const layer = layerById.get(company.layer);
  const freshness = getFreshness(company);
  const linkedSources = (company.sourceIds ?? [])
    .map((id) => sourceById.get(id))
    .filter(Boolean);
  const sectors = getCompanySectors(company)
    .map((id) => sectorById.get(id))
    .filter(Boolean);
  const valuation = getValuation(company);

  selectors.companyDetail.innerHTML = `
    <div class="detail-header">
      <div>
        <p class="eyebrow">${layer?.label ?? company.layer} / ${layer?.labelCn ?? ""}</p>
        <h2>${company.ticker} ${company.company}</h2>
        <p class="cn-name">${company.companyCn}</p>
      </div>
      <span class="score large">${company.score}</span>
    </div>

    <div class="badge-row">
      <span>${company.type} / ${translateType(company.type)}</span>
      <span>${company.conviction} conviction / ${translateConviction(company.conviction)}</span>
      <span>${company.valuationRisk} risk / ${translateRisk(company.valuationRisk)}</span>
      <span class="freshness ${freshness.className}">${freshness.label} / ${freshness.labelCn}</span>
    </div>

    <section class="detail-section">
      <h3>Sectors / 板块</h3>
      <div class="sector-tags">
        ${sectors.map((sector) => `<span>${sector.name}<br /><em>${sector.nameCn}</em></span>`).join("")}
      </div>
    </section>

    <section class="detail-section valuation-detail">
      <h3>Valuation / 估值</h3>
      <div class="valuation-grid">
        <span><strong>${valuation.capTier}</strong><small>Market-cap tier / 市值层级</small></span>
        <span><strong>${valuation.pe}</strong><small>P/E or N.M. / 市盈率或无意义</small></span>
        <span><strong>${valuation.band}</strong><small>${valuation.bandCn}</small></span>
      </div>
      <p>${valuation.read}</p>
      <p>${valuation.readCn}</p>
    </section>

    <section class="detail-section">
      <h3>Role / 产业角色</h3>
      <p>${company.role}</p>
      <p>${company.roleCn}</p>
    </section>

    <section class="detail-section">
      <h3>Latest Financial Read / 最新财务解读</h3>
      <p>${company.financials}</p>
      <p>${company.financialsCn}</p>
    </section>

    <section class="detail-section">
      <h3>AI Investment Read / AI 投资判断</h3>
      <p>${company.aiRead}</p>
      <p>${company.aiReadCn}</p>
    </section>

    <div class="detail-two-col">
      <section class="detail-section">
        <h3>Catalysts / 催化剂</h3>
        <ul>${company.catalysts.map((item, index) => `<li>${item}<br /><span>${company.catalystsCn[index]}</span></li>`).join("")}</ul>
      </section>
      <section class="detail-section">
        <h3>Risks / 风险</h3>
        <ul>${company.risks.map((item, index) => `<li>${item}<br /><span>${company.risksCn[index]}</span></li>`).join("")}</ul>
      </section>
    </div>

    <section class="detail-section">
      <h3>Earnings / 财报</h3>
      <p>Last report: ${formatDate(company.lastReport)} / 上次财报：${formatDate(company.lastReport)}</p>
      <p>Next window: ${company.nextWindow} / 下次窗口：${company.nextWindow}</p>
    </section>

    <section class="detail-section">
      <h3>Sources / 来源</h3>
      <div class="source-links">
        ${linkedSources
          .map(
            (source) => `
              <a href="${source.url}" target="_blank" rel="noreferrer">
                ${source.name}<br /><span>${source.nameCn}</span>
              </a>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderValuationSummary(filteredCompanies) {
  if (!selectors.valuationSummary) return;

  const withValuation = filteredCompanies.map((company) => ({
    company,
    valuation: getValuation(company)
  }));
  const premium = withValuation.filter(({ company }) => ["High", "Very High"].includes(company.valuationRisk));
  const reasonable = withValuation.filter(({ valuation }) => /value|reasonable|relative|合理|价值|低估/i.test(`${valuation.band} ${valuation.bandCn}`));
  const speculative = withValuation.filter(({ valuation }) => /speculative|optionality|frontier|turnaround|投机|期权|转型|前沿/i.test(`${valuation.band} ${valuation.bandCn}`));
  const mega = withValuation.filter(({ valuation }) => valuation.capTier === "Mega");
  const sourceText = typeof valuationSnapshot !== "undefined"
    ? `Snapshot ${valuationSnapshot.asOf} / 快照 ${valuationSnapshot.asOf}`
    : "Valuation snapshot / 估值快照";

  const renderBucket = (label, labelCn, items) => `
    <article>
      <span>${label}<br /><em>${labelCn}</em></span>
      <strong>${items.length}</strong>
      <small>${items.slice(0, 5).map(({ company }) => company.ticker).join(" / ") || "None / 无"}</small>
    </article>
  `;

  selectors.valuationSummary.innerHTML = `
    <div class="valuation-note">
      <strong>Valuation Monitor / 估值监控</strong>
      <p>${sourceText}. Bands are analyst classifications, not price targets. / 分组是分析师分类，不是目标价。</p>
    </div>
    ${renderBucket("Mega-cap anchors", "超大市值锚", mega)}
    ${renderBucket("Premium risk", "高估值风险", premium)}
    ${renderBucket("Reasonable/value", "合理或价值", reasonable)}
    ${renderBucket("Speculative/option", "投机或期权", speculative)}
  `;
}

function translateType(type) {
  return {
    Core: "核心",
    Watchlist: "观察",
    Speculative: "投机"
  }[type] ?? type;
}

function translateConviction(conviction) {
  return {
    Anchor: "锚定",
    High: "高",
    Medium: "中",
    Low: "低"
  }[conviction] ?? conviction;
}

function translateRisk(risk) {
  return {
    Low: "低",
    Medium: "中",
    High: "高",
    "Very High": "极高"
  }[risk] ?? risk;
}

function renderPlaybooks() {
  selectors.playbooks.innerHTML = portfolioPlaybooks
    .map(
      (playbook) => `
        <article class="playbook">
          <h3>${playbook.title}<br /><span>${playbook.titleCn}</span></h3>
          <div class="mini-tickers">
            ${playbook.tickers.map((ticker) => `<button type="button" data-ticker="${ticker}">${ticker}</button>`).join("")}
          </div>
          <p>${playbook.logic}</p>
          <p>${playbook.logicCn}</p>
        </article>
      `
    )
    .join("");
}

function renderCalendar() {
  const ordered = [...companies].sort((a, b) => {
    const aDeclared = /2026-\d{2}-\d{2}/.test(a.nextWindow) ? 0 : 1;
    const bDeclared = /2026-\d{2}-\d{2}/.test(b.nextWindow) ? 0 : 1;
    if (aDeclared !== bDeclared) return aDeclared - bDeclared;
    return a.nextWindow.localeCompare(b.nextWindow);
  });

  selectors.calendar.innerHTML = ordered
    .slice(0, 14)
    .map((company) => {
      const freshness = getFreshness(company);
      return `
        <button class="calendar-item" type="button" data-company="${company.id}">
          <span>
            <strong>${company.ticker}</strong>
            ${company.companyCn}
          </span>
          <small>${company.nextWindow}</small>
          <em class="${freshness.className}">${freshness.labelCn}</em>
        </button>
      `;
    })
    .join("");
}

function renderAccuracyCenter() {
  const rules = analystFramework
    .map(
      (item) => `
        <article>
          <h3>${item.label}<br /><span>${item.labelCn}</span></h3>
          <p>${item.detail}</p>
          <p>${item.detailCn}</p>
        </article>
      `
    )
    .join("");

  const staleCompanies = companies
    .filter((company) => getFreshness(company).needsReview)
    .slice(0, 8)
    .map((company) => `<button type="button" data-company="${company.id}">${company.ticker}</button>`)
    .join("");

  selectors.accuracyCenter.innerHTML = `
    <div class="freshness-policy">
      <strong>Update discipline / 更新纪律</strong>
      <p>Use primary investor-relations or SEC filings first. Label estimated earnings dates. Mark items for review after 45 days and stale after 75 days.</p>
      <p>优先使用公司 IR 或 SEC 文件。估算财报日期必须标注。45 天后标记复核，75 天后标记过期。</p>
    </div>
    <div class="review-tickers">${staleCompanies}</div>
    <div class="framework-grid">${rules}</div>
  `;
}

function renderSources() {
  selectors.sourceList.innerHTML = sources
    .map(
      (source) => `
        <a href="${source.url}" target="_blank" rel="noreferrer">
          <span>${source.name}</span>
          <small>${source.nameCn}</small>
          <em>${sourceQuality(source)}</em>
        </a>
      `
    )
    .join("");
}

function selectCompany(id) {
  state.selectedId = id;
  renderAll();
  const detailPanel = document.querySelector(".detail-panel");
  if (detailPanel) detailPanel.scrollTop = 0;
  document.querySelector(".coverage-layout")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function bindEvents() {
  selectors.search.addEventListener("input", (event) => {
    state.search = event.target.value;
    renderAll();
  });

  selectors.layerFilter.addEventListener("change", (event) => {
    state.layer = event.target.value;
    renderAll();
  });

  selectors.sectorFilter.addEventListener("change", (event) => {
    state.sector = event.target.value;
    renderAll();
  });

  selectors.typeFilter.addEventListener("change", (event) => {
    state.type = event.target.value;
    renderAll();
  });

  selectors.sortSelect.addEventListener("change", (event) => {
    state.sort = event.target.value;
    renderAll();
  });

  selectors.resetFilters.addEventListener("click", () => {
    state.search = "";
    state.layer = "all";
    state.sector = "all";
    state.type = "all";
    state.sort = "score";
    selectors.search.value = "";
    selectors.layerFilter.value = "all";
    selectors.sectorFilter.value = "all";
    selectors.typeFilter.value = "all";
    selectors.sortSelect.value = "score";
    renderAll();
  });

  selectors.newsSearch.addEventListener("input", (event) => {
    state.newsSearch = event.target.value;
    renderNewsFeed();
  });

  selectors.newsSourceFilter.addEventListener("change", (event) => {
    state.newsSource = event.target.value;
    renderNewsFeed();
  });

  selectors.newsRegionFilter.addEventListener("change", (event) => {
    state.newsRegion = event.target.value;
    renderNewsFeed();
  });

  selectors.newsSectorFilter.addEventListener("change", (event) => {
    state.newsSector = event.target.value;
    renderNewsFeed();
  });

  selectors.newsImportanceFilter.addEventListener("change", (event) => {
    state.newsImportance = event.target.value;
    renderNewsFeed();
  });

  document.body.addEventListener("click", (event) => {
    const companyTarget = event.target.closest("[data-company]");
    if (companyTarget) {
      selectCompany(companyTarget.dataset.company);
      return;
    }

    const tickerTarget = event.target.closest("[data-ticker]");
    if (tickerTarget) {
      const company = companies.find((item) => item.ticker === tickerTarget.dataset.ticker);
      if (company) selectCompany(company.id);
    }
  });

  document.body.addEventListener("keydown", (event) => {
    const row = event.target.closest("tr[data-company]");
    if (row && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      selectCompany(row.dataset.company);
    }
  });
}

function renderAll() {
  const filteredCompanies = getFilteredCompanies();
  if (!filteredCompanies.some((company) => company.id === state.selectedId) && filteredCompanies[0]) {
    state.selectedId = filteredCompanies[0].id;
  }

  renderSummary();
  renderChainMap(filteredCompanies);
  renderValuationSummary(filteredCompanies);
  renderCompanyTable(filteredCompanies);
  renderCompanyDetail();
}

renderLayerOptions();
renderLandscapeMap();
renderRegionalMap();
renderNewsFeed();
renderPlaybooks();
renderCalendar();
renderAccuracyCenter();
renderSources();
bindEvents();
renderAll();
