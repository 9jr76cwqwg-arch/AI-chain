const snapshotMeta = {
  asOf: "2026-06-09",
  timezone: "Asia/Shanghai",
  title: "AI Value Chain Investment Terminal",
  titleCn: "AI 全产业链投资研究终端",
  disclaimer:
    "Research dashboard for education and workflow use only. It is not investment advice, a solicitation, or a recommendation to buy or sell securities.",
  disclaimerCn:
    "本工具仅用于研究、学习和工作流展示，不构成投资建议、证券买卖邀约或个股推荐。交易前请核对最新公告、估值和风险。"
};

const chainLayers = [
  {
    id: "energy-grid",
    label: "Power & Grid",
    labelCn: "电力与电网",
    thesis: "AI factories are turning electricity, transformers, switchgear, turbines, cooling and grid labor into strategic bottlenecks.",
    thesisCn: "AI 工厂正在把电力、变压器、开关设备、燃机、冷却和电网施工能力变成战略瓶颈。"
  },
  {
    id: "datacenter",
    label: "Data Center Systems",
    labelCn: "数据中心系统",
    thesis: "Revenue visibility improves where order books convert into racks, liquid cooling, AI servers and services.",
    thesisCn: "订单能否转化为机柜、液冷、AI 服务器和服务收入，是这一层的核心验证点。"
  },
  {
    id: "semicap",
    label: "Equipment & EDA",
    labelCn: "半导体设备与 EDA",
    thesis: "Advanced packaging, EUV, etch, deposition, inspection and EDA remain toll roads for every AI chip cycle.",
    thesisCn: "先进封装、EUV、刻蚀、沉积、检测和 EDA 是每轮 AI 芯片周期的关键收费站。"
  },
  {
    id: "silicon",
    label: "Silicon & Memory",
    labelCn: "算力芯片与存储",
    thesis: "GPU, custom ASIC, CPU, networking silicon and HBM capture the most direct monetization from training and inference growth.",
    thesisCn: "GPU、定制 ASIC、CPU、网络芯片和 HBM 最直接受益于训练与推理需求增长。"
  },
  {
    id: "cloud",
    label: "Cloud & Platforms",
    labelCn: "云与平台",
    thesis: "Hyperscalers decide the pace of capex, but monetization depends on cloud growth, AI run-rate disclosure and utilization.",
    thesisCn: "云厂商决定资本开支节奏，但投资回报取决于云增长、AI 收入披露和资产利用率。"
  },
  {
    id: "software",
    label: "Data, Security & Apps",
    labelCn: "数据、安全与应用",
    thesis: "Enterprise AI winners should show revenue acceleration, durable retention and measurable agent productivity, not only AI messaging.",
    thesisCn: "企业 AI 胜出者应体现收入加速、留存韧性和可量化的智能体效率，而不只是 AI 叙事。"
  },
  {
    id: "edge",
    label: "Edge, Robotics & Frontier",
    labelCn: "边缘、机器人与前沿",
    thesis: "Autonomy, robotic surgery, voice AI and quantum carry large optionality but higher execution and valuation risk.",
    thesisCn: "自动驾驶、手术机器人、语音 AI 和量子计算具有高期权价值，但执行与估值风险更高。"
  }
];

const sectorTaxonomy = [
  {
    id: "power-grid",
    name: "Power, Grid & Energy",
    nameCn: "电力、电网与能源",
    description: "Electricity supply, grid connection, turbines, transformers, switchgear and backup power.",
    descriptionCn: "供电、电网接入、燃机、变压器、开关设备与备用电源。",
    layers: ["energy-grid"],
    subsegments: ["Nuclear", "Gas power", "Grid equipment", "UPS", "Transformers", "Switchgear", "Fuel cells"]
  },
  {
    id: "compute-design",
    name: "Compute & Chip Design",
    nameCn: "算力与芯片设计",
    description: "GPU, ASIC, CPU, accelerator IP and AI chip architecture.",
    descriptionCn: "GPU、ASIC、CPU、加速器 IP 与 AI 芯片架构。",
    layers: ["silicon"],
    subsegments: ["GPU", "ASIC", "CPU", "Inference accelerator", "IP", "Edge AI SoC"]
  },
  {
    id: "semicap-eda",
    name: "Semicap, EDA & IP",
    nameCn: "半导体设备、EDA 与 IP",
    description: "Lithography, etch, deposition, inspection, test, EDA and design IP.",
    descriptionCn: "光刻、刻蚀、沉积、检测、测试、EDA 与设计 IP。",
    layers: ["semicap"],
    subsegments: ["EUV", "Etch", "Deposition", "Inspection", "Testing", "EDA", "Design IP"]
  },
  {
    id: "foundry-packaging",
    name: "Foundry & Advanced Packaging",
    nameCn: "晶圆代工与先进封装",
    description: "Advanced nodes, CoWoS, OSAT, substrates and packaging capacity.",
    descriptionCn: "先进制程、CoWoS、OSAT、基板与封装产能。",
    layers: ["semicap"],
    subsegments: ["Foundry", "CoWoS", "OSAT", "Substrates", "HBM packaging", "Testing"]
  },
  {
    id: "memory-storage",
    name: "Memory & Storage",
    nameCn: "存储与数据存储",
    description: "HBM, DRAM, NAND, SSD and enterprise storage systems.",
    descriptionCn: "HBM、DRAM、NAND、SSD 与企业存储系统。",
    layers: ["silicon"],
    subsegments: ["HBM", "DRAM", "NAND", "SSD", "Enterprise storage"]
  },
  {
    id: "networking-optics",
    name: "Networking, Optics & Interconnect",
    nameCn: "网络、光通信与互联",
    description: "Ethernet switching, InfiniBand, NVLink, optics, DSP and connectors.",
    descriptionCn: "以太网交换、InfiniBand、NVLink、光模块、DSP 与连接器。",
    layers: ["datacenter", "silicon"],
    subsegments: ["AI Ethernet", "InfiniBand", "NVLink", "Optics", "DSP", "Connectors"]
  },
  {
    id: "servers-cooling",
    name: "Servers, ODM & Cooling",
    nameCn: "服务器、ODM 与冷却",
    description: "AI servers, rack-scale systems, ODM/OEM integration, liquid cooling and power shelves.",
    descriptionCn: "AI 服务器、机柜级系统、ODM/OEM 集成、液冷与电源架。",
    layers: ["datacenter"],
    subsegments: ["ODM", "OEM", "Rack systems", "Liquid cooling", "CDU", "Power shelves"]
  },
  {
    id: "cloud-ai-factory",
    name: "Cloud & AI Factory",
    nameCn: "云与 AI 工厂",
    description: "Hyperscale cloud, AI cloud, data-center REITs and AI capacity leasing.",
    descriptionCn: "超大规模云、AI 云、数据中心 REIT 与 AI 产能租赁。",
    layers: ["cloud"],
    subsegments: ["Hyperscaler", "AI cloud", "Data center REIT", "Sovereign AI", "GPU leasing"]
  },
  {
    id: "ai-infra-software",
    name: "AI Infrastructure Software",
    nameCn: "AI 基础设施软件",
    description: "Frameworks, CUDA, MLOps, vector databases, observability and agent tooling.",
    descriptionCn: "框架、CUDA、MLOps、向量数据库、可观测性与智能体工具。",
    layers: ["software"],
    subsegments: ["Frameworks", "CUDA", "MLOps", "Vector DB", "Observability", "Agent tools"]
  },
  {
    id: "models",
    name: "Foundation Models",
    nameCn: "基础模型",
    description: "Frontier models, open models, reasoning, multimodal and model distribution.",
    descriptionCn: "前沿模型、开源模型、推理、多模态与模型分发。",
    layers: ["cloud", "software"],
    subsegments: ["Frontier models", "Open models", "Reasoning", "Multimodal", "Model serving"]
  },
  {
    id: "applications",
    name: "AI Applications",
    nameCn: "AI 应用",
    description: "Enterprise software, AI search, coding, content, ads, security and vertical AI.",
    descriptionCn: "企业软件、AI 搜索、编程、内容、广告、安全与垂直 AI。",
    layers: ["software"],
    subsegments: ["Enterprise AI", "AI search", "AI coding", "Content", "AI ads", "Cybersecurity", "Vertical AI"]
  },
  {
    id: "physical-ai",
    name: "Physical AI & Robotics",
    nameCn: "物理 AI 与机器人",
    description: "Autonomy, humanoids, industrial robots, surgical robots, drones and edge intelligence.",
    descriptionCn: "自动驾驶、人形机器人、工业机器人、手术机器人、无人机与边缘智能。",
    layers: ["edge"],
    subsegments: ["Autonomy", "Humanoids", "Industrial robots", "Surgical robots", "Drones", "ADAS"]
  }
];

const companySectorOverrides = {
  NVDA: ["compute-design", "networking-optics", "servers-cooling", "ai-infra-software"],
  AMD: ["compute-design"],
  AVGO: ["compute-design", "networking-optics"],
  MRVL: ["compute-design", "networking-optics"],
  ARM: ["compute-design", "semicap-eda"],
  MU: ["memory-storage"],
  TSM: ["foundry-packaging"],
  ASML: ["semicap-eda"],
  AMAT: ["semicap-eda", "foundry-packaging"],
  LRCX: ["semicap-eda"],
  KLAC: ["semicap-eda"],
  SNPS: ["semicap-eda"],
  CDNS: ["semicap-eda"],
  ANET: ["networking-optics"],
  VRT: ["power-grid", "servers-cooling"],
  DELL: ["servers-cooling"],
  SMCI: ["servers-cooling"],
  HPE: ["servers-cooling"],
  MSFT: ["cloud-ai-factory", "models", "applications"],
  GOOGL: ["cloud-ai-factory", "models", "applications"],
  AMZN: ["cloud-ai-factory", "compute-design", "applications"],
  META: ["models", "applications", "cloud-ai-factory"],
  ORCL: ["cloud-ai-factory"],
  CRM: ["applications"],
  PLTR: ["applications"],
  SNOW: ["ai-infra-software", "applications"],
  NOW: ["applications"],
  CRWD: ["applications", "ai-infra-software"],
  DDOG: ["ai-infra-software"],
  NET: ["ai-infra-software", "networking-optics"],
  APP: ["applications"],
  TTD: ["applications"],
  ETN: ["power-grid"],
  GEV: ["power-grid"],
  PWR: ["power-grid"],
  SOUN: ["applications"],
  BBAI: ["applications"],
  IONQ: ["compute-design"],
  RGTI: ["compute-design"],
  PATH: ["applications"],
  TSLA: ["physical-ai", "applications"],
  ISRG: ["physical-ai"],
  MBLY: ["physical-ai"]
};

const newsSectorOverrides = {
  "news-big-tech-capex": ["cloud-ai-factory", "power-grid", "compute-design", "servers-cooling"],
  "news-electrical-bottleneck": ["power-grid", "servers-cooling"],
  "news-memory-shortage": ["memory-storage", "compute-design"],
  "news-meta-amd": ["compute-design", "cloud-ai-factory"],
  "news-skhynix-hbm-output": ["memory-storage"],
  "news-bi-accelerator-outlook": ["compute-design"],
  "news-semianalysis-deepseek-gb200": ["compute-design", "networking-optics", "servers-cooling"],
  "news-semianalysis-kimi-gb200": ["compute-design", "networking-optics"],
  "news-semianalysis-gb200-bom": ["servers-cooling", "networking-optics", "power-grid"],
  "news-semianalysis-accelerator-hbm": ["compute-design", "memory-storage"],
  "news-semianalysis-space-dc": ["power-grid", "cloud-ai-factory"],
  "news-semianalysis-chipbook": ["semicap-eda", "memory-storage", "foundry-packaging"]
};

const landscapeLayers = [
  {
    level: "0",
    title: "Power & Grid",
    titleCn: "能源与电网",
    subtitle: "AI factories start with electricity",
    subtitleCn: "AI 工厂首先受制于电力",
    trend: [
      "Nuclear restarts, gas turbines and grid upgrades are becoming AI capacity constraints.",
      "Small modular reactors and long-duration power contracts are moving from optionality to strategic planning.",
      "UPS, transformers, switchgear and liquid cooling increasingly decide time-to-online."
    ],
    trendCn: [
      "核电重启、燃机和电网升级正在成为 AI 产能约束。",
      "小型模块化核电与长期购电协议正从期权变成战略规划。",
      "UPS、变压器、开关设备与液冷越来越决定数据中心上线速度。"
    ],
    segments: [
      {
        name: "Nuclear",
        nameCn: "核电",
        players: ["Constellation Energy", "Vistra", "Oklo", "NuScale", "BWXT"]
      },
      {
        name: "Gas & Power",
        nameCn: "天然气与发电",
        players: ["GE Vernova", "Siemens Energy", "NextEra Energy"]
      },
      {
        name: "Grid Upgrade",
        nameCn: "电网升级",
        players: ["Eaton", "Schneider Electric", "ABB", "Hubbell", "Quanta Services"]
      },
      {
        name: "UPS & Backup",
        nameCn: "UPS 与备用电源",
        players: ["Vertiv", "Eaton", "Schneider Electric"]
      }
    ]
  },
  {
    level: "1",
    title: "Compute Layer",
    titleCn: "芯片与设计",
    subtitle: "Training and inference engines",
    subtitleCn: "训练与推理引擎",
    trend: [
      "GPU remains the core training platform, while custom ASICs are gaining hyperscaler wallet share.",
      "Inference chips and CPU attach are becoming larger profit pools as AI moves into production.",
      "EDA and IP vendors benefit from custom silicon complexity."
    ],
    trendCn: [
      "GPU 仍是训练核心平台，但定制 ASIC 正获得云厂商更多预算。",
      "随着 AI 进入生产，推理芯片和 CPU 配套成为更大利润池。",
      "定制芯片复杂度提升直接利好 EDA 与 IP 厂商。"
    ],
    segments: [
      { name: "GPU", nameCn: "GPU", players: ["NVIDIA", "AMD"] },
      { name: "ASIC", nameCn: "ASIC", players: ["Broadcom", "Marvell", "Google TPU", "Amazon Trainium"] },
      { name: "CPU", nameCn: "CPU", players: ["AMD", "Intel", "Arm", "NVIDIA Grace"] },
      { name: "Inference Chips", nameCn: "推理芯片", players: ["Cerebras", "SambaNova", "Groq"] },
      { name: "EDA & IP", nameCn: "EDA 与 IP", players: ["Cadence", "Synopsys", "Arm"] }
    ]
  },
  {
    level: "2",
    title: "Fabrication Layer",
    titleCn: "半导体制造",
    subtitle: "Where silicon capacity is made",
    subtitleCn: "算力产能的制造层",
    trend: [
      "TSMC advanced nodes and CoWoS capacity remain the industry choke point.",
      "Lithography, etch, deposition and inspection tools have high strategic value.",
      "Advanced packaging is now as important as front-end process for AI systems."
    ],
    trendCn: [
      "台积电先进制程与 CoWoS 产能仍是行业瓶颈。",
      "光刻、刻蚀、沉积和检测设备具有极高战略价值。",
      "先进封装对 AI 系统的重要性已经不亚于前道制程。"
    ],
    segments: [
      { name: "Foundry", nameCn: "晶圆代工", players: ["TSMC", "Samsung Foundry", "Intel Foundry"] },
      { name: "Lithography", nameCn: "光刻机", players: ["ASML"] },
      { name: "Wafer Equipment", nameCn: "制造设备", players: ["Applied Materials", "Lam Research", "KLA"] },
      { name: "Advanced Packaging", nameCn: "先进封装", players: ["TSMC CoWoS", "ASE", "SPIL", "Kinsus"] },
      { name: "Testing", nameCn: "测试", players: ["KYEC", "Teradyne", "Advantest"] }
    ]
  },
  {
    level: "3",
    title: "Memory Layer",
    titleCn: "存储",
    subtitle: "Bandwidth is the hidden accelerator",
    subtitleCn: "带宽是隐藏加速器",
    trend: [
      "HBM supply is a multi-year bottleneck and supports pricing power.",
      "DRAM content per AI server is rising sharply.",
      "NAND/SSD benefits from AI data pipelines, but has a more cyclical profile."
    ],
    trendCn: [
      "HBM 供给是多年瓶颈，并支撑定价权。",
      "AI 服务器单机 DRAM 含量快速提升。",
      "NAND/SSD 受益于 AI 数据管线，但周期属性更强。"
    ],
    segments: [
      { name: "HBM", nameCn: "高带宽内存", players: ["SK hynix", "Samsung", "Micron"] },
      { name: "DRAM", nameCn: "DRAM", players: ["Samsung", "Micron", "SK hynix"] },
      { name: "NAND / SSD", nameCn: "NAND / SSD", players: ["Western Digital", "SanDisk", "Kioxia"] }
    ]
  },
  {
    level: "4",
    title: "Networking Layer",
    titleCn: "网络与通信",
    subtitle: "Cluster performance depends on fabric",
    subtitleCn: "集群性能取决于网络",
    trend: [
      "AI clusters require 800G/1.6T optics, switching and high-speed connectors.",
      "Ethernet is gaining attention as a more open alternative to proprietary fabrics.",
      "NVLink, InfiniBand and optical modules remain critical for training scale."
    ],
    trendCn: [
      "AI 集群需要 800G/1.6T 光模块、交换机和高速连接器。",
      "以太网作为更开放的互联方案受到更多关注。",
      "NVLink、InfiniBand 与光模块仍是大规模训练关键。"
    ],
    segments: [
      { name: "AI Switches", nameCn: "AI 交换机", players: ["NVIDIA Spectrum-X", "Arista", "Broadcom", "Cisco"] },
      { name: "Optical Modules", nameCn: "光通信模块", players: ["Coherent", "Lumentum", "InnoLight", "Eoptolink"] },
      { name: "Optical Chips", nameCn: "光芯片", players: ["Marvell", "Broadcom"] },
      { name: "InfiniBand", nameCn: "InfiniBand", players: ["NVIDIA"] },
      { name: "Connectors", nameCn: "连接器", players: ["Amphenol"] }
    ]
  },
  {
    level: "5",
    title: "Infrastructure Layer",
    titleCn: "服务器与液冷",
    subtitle: "Racks, servers and thermal systems",
    subtitleCn: "机柜、服务器与散热系统",
    trend: [
      "AI servers are moving from board-level sales to rack-scale integrated systems.",
      "Liquid cooling adoption is accelerating as rack density rises.",
      "ODM/OEM supply chains matter when memory and GPU allocation are tight."
    ],
    trendCn: [
      "AI 服务器从板级销售走向机柜级集成系统。",
      "随着机柜密度提升，液冷采用正在加速。",
      "当存储和 GPU 分配紧张时，ODM/OEM 供应链更重要。"
    ],
    segments: [
      { name: "ODM", nameCn: "ODM", players: ["Foxconn", "Wistron", "Quanta Computer", "Inventec"] },
      { name: "OEM", nameCn: "OEM", players: ["Dell Technologies", "HPE", "Lenovo", "Supermicro"] },
      { name: "Liquid Cooling", nameCn: "液冷散热", players: ["Vertiv", "Schneider Electric", "Delta", "CoolIT"] },
      { name: "Cabinet & Power", nameCn: "机柜与配套", players: ["Vertiv", "Schneider Electric", "Eaton"] }
    ]
  },
  {
    level: "6",
    title: "AI Factory Layer",
    titleCn: "数据中心与 AI 工厂",
    subtitle: "Where capex becomes cloud capacity",
    subtitleCn: "资本开支转化为云产能",
    trend: [
      "Hyperscaler capex is the most important demand signal for the entire chain.",
      "Neo-clouds are gaining share where GPU supply and power access are scarce.",
      "Data center REITs and builders benefit from AI leasing and construction intensity."
    ],
    trendCn: [
      "云巨头资本开支是整条产业链最重要的需求信号。",
      "在 GPU 和电力稀缺处，新型 AI 云获得份额。",
      "数据中心 REIT 与建设商受益于 AI 租赁和建设强度。"
    ],
    segments: [
      { name: "Hyperscale Cloud", nameCn: "超大规模云", players: ["Microsoft Azure", "AWS", "Google Cloud", "Oracle"] },
      { name: "AI Cloud", nameCn: "AI 云", players: ["CoreWeave", "Nebius", "Crusoe", "Nscale"] },
      { name: "Data Center REITs", nameCn: "数据中心 REIT", players: ["Equinix", "Digital Realty"] },
      { name: "Builders", nameCn: "数据中心建设", players: ["Quanta Services", "Jacobs"] }
    ]
  },
  {
    level: "7",
    title: "Software Infrastructure",
    titleCn: "AI 基础设施软件",
    subtitle: "Frameworks, data and agent tooling",
    subtitleCn: "框架、数据与智能体工具",
    trend: [
      "Open-source frameworks and CUDA keep developer ecosystems sticky.",
      "MLOps, vector databases and data platforms are becoming enterprise AI control planes.",
      "Agent infrastructure is moving quickly but has high platform risk."
    ],
    trendCn: [
      "开源框架与 CUDA 让开发者生态保持高粘性。",
      "MLOps、向量数据库和数据平台正成为企业 AI 控制平面。",
      "智能体基础设施发展很快，但平台风险较高。"
    ],
    segments: [
      { name: "Frameworks", nameCn: "AI 框架", players: ["PyTorch", "TensorFlow", "NVIDIA CUDA"] },
      { name: "MLOps & Data", nameCn: "MLOps 与数据", players: ["Databricks", "Snowflake", "Weights & Biases", "MLflow"] },
      { name: "Vector DB", nameCn: "向量数据库", players: ["Pinecone", "Weaviate", "Milvus"] },
      { name: "Agent Infrastructure", nameCn: "Agent 基础设施", players: ["LangChain", "CrewAI", "OpenAI Assistants API"] }
    ]
  },
  {
    level: "8",
    title: "Foundation Models",
    titleCn: "模型层",
    subtitle: "Model capability and distribution",
    subtitleCn: "模型能力与分发",
    trend: [
      "Model competition is intense, but distribution and compute access are equally important.",
      "Open models pressure pricing and raise the value of applications and data.",
      "Multimodal and reasoning capabilities continue to expand."
    ],
    trendCn: [
      "模型竞争激烈，但分发能力和算力获取同样重要。",
      "开源模型压低价格，同时提高应用和数据的价值。",
      "多模态与推理能力持续演进。"
    ],
    segments: [
      {
        name: "Model Labs",
        nameCn: "模型公司",
        players: ["OpenAI", "Anthropic", "Google DeepMind", "Meta Llama", "Mistral AI", "xAI", "Qwen", "DeepSeek"]
      }
    ]
  },
  {
    level: "9",
    title: "Application Layer",
    titleCn: "应用层",
    subtitle: "Where AI meets workflow ROI",
    subtitleCn: "AI 与工作流 ROI 相遇",
    trend: [
      "Enterprise AI adoption is accelerating, but willingness to pay depends on workflow ownership.",
      "AI search, coding, content creation and vertical apps have different margin and moat profiles.",
      "The best apps combine proprietary data, workflow depth and distribution."
    ],
    trendCn: [
      "企业 AI 采用加速，但付费意愿取决于对工作流的控制力。",
      "AI 搜索、编程、内容创作和垂直应用的利润率与护城河不同。",
      "最佳应用同时具备专有数据、工作流深度和分发能力。"
    ],
    segments: [
      { name: "Enterprise Software", nameCn: "企业软件", players: ["Palantir", "ServiceNow", "Salesforce"] },
      { name: "AI Search", nameCn: "AI 搜索/知识", players: ["Perplexity", "Glean"] },
      { name: "AI Coding", nameCn: "AI 编程", players: ["Cursor", "GitHub Copilot"] },
      { name: "Content", nameCn: "内容创作", players: ["Adobe", "Runway"] },
      { name: "Vertical AI", nameCn: "垂直应用", players: ["Tempus AI", "SoundHound AI", "BigBear.ai"] }
    ]
  },
  {
    level: "10",
    title: "Physical AI",
    titleCn: "机器人时代",
    subtitle: "AI moves from screen to world",
    subtitleCn: "AI 从屏幕走向物理世界",
    trend: [
      "Humanoid robots, industrial robots and autonomous vehicles expand the AI TAM.",
      "Embodied AI requires sensors, edge inference, safety validation and manufacturing scale.",
      "Timelines are uncertain, so catalyst discipline matters."
    ],
    trendCn: [
      "人形机器人、工业机器人和自动驾驶扩展 AI 总市场。",
      "具身智能需要传感器、边缘推理、安全验证和制造规模。",
      "商业化时间不确定，因此催化剂纪律很重要。"
    ],
    segments: [
      { name: "Humanoids", nameCn: "人形机器人", players: ["Tesla Optimus", "Agility Robotics", "Figure AI", "Unitree"] },
      { name: "Industrial Robots", nameCn: "工业机器人", players: ["ABB", "Fanuc", "Yaskawa", "Universal Robots"] },
      { name: "Autonomy", nameCn: "自动驾驶", players: ["Tesla", "Waymo", "Mobileye"] },
      { name: "Drones & Embodied AI", nameCn: "低空与具身智能", players: ["DJI", "Joby Aviation"] }
    ]
  }
];

const globalRegions = [
  {
    region: "United States",
    regionCn: "美国",
    thesis: "Dominates GPUs, cloud platforms, enterprise AI software, data-center power/cooling and parts of EDA/IP.",
    thesisCn: "主导 GPU、云平台、企业 AI 软件、数据中心电力/冷却，以及部分 EDA/IP。",
    players: [
      { name: "NVIDIA", ticker: "NVDA", layer: "GPU / AI systems", layerCn: "GPU / AI 系统", status: "Tracked", sourceIds: ["nvda-q1fy27"] },
      { name: "Microsoft", ticker: "MSFT", layer: "Cloud / Copilot", layerCn: "云 / Copilot", status: "Tracked", sourceIds: ["msft-fy26q3"] },
      { name: "Amazon", ticker: "AMZN", layer: "AWS / custom silicon", layerCn: "AWS / 自研芯片", status: "Tracked", sourceIds: ["amzn-q1fy26"] },
      { name: "Alphabet", ticker: "GOOGL", layer: "Cloud / TPU / models", layerCn: "云 / TPU / 模型", status: "Tracked", sourceIds: ["goog-q1fy26"] },
      { name: "Meta", ticker: "META", layer: "AI ads / models", layerCn: "AI 广告 / 模型", status: "Tracked", sourceIds: ["meta-q1fy26"] },
      { name: "Broadcom", ticker: "AVGO", layer: "Custom ASIC / networking", layerCn: "定制 ASIC / 网络", status: "Tracked", sourceIds: ["broadcom-q2fy26"] },
      { name: "AMD", ticker: "AMD", layer: "GPU / CPU", layerCn: "GPU / CPU", status: "Tracked", sourceIds: ["amd-q1fy26"] },
      { name: "Oracle", ticker: "ORCL", layer: "OCI AI cloud", layerCn: "OCI AI 云", status: "Tracked", sourceIds: ["orcl-q4date"] },
      { name: "Palantir", ticker: "PLTR", layer: "Operational AI", layerCn: "运营 AI", status: "Tracked", sourceIds: ["pltr-q1fy26"] },
      { name: "OpenAI", ticker: "Private", layer: "Foundation models", layerCn: "基础模型", status: "Strategic private", sourceIds: [] }
    ]
  },
  {
    region: "Taiwan",
    regionCn: "台湾",
    thesis: "The core physical supply chain for advanced foundry, packaging, AI servers, ODM integration and edge chips.",
    thesisCn: "先进代工、先进封装、AI 服务器、ODM 集成与边缘芯片的核心实体供应链。",
    players: [
      { name: "TSMC", ticker: "TSM / 2330.TW", layer: "Foundry / CoWoS", layerCn: "晶圆代工 / CoWoS", status: "Tracked", sourceIds: ["tsmc-apr2026"] },
      { name: "Hon Hai / Foxconn", ticker: "2317.TW", layer: "AI servers / ODM", layerCn: "AI 服务器 / ODM", status: "Add detailed tracking", sourceIds: ["honhai-q1fy26"] },
      { name: "Quanta Computer", ticker: "2382.TW", layer: "ODM / cloud servers", layerCn: "ODM / 云服务器", status: "Regional radar", sourceIds: [] },
      { name: "Wiwynn", ticker: "6669.TW", layer: "Cloud servers", layerCn: "云服务器", status: "Regional radar", sourceIds: [] },
      { name: "Wistron", ticker: "3231.TW", layer: "ODM / servers", layerCn: "ODM / 服务器", status: "Regional radar", sourceIds: [] },
      { name: "Inventec", ticker: "2356.TW", layer: "ODM / servers", layerCn: "ODM / 服务器", status: "Regional radar", sourceIds: [] },
      { name: "ASE Technology", ticker: "ASX / 3711.TW", layer: "Packaging / OSAT", layerCn: "封装 / OSAT", status: "Regional radar", sourceIds: [] },
      { name: "MediaTek", ticker: "2454.TW", layer: "Edge AI SoC / connectivity", layerCn: "边缘 AI SoC / 连接", status: "Add detailed tracking", sourceIds: ["mediatek-q1fy26"] },
      { name: "KYEC", ticker: "2449.TW", layer: "Testing", layerCn: "测试", status: "Regional radar", sourceIds: [] },
      { name: "Kinsus", ticker: "3189.TW", layer: "Substrate / packaging", layerCn: "基板 / 封装", status: "Regional radar", sourceIds: [] }
    ]
  },
  {
    region: "Korea",
    regionCn: "韩国",
    thesis: "Critical in HBM, DRAM, NAND, advanced memory packaging and Samsung's foundry ambitions.",
    thesisCn: "在 HBM、DRAM、NAND、先进存储封装和三星代工中具有关键地位。",
    players: [
      { name: "SK hynix", ticker: "000660.KS", layer: "HBM / DRAM / eSSD", layerCn: "HBM / DRAM / eSSD", status: "Add detailed tracking", sourceIds: ["skhynix-q1fy26"] },
      { name: "Samsung Electronics", ticker: "005930.KS", layer: "Memory / foundry / devices", layerCn: "存储 / 代工 / 终端", status: "Add detailed tracking", sourceIds: ["samsung-q1fy26"] },
      { name: "Samsung Foundry", ticker: "005930.KS", layer: "Advanced foundry", layerCn: "先进晶圆代工", status: "Part of Samsung", sourceIds: ["samsung-q1fy26"] },
      { name: "Hanmi Semiconductor", ticker: "042700.KS", layer: "HBM packaging tools", layerCn: "HBM 封装设备", status: "Regional radar", sourceIds: [] },
      { name: "SEMES", ticker: "Samsung affiliate", layer: "Semiconductor equipment", layerCn: "半导体设备", status: "Strategic private", sourceIds: [] },
      { name: "SK Telecom", ticker: "017670.KS", layer: "Telecom AI / AI data centers", layerCn: "通信 AI / AI 数据中心", status: "Regional radar", sourceIds: [] }
    ]
  },
  {
    region: "Europe",
    regionCn: "欧洲",
    thesis: "Controls unique semiconductor equipment, electrification, industrial automation, power semiconductors and sovereign AI software.",
    thesisCn: "掌握独特半导体设备、电气化、工业自动化、功率半导体和主权 AI 软件能力。",
    players: [
      { name: "ASML", ticker: "ASML", layer: "EUV lithography", layerCn: "EUV 光刻", status: "Tracked", sourceIds: ["asml-q1fy26"] },
      { name: "Schneider Electric", ticker: "SU.PA", layer: "Data-center power / cooling", layerCn: "数据中心电力 / 冷却", status: "Add detailed tracking", sourceIds: ["schneider-q1fy26"] },
      { name: "ABB", ticker: "ABBN.SW", layer: "Electrification / automation", layerCn: "电气化 / 自动化", status: "Add detailed tracking", sourceIds: ["abb-q1fy26"] },
      { name: "Siemens Energy", ticker: "ENR.DE", layer: "Grid / gas turbines", layerCn: "电网 / 燃机", status: "Add detailed tracking", sourceIds: ["siemens-energy-q2fy26"] },
      { name: "Siemens", ticker: "SIE.DE", layer: "Industrial AI / electrification", layerCn: "工业 AI / 电气化", status: "Regional radar", sourceIds: [] },
      { name: "Infineon", ticker: "IFX.DE", layer: "Power semis / AI power supplies", layerCn: "功率半导体 / AI 电源", status: "Add detailed tracking", sourceIds: ["infineon-q2fy26"] },
      { name: "STMicroelectronics", ticker: "STM", layer: "Edge / power / sensors", layerCn: "边缘 / 功率 / 传感", status: "Regional radar", sourceIds: [] },
      { name: "ASM International", ticker: "ASM.AS", layer: "Deposition equipment", layerCn: "沉积设备", status: "Regional radar", sourceIds: [] },
      { name: "BE Semiconductor", ticker: "BESI.AS", layer: "Advanced packaging tools", layerCn: "先进封装设备", status: "Regional radar", sourceIds: [] },
      { name: "Mistral AI", ticker: "Private", layer: "Foundation models", layerCn: "基础模型", status: "Strategic private", sourceIds: [] }
    ]
  },
  {
    region: "Mainland China & Hong Kong",
    regionCn: "中国大陆与香港",
    thesis: "Large domestic AI demand, cloud/model platforms and a fast-localizing semiconductor supply chain under export controls.",
    thesisCn: "拥有庞大本土 AI 需求、云/模型平台，以及在出口管制下快速国产化的半导体供应链。",
    players: [
      { name: "Alibaba", ticker: "BABA / 9988.HK", layer: "Cloud / Qwen / commerce AI", layerCn: "云 / 通义千问 / 商业 AI", status: "Add detailed tracking", sourceIds: ["alibaba-fy26q4"] },
      { name: "Tencent", ticker: "0700.HK", layer: "Yuanbao / games / cloud", layerCn: "元宝 / 游戏 / 云", status: "Add detailed tracking", sourceIds: ["tencent-q1fy26"] },
      { name: "Baidu", ticker: "BIDU / 9888.HK", layer: "ERNIE / AI cloud / Apollo", layerCn: "文心 / AI 云 / Apollo", status: "Add detailed tracking", sourceIds: ["baidu-q1fy26"] },
      { name: "Huawei", ticker: "Private", layer: "Ascend / cloud / networking", layerCn: "昇腾 / 云 / 网络", status: "Strategic private", sourceIds: [] },
      { name: "SMIC", ticker: "0981.HK / 688981.SS", layer: "Foundry", layerCn: "晶圆代工", status: "Add detailed tracking", sourceIds: ["smic-q1fy26"] },
      { name: "Hua Hong Semiconductor", ticker: "1347.HK / 688347.SS", layer: "Foundry", layerCn: "晶圆代工", status: "Regional radar", sourceIds: [] },
      { name: "Cambricon", ticker: "688256.SS", layer: "AI accelerators", layerCn: "AI 加速器", status: "Regional radar", sourceIds: [] },
      { name: "Hygon", ticker: "688041.SS", layer: "CPU / accelerator", layerCn: "CPU / 加速器", status: "Regional radar", sourceIds: [] },
      { name: "NAURA", ticker: "002371.SZ", layer: "Semicap equipment", layerCn: "半导体设备", status: "Regional radar", sourceIds: [] },
      { name: "AMEC", ticker: "688012.SS", layer: "Etch equipment", layerCn: "刻蚀设备", status: "Regional radar", sourceIds: [] },
      { name: "JCET", ticker: "600584.SS", layer: "Packaging / OSAT", layerCn: "封装 / OSAT", status: "Regional radar", sourceIds: [] },
      { name: "Lenovo", ticker: "0992.HK", layer: "AI PCs / servers", layerCn: "AI PC / 服务器", status: "Regional radar", sourceIds: [] },
      { name: "DeepSeek", ticker: "Private", layer: "Foundation models", layerCn: "基础模型", status: "Strategic private", sourceIds: [] },
      { name: "DJI", ticker: "Private", layer: "Drones / physical AI", layerCn: "无人机 / 物理 AI", status: "Strategic private", sourceIds: [] },
      { name: "Unitree Robotics", ticker: "Private", layer: "Humanoid / quadruped robots", layerCn: "人形 / 四足机器人", status: "Strategic private", sourceIds: [] }
    ]
  },
  {
    region: "Japan",
    regionCn: "日本",
    thesis: "Strategic supplier of semiconductor tools, testers, materials, precision equipment, edge chips and robotics.",
    thesisCn: "半导体设备、测试机、材料、精密设备、边缘芯片与机器人战略供应国。",
    players: [
      { name: "Tokyo Electron", ticker: "8035.T", layer: "Semicap equipment", layerCn: "半导体设备", status: "Regional radar", sourceIds: ["tokyo-electron-fy26"] },
      { name: "Advantest", ticker: "6857.T", layer: "AI chip testing", layerCn: "AI 芯片测试", status: "Regional radar", sourceIds: ["advantest-fy25"] },
      { name: "DISCO", ticker: "6146.T", layer: "Dicing / grinding", layerCn: "切割 / 研磨", status: "Regional radar", sourceIds: [] },
      { name: "SCREEN", ticker: "7735.T", layer: "Wafer cleaning / lithography track", layerCn: "清洗 / 涂胶显影", status: "Regional radar", sourceIds: [] },
      { name: "Renesas", ticker: "6723.T", layer: "Edge / automotive AI", layerCn: "边缘 / 汽车 AI", status: "Regional radar", sourceIds: ["renesas-q1fy26"] },
      { name: "Kioxia", ticker: "285A.T", layer: "NAND / SSD", layerCn: "NAND / SSD", status: "Regional radar", sourceIds: [] },
      { name: "Fanuc", ticker: "6954.T", layer: "Industrial robots", layerCn: "工业机器人", status: "Regional radar", sourceIds: [] },
      { name: "Yaskawa", ticker: "6506.T", layer: "Industrial robots", layerCn: "工业机器人", status: "Regional radar", sourceIds: [] },
      { name: "SoftBank Group", ticker: "9984.T", layer: "Arm / AI investments", layerCn: "Arm / AI 投资", status: "Regional radar", sourceIds: [] }
    ]
  }
];

const sources = [
  {
    id: "nvda-q1fy27",
    name: "NVIDIA Q1 FY2027 results",
    nameCn: "NVIDIA 2027 财年一季度财报",
    url: "https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-First-Quarter-Fiscal-2027/default.aspx"
  },
  {
    id: "msft-fy26q3",
    name: "Microsoft FY2026 Q3 results",
    nameCn: "Microsoft 2026 财年三季度财报",
    url: "https://www.microsoft.com/en-us/investor/earnings/fy-2026-q3/press-release-webcast"
  },
  {
    id: "goog-q1fy26",
    name: "Alphabet Q1 2026 earnings release",
    nameCn: "Alphabet 2026 年一季度财报",
    url: "https://s206.q4cdn.com/479360582/files/doc_financials/2026/q1/2026q1-alphabet-earnings-release.pdf"
  },
  {
    id: "amzn-q1fy26",
    name: "Amazon Q1 2026 earnings release",
    nameCn: "Amazon 2026 年一季度财报",
    url: "https://s2.q4cdn.com/299287126/files/doc_earnings/2026/q1/earnings-result/AMZN-Q1-2026-Earnings-Release.pdf"
  },
  {
    id: "meta-q1fy26",
    name: "Meta Q1 2026 results",
    nameCn: "Meta 2026 年一季度财报",
    url: "https://investor.atmeta.com/investor-news/press-release-details/2026/Meta-Reports-First-Quarter-2026-Results/"
  },
  {
    id: "broadcom-q2fy26",
    name: "Broadcom Q2 FY2026 results",
    nameCn: "Broadcom 2026 财年二季度财报",
    url: "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-second-quarter-fiscal-year-2026-financial"
  },
  {
    id: "amd-q1fy26",
    name: "AMD Q1 2026 results",
    nameCn: "AMD 2026 年一季度财报",
    url: "https://www.amd.com/en/newsroom/press-releases/2026-5-5-amd-reports-first-quarter-2026-financial-results.html"
  },
  {
    id: "tsmc-apr2026",
    name: "TSMC April 2026 revenue report",
    nameCn: "台积电 2026 年 4 月营收公告",
    url: "https://pr.tsmc.com/english/news/3305"
  },
  {
    id: "asml-q1fy26",
    name: "ASML Q1 2026 financial results",
    nameCn: "ASML 2026 年一季度财报",
    url: "https://www.asml.com/investors/financial-results/q1-2026"
  },
  {
    id: "amat-q2fy26",
    name: "Applied Materials Q2 FY2026 results",
    nameCn: "Applied Materials 2026 财年二季度财报",
    url: "https://ir.appliedmaterials.com/news-releases/news-release-details/applied-materials-announces-second-quarter-2026-results"
  },
  {
    id: "lrcx-mar2026",
    name: "Lam Research March 2026 quarter results",
    nameCn: "Lam Research 2026 年 3 月季度财报",
    url: "https://www.prnewswire.com/news-releases/lam-research-corporation-reports-financial-results-for-the-quarter-ended-march-29-2026-302750629.html"
  },
  {
    id: "klac-q3fy26",
    name: "KLA FY2026 Q3 results",
    nameCn: "KLA 2026 财年三季度财报",
    url: "https://ir.kla.com/news-events/press-releases/detail/514/kla-corporation-reports-fiscal-2026-third-quarter-results"
  },
  {
    id: "mrvl-q1fy27",
    name: "Marvell Q1 FY2027 results",
    nameCn: "Marvell 2027 财年一季度财报",
    url: "https://investor.marvell.com/news-events/press-releases/detail/1023/marvell-technology-inc-reports-first-quarter-of-fiscal-year-2027-financial-results"
  },
  {
    id: "mu-q2fy26",
    name: "Micron Q2 FY2026 results",
    nameCn: "Micron 2026 财年二季度财报",
    url: "https://investors.micron.com/news-releases/news-release-details/micron-technology-inc-reports-results-second-quarter-fiscal-2026"
  },
  {
    id: "anet-q1fy26",
    name: "Arista Q1 2026 results",
    nameCn: "Arista 2026 年一季度财报",
    url: "https://www.arista.com/en/company/news/press-release/24017-pr-20260505"
  },
  {
    id: "arm-q4fy26",
    name: "Arm Q4 FY2026 results",
    nameCn: "Arm 2026 财年四季度财报",
    url: "https://newsroom.arm.com/news/arm-q4-fye26-results"
  },
  {
    id: "orcl-q4date",
    name: "Oracle Q4 FY2026 earnings date",
    nameCn: "Oracle 2026 财年四季度财报日期",
    url: "https://investor.oracle.com/investor-news/news-details/2026/Oracle-Sets-the-Date-for-its-Fourth-Quarter-Fiscal-Year-2026-Earnings-Announcement/default.aspx"
  },
  {
    id: "crm-q1fy27",
    name: "Salesforce Q1 FY2027 results",
    nameCn: "Salesforce 2027 财年一季度财报",
    url: "https://investor.salesforce.com/news/news-details/2026/Salesforce-Delivers-Record-First-Quarter-Fiscal-2027-Results/default.aspx"
  },
  {
    id: "pltr-q1fy26",
    name: "Palantir Q1 2026 Form 10-Q",
    nameCn: "Palantir 2026 年一季度 10-Q",
    url: "https://investors.palantir.com/files/2026%20Q1%20PLTR%2010-Q.pdf"
  },
  {
    id: "snow-q1fy27",
    name: "Snowflake Q1 FY2027 SEC earnings exhibit",
    nameCn: "Snowflake 2027 财年一季度 SEC 财报附件",
    url: "https://www.sec.gov/Archives/edgar/data/1640147/000164014726000027/fy2027q1earnings.htm"
  },
  {
    id: "crwd-q1fy27",
    name: "CrowdStrike Q1 FY2027 results",
    nameCn: "CrowdStrike 2027 财年一季度财报",
    url: "https://ir.crowdstrike.com/node/16821/pdf"
  },
  {
    id: "now-q1fy26",
    name: "ServiceNow Q1 2026 results",
    nameCn: "ServiceNow 2026 年一季度财报",
    url: "https://investor.servicenow.com/news/news-details/2026/ServiceNow-Reports-First-Quarter-2026-Financial-Results/default.aspx"
  },
  {
    id: "ddog-q1fy26",
    name: "Datadog Q1 2026 results",
    nameCn: "Datadog 2026 年一季度财报",
    url: "https://investors.datadoghq.com/news-releases/news-release-details/datadog-announces-first-quarter-2026-financial-results"
  },
  {
    id: "app-q1fy26",
    name: "AppLovin Q1 2026 presentation",
    nameCn: "AppLovin 2026 年一季度演示材料",
    url: "https://s21.q4cdn.com/165405286/files/doc_financials/2026/q1/Q1-2026-AppLovin-Earnings-Presentation.pdf"
  },
  {
    id: "vrt-q1fy26",
    name: "Vertiv Q1 2026 earnings release",
    nameCn: "Vertiv 2026 年一季度财报",
    url: "https://s205.q4cdn.com/554782763/files/doc_financials/2026/q1/Vertiv-First-Quarter-2026-Earnings-Release.pdf"
  },
  {
    id: "etn-q1fy26",
    name: "Eaton Q1 2026 presentation",
    nameCn: "Eaton 2026 年一季度演示材料",
    url: "https://www.eaton.com/content/dam/eaton/company/investor-relations/quarterly-earnings/filings/2026/q1/q1-2026-analyst-presentation.pdf"
  },
  {
    id: "gev-q1fy26",
    name: "GE Vernova Q1 2026 results",
    nameCn: "GE Vernova 2026 年一季度财报",
    url: "https://www.gevernova.com/sites/default/files/gev_webcast_pressrelease_04222026.pdf"
  },
  {
    id: "pwr-q1fy26",
    name: "Quanta Services Q1 2026 results",
    nameCn: "Quanta Services 2026 年一季度财报",
    url: "https://investors.quantaservices.com/news-events/press-releases/detail/396/quanta-services-reports-first-quarter-2026-results"
  },
  {
    id: "dell-q1fy27",
    name: "Dell Q1 FY2027 earnings call transcript",
    nameCn: "Dell 2027 财年一季度财报电话会",
    url: "https://investors.delltechnologies.com/static-files/b63ffff9-b729-403b-a231-c6af05667759"
  },
  {
    id: "smci-q3fy26",
    name: "Supermicro Q3 FY2026 results",
    nameCn: "Supermicro 2026 财年三季度财报",
    url: "https://ir.supermicro.com/news/news-details/2026/Supermicro-Announces-Third-Quarter-Fiscal-Year-2026-Financial-Results/default.aspx"
  },
  {
    id: "hpe-q2fy26",
    name: "HPE Q2 FY2026 presentation",
    nameCn: "HPE 2026 财年二季度演示材料",
    url: "https://investors.hpe.com/~/media/Files/H/HP-Enterprise-IR/documents/q2-2026/q2-2026-earnings-presentation.pdf"
  },
  {
    id: "cdns-q1fy26",
    name: "Cadence Q1 2026 results",
    nameCn: "Cadence 2026 年一季度财报",
    url: "https://www.cadence.com/en_US/home/company/newsroom/press-releases/pr-ir/2026/cadence-reports-first-quarter-2026-financial-results.html"
  },
  {
    id: "snps-q2fy26",
    name: "Synopsys Q2 FY2026 results",
    nameCn: "Synopsys 2026 财年二季度财报",
    url: "https://investor.synopsys.com/news/news-details/2026/Synopsys-Posts-Financial-Results-for-Second-Quarter-Fiscal-Year-2026/default.aspx"
  },
  {
    id: "soun-q1fy26",
    name: "SoundHound AI Q1 2026 results",
    nameCn: "SoundHound AI 2026 年一季度财报",
    url: "https://investors.soundhound.com/news-releases/news-release-details/soundhound-ai-reports-record-q1-revenue-442-million-52"
  },
  {
    id: "bbai-q1fy26",
    name: "BigBear.ai Q1 2026 results",
    nameCn: "BigBear.ai 2026 年一季度财报",
    url: "https://bigbear.ai/newsroom/bigbear-ai-announces-first-quarter-2026-results-increases-backlog-including-more-than-60-million-in-national-security-contracts-and-affirms-revenue-guidance/"
  },
  {
    id: "ionq-q1fy26",
    name: "IonQ Q1 2026 investor update",
    nameCn: "IonQ 2026 年一季度投资者更新",
    url: "https://s28.q4cdn.com/828571518/files/doc_financials/2026/q1/IONQ_Q1-2026-Investor-Updates-vFINAL-VERSION-2026-05-06.pdf"
  },
  {
    id: "rgti-q1fy26",
    name: "Rigetti Q1 2026 results",
    nameCn: "Rigetti 2026 年一季度财报",
    url: "https://investors.rigetti.com/news-releases/news-release-details/rigetti-computing-reports-first-quarter-2026-financial-results/"
  },
  {
    id: "path-q1fy27",
    name: "UiPath Q1 FY2027 results",
    nameCn: "UiPath 2027 财年一季度财报",
    url: "https://ir.uipath.com/news/detail/452/uipath-reports-first-quarter-fiscal-2027-financial-results"
  },
  {
    id: "tsla-q1fy26",
    name: "Tesla Q1 2026 results advisory",
    nameCn: "Tesla 2026 年一季度财报公告",
    url: "https://www.nasdaq.com/press-release/tesla-releases-first-quarter-2026-financial-results-2026-04-22"
  },
  {
    id: "isrg-q1fy26",
    name: "Intuitive Q1 2026 earnings release",
    nameCn: "Intuitive Surgical 2026 年一季度财报",
    url: "https://isrg.intuitive.com/static-files/7d9971cd-32b3-4f7c-a50c-3768f0b5a055"
  },
  {
    id: "mbly-q1fy26",
    name: "Mobileye Q1 2026 results",
    nameCn: "Mobileye 2026 年一季度财报",
    url: "https://ir.mobileye.com/news-releases/news-release-details/mobileye-releases-first-quarter-2026-results-updates-full-year/"
  },
  {
    id: "samsung-q1fy26",
    name: "Samsung Electronics Q1 2026 results",
    nameCn: "三星电子 2026 年一季度财报",
    url: "https://news.samsung.com/global/samsung-electronics-announces-first-quarter-2026-results"
  },
  {
    id: "skhynix-q1fy26",
    name: "SK hynix Q1 2026 financial results",
    nameCn: "SK 海力士 2026 年一季度财报",
    url: "https://news.skhynix.com/q1-2026-business-results/"
  },
  {
    id: "honhai-q1fy26",
    name: "Hon Hai / Foxconn Q1 2026 financial results",
    nameCn: "鸿海 / 富士康 2026 年一季度财报",
    url: "https://www.foxconn.com/en-us/press-center/press-releases/latest-news?category=Monthly+Revenues"
  },
  {
    id: "mediatek-q1fy26",
    name: "MediaTek 1Q 2026 earnings materials",
    nameCn: "联发科 2026 年一季度财报材料",
    url: "https://www.mediatek.com/investor-relations"
  },
  {
    id: "schneider-q1fy26",
    name: "Schneider Electric Q1 2026 revenues",
    nameCn: "施耐德电气 2026 年一季度收入",
    url: "https://www.se.com/ww/en/about-us/investor-relations/financial-results/"
  },
  {
    id: "abb-q1fy26",
    name: "ABB Q1 2026 results",
    nameCn: "ABB 2026 年一季度财报",
    url: "https://www.abb.com/global/en/news/135137/q1-2026-results"
  },
  {
    id: "siemens-energy-q2fy26",
    name: "Siemens Energy Q2 FY2026 investor relations",
    nameCn: "西门子能源 2026 财年二季度投资者资料",
    url: "https://www.siemens-energy.com/global/en/home/investor-relations.html"
  },
  {
    id: "infineon-q2fy26",
    name: "Infineon Q2 FY2026 results",
    nameCn: "英飞凌 2026 财年二季度财报",
    url: "https://www.infineon.com/press-release/2026/infxx202605-082"
  },
  {
    id: "alibaba-fy26q4",
    name: "Alibaba March quarter and FY2026 results",
    nameCn: "阿里巴巴 2026 财年四季度及全年财报",
    url: "https://www.businesswire.com/news/home/20260512841182/en/Alibaba-Group-Announces-March-Quarter-2026-and-Fiscal-Year-2026-Results"
  },
  {
    id: "tencent-q1fy26",
    name: "Tencent Q1 2026 results",
    nameCn: "腾讯 2026 年一季度财报",
    url: "https://static.www.tencent.com/uploads/2026/05/13/47382ae415a209fd161bc19a1f9b3704.pdf"
  },
  {
    id: "baidu-q1fy26",
    name: "Baidu Q1 2026 results",
    nameCn: "百度 2026 年一季度财报",
    url: "https://ir.baidu.com/static-files/3801bfaf-9eb4-47a9-8b8c-b9f46c524875"
  },
  {
    id: "smic-q1fy26",
    name: "SMIC Q1 2026 unaudited results",
    nameCn: "中芯国际 2026 年一季度未经审计业绩",
    url: "https://www.hkexnews.hk/listedco/listconews/sehk/2026/0514/2026051400908.pdf"
  },
  {
    id: "tokyo-electron-fy26",
    name: "Tokyo Electron FY2026 earnings release library",
    nameCn: "东京电子 2026 财年业绩资料库",
    url: "https://www.tel.com/ir/index.html"
  },
  {
    id: "advantest-fy25",
    name: "Advantest FY2025 financial results",
    nameCn: "爱德万测试 2025 财年业绩",
    url: "https://www.advantest.com/en/investors/ir-library/result/"
  },
  {
    id: "renesas-q1fy26",
    name: "Renesas Q1 2026 financial results",
    nameCn: "瑞萨电子 2026 年一季度财报",
    url: "https://www.renesas.com/en/about/investor-relations"
  },
  {
    id: "bloomberg-ai-accelerator-2026",
    name: "Bloomberg Intelligence AI Accelerator Chips 2026 Outlook",
    nameCn: "Bloomberg Intelligence AI 加速器芯片 2026 展望",
    url: "https://www.bloomberg.com/professional/insights/artificial-intelligence/ai-accelerator-chips-2026-outlook/"
  },
  {
    id: "bloomberg-big-tech-capex-2026",
    name: "Bloomberg: US Big Tech AI capex exceeds $700B",
    nameCn: "Bloomberg：美国科技巨头 AI 资本开支超过 7000 亿美元",
    url: "https://www.bloomberg.com/news/articles/2026-04-30/us-big-tech-ratchets-up-ai-spending-past-700-billion-this-year"
  },
  {
    id: "bloomberg-memory-shortage-2026",
    name: "Bloomberg Graphics: AI memory chip shortage",
    nameCn: "Bloomberg 图解：AI 存储芯片短缺",
    url: "https://www.bloomberg.com/graphics/2026-ai-boom-memory-chip-shortage/"
  },
  {
    id: "bloomberg-electrical-parts-2026",
    name: "Bloomberg: AI data-center buildout and electrical parts",
    nameCn: "Bloomberg：AI 数据中心建设与电气设备瓶颈",
    url: "https://www.bloomberg.com/news/features/2026-04-01/us-ai-data-center-expansion-relies-on-chinese-electrical-equipment-imports"
  },
  {
    id: "bloomberg-meta-amd-2026",
    name: "Bloomberg: Meta AMD AI infrastructure deal",
    nameCn: "Bloomberg：Meta 与 AMD AI 基础设施协议",
    url: "https://www.bloomberg.com/news/articles/2026-02-24/meta-to-spend-tens-of-billions-of-dollars-on-amd-gear-buy-stock"
  },
  {
    id: "bloomberg-skhynix-hbm-2026",
    name: "Bloomberg: SK hynix AI memory production pledge",
    nameCn: "Bloomberg：SK 海力士承诺扩大 AI 存储产量",
    url: "https://www.bloomberg.com/news/articles/2026-02-23/sk-hynix-boss-pledges-to-boost-output-of-ai-memory-chips"
  },
  {
    id: "semianalysis-deepseek-gb200-2026",
    name: "SemiAnalysis InferenceX: GB200 NVL72 vs B200 on DeepSeek R1",
    nameCn: "SemiAnalysis InferenceX：GB200 NVL72 与 B200 的 DeepSeek R1 推理对比",
    url: "https://inferencex.semianalysis.com/blog/gb200-nvl72-vs-b200-disagg-deepseek-r1-fp4-dynamo-trt"
  },
  {
    id: "semianalysis-kimi-gb200-2026",
    name: "SemiAnalysis InferenceX: GB200 NVL72 vs B200 on Kimi K2.5",
    nameCn: "SemiAnalysis InferenceX：GB200 NVL72 与 B200 的 Kimi K2.5 推理对比",
    url: "https://inferencex.semianalysis.com/blog/gb200-nvl72-kimi-k2-5-vllm-wide-ep-3x-vs-b200"
  },
  {
    id: "semianalysis-gb200-bom",
    name: "SemiAnalysis GB200 component and supply-chain model",
    nameCn: "SemiAnalysis GB200 组件与供应链模型",
    url: "https://semianalysis.com/2024/07/16/semianalysis-gb200-component-and/"
  },
  {
    id: "semianalysis-accelerator-hbm-model",
    name: "SemiAnalysis Accelerator & HBM Model",
    nameCn: "SemiAnalysis AI 加速器与 HBM 模型",
    url: "https://semianalysis.com/accelerator-model"
  },
  {
    id: "semianalysis-space-dc-tco",
    name: "SemiAnalysis Space Datacenter TCO Model",
    nameCn: "SemiAnalysis 太空数据中心 TCO 模型",
    url: "https://semianalysis.com/space-dc-tco/"
  },
  {
    id: "semianalysis-chipbook-sample",
    name: "SemiAnalysis Sample Chipbook",
    nameCn: "SemiAnalysis Chipbook 样本",
    url: "https://semianalysis.com/wp-content/uploads/2026/02/Sample-Chipbook.pdf"
  }
];

const newsItems = [
  {
    id: "news-big-tech-capex",
    dateLabel: "2026-04-30",
    dateSort: "2026-04-30",
    sourceId: "bloomberg-big-tech-capex-2026",
    sourceName: "Bloomberg",
    sourceType: "Professional / Paywalled",
    sourceTypeCn: "专业媒体 / 可能需订阅",
    region: "United States",
    layer: "cloud",
    importance: "High",
    tickers: ["MSFT", "GOOGL", "META", "AMZN", "NVDA", "VRT", "ETN"],
    headline: "US Big Tech AI capex plans move above $700B for 2026.",
    headlineCn: "美国大型科技公司 2026 年 AI 资本开支计划升至 7000 亿美元以上。",
    summary:
      "Bloomberg reported that the largest US technology companies planned as much as $725B of 2026 capex, mainly for AI data-center equipment. This is the top-down demand anchor for semis, power, cooling and networking.",
    summaryCn:
      "Bloomberg 报道美国最大科技公司 2026 年资本开支最高约 7250 亿美元，主要用于 AI 数据中心设备。这是半导体、电力、冷却和网络需求的顶部锚点。",
    analystTake:
      "Treat this as the primary demand variable. If capex guidance rises while cloud AI revenue accelerates, infrastructure winners can keep compounding; if ROI questions grow, high-multiple suppliers de-rate first.",
    analystTakeCn:
      "把它作为首要需求变量。若资本开支指引上升且云 AI 收入加速，基础设施赢家仍可复合增长；若 ROI 质疑增强，高估值供应商会先被重估。"
  },
  {
    id: "news-electrical-bottleneck",
    dateLabel: "2026-04-01",
    dateSort: "2026-04-01",
    sourceId: "bloomberg-electrical-parts-2026",
    sourceName: "Bloomberg",
    sourceType: "Professional / Paywalled",
    sourceTypeCn: "专业媒体 / 可能需订阅",
    region: "United States / China",
    layer: "energy-grid",
    importance: "High",
    tickers: ["VRT", "ETN", "GEV", "PWR"],
    headline: "AI data-center expansion depends on electrical equipment supply.",
    headlineCn: "AI 数据中心扩张取决于电气设备供应。",
    summary:
      "Bloomberg highlighted transformer, switchgear and battery constraints as a practical bottleneck for rapid US AI data-center construction, with imports remaining important.",
    summaryCn:
      "Bloomberg 强调变压器、开关设备和电池约束是美国 AI 数据中心快速建设的实际瓶颈，进口设备仍然重要。",
    analystTake:
      "This supports a broader power-chain basket rather than a chip-only AI portfolio. Watch order lead times, price increases and domestic capacity additions.",
    analystTakeCn:
      "这支持构建更广的电力链组合，而不是只买芯片。关注交付周期、提价和本土产能扩张。"
  },
  {
    id: "news-memory-shortage",
    dateLabel: "2026-03",
    dateSort: "2026-03-01",
    sourceId: "bloomberg-memory-shortage-2026",
    sourceName: "Bloomberg Graphics",
    sourceType: "Professional / Data visual",
    sourceTypeCn: "专业媒体 / 数据图解",
    region: "Korea / United States",
    layer: "silicon",
    importance: "High",
    tickers: ["MU", "NVDA", "AMD"],
    headline: "AI demand is absorbing memory supply and lifting HBM scarcity.",
    headlineCn: "AI 需求吸收存储供应并强化 HBM 稀缺。",
    summary:
      "Bloomberg's graphics feature framed HBM as a structural bottleneck, with AI servers taking rising DRAM share and consumer-electronics makers facing tighter memory supply.",
    summaryCn:
      "Bloomberg 图解将 HBM 定位为结构性瓶颈，AI 服务器占用更多 DRAM 供应，消费电子厂商面临更紧存储供给。",
    analystTake:
      "HBM is no longer a simple cyclical memory call. Track pre-allocation, packaging capacity, margins and whether non-AI demand gets crowded out.",
    analystTakeCn:
      "HBM 已不只是传统存储周期交易。跟踪预分配、封装产能、利润率，以及非 AI 需求是否被挤出。"
  },
  {
    id: "news-meta-amd",
    dateLabel: "2026-02-24",
    dateSort: "2026-02-24",
    sourceId: "bloomberg-meta-amd-2026",
    sourceName: "Bloomberg",
    sourceType: "Professional / Paywalled",
    sourceTypeCn: "专业媒体 / 可能需订阅",
    region: "United States",
    layer: "silicon",
    importance: "High",
    tickers: ["AMD", "META", "NVDA", "AVGO", "MRVL"],
    headline: "Meta commits to a multi-year AMD AI infrastructure deployment.",
    headlineCn: "Meta 承诺部署多年期 AMD AI 基础设施。",
    summary:
      "Bloomberg reported a large Meta-AMD deal involving gigawatts of AI data-center gear starting in the second half of 2026, validating demand for a second accelerator ecosystem.",
    summaryCn:
      "Bloomberg 报道 Meta 与 AMD 的大型协议，涉及 2026 年下半年开始部署的 GW 级 AI 数据中心设备，验证第二加速器生态需求。",
    analystTake:
      "The key is not only AMD unit share; it is whether hyperscalers use alternative accelerators to create price competition and diversify supply.",
    analystTakeCn:
      "关键不只是 AMD 份额，而是云厂商是否用替代加速器制造价格竞争并分散供应。"
  },
  {
    id: "news-skhynix-hbm-output",
    dateLabel: "2026-02-23",
    dateSort: "2026-02-23",
    sourceId: "bloomberg-skhynix-hbm-2026",
    sourceName: "Bloomberg",
    sourceType: "Professional / Paywalled",
    sourceTypeCn: "专业媒体 / 可能需订阅",
    region: "Korea",
    layer: "silicon",
    importance: "High",
    tickers: ["MU", "NVDA"],
    headline: "SK Group leadership signals more AI memory capacity.",
    headlineCn: "SK 集团管理层释放扩大 AI 存储产能信号。",
    summary:
      "Bloomberg covered SK Group leadership pledging to grow AI memory production as demand from global data-center construction surged.",
    summaryCn:
      "Bloomberg 报道 SK 集团管理层承诺扩大 AI 存储产量，以满足全球数据中心建设带来的需求激增。",
    analystTake:
      "For Korea, SK hynix and Samsung are not peripheral suppliers; they are central to the global AI compute ceiling.",
    analystTakeCn:
      "对韩国而言，SK 海力士与三星不是边缘供应商，而是全球 AI 算力上限的核心决定因素。"
  },
  {
    id: "news-bi-accelerator-outlook",
    dateLabel: "2026 Outlook",
    dateSort: "2026-03-01",
    sourceId: "bloomberg-ai-accelerator-2026",
    sourceName: "Bloomberg Intelligence",
    sourceType: "Professional research",
    sourceTypeCn: "专业研究",
    region: "Global",
    layer: "silicon",
    importance: "High",
    tickers: ["NVDA", "AMD", "AVGO", "MRVL", "ARM"],
    headline: "AI accelerator market outlook emphasizes GPUs, ASICs and cloud capex.",
    headlineCn: "AI 加速器展望强调 GPU、ASIC 与云资本开支。",
    summary:
      "Bloomberg Intelligence frames Nvidia, AMD, Broadcom and Marvell as leaders in the AI accelerator expansion, with GPU systems and ASICs both growing as inference scales.",
    summaryCn:
      "Bloomberg Intelligence 将 NVIDIA、AMD、Broadcom 和 Marvell 视为 AI 加速器扩张中的领先者，GPU 系统和 ASIC 都将随推理规模扩大而增长。",
    analystTake:
      "Use this to compare merchant GPU leaders versus custom silicon beneficiaries. ASIC growth can coexist with NVIDIA leadership.",
    analystTakeCn:
      "用它比较通用 GPU 龙头和定制芯片受益者。ASIC 增长可以与 NVIDIA 领先地位并存。"
  },
  {
    id: "news-semianalysis-deepseek-gb200",
    dateLabel: "2026-05-23",
    dateSort: "2026-05-23",
    sourceId: "semianalysis-deepseek-gb200-2026",
    sourceName: "SemiAnalysis InferenceX",
    sourceType: "Benchmark / Technical",
    sourceTypeCn: "基准测试 / 技术",
    region: "Global",
    layer: "silicon",
    importance: "High",
    tickers: ["NVDA", "ANET", "MRVL", "AVGO", "VRT"],
    headline: "GB200 NVL72 shows large inference throughput advantage versus B200 in DeepSeek R1 tests.",
    headlineCn: "DeepSeek R1 测试中 GB200 NVL72 相对 B200 显示显著推理吞吐优势。",
    summary:
      "SemiAnalysis InferenceX benchmarked GB200 NVL72 versus B200 on DeepSeek R1, highlighting the value of 72-GPU NVLink scale-up fabric for MoE inference.",
    summaryCn:
      "SemiAnalysis InferenceX 对 GB200 NVL72 与 B200 在 DeepSeek R1 上进行基准测试，突出 72 GPU NVLink scale-up fabric 对 MoE 推理的价值。",
    analystTake:
      "This is important for margin mix: rack-scale systems, liquid cooling and NVLink fabric can matter as much as the GPU chip itself.",
    analystTakeCn:
      "这对利润结构很重要：机柜级系统、液冷和 NVLink fabric 的价值可能不低于 GPU 芯片本身。"
  },
  {
    id: "news-semianalysis-kimi-gb200",
    dateLabel: "2026-05",
    dateSort: "2026-05-15",
    sourceId: "semianalysis-kimi-gb200-2026",
    sourceName: "SemiAnalysis InferenceX",
    sourceType: "Benchmark / Technical",
    sourceTypeCn: "基准测试 / 技术",
    region: "Global / China models",
    layer: "silicon",
    importance: "Medium",
    tickers: ["NVDA", "VRT", "ANET"],
    headline: "GB200 NVL72 outperforms B200 on Kimi K2.5 inference at comparable interactivity.",
    headlineCn: "在可比交互速度下，GB200 NVL72 在 Kimi K2.5 推理中优于 B200。",
    summary:
      "InferenceX data showed GB200 NVL72 achieving materially higher tokens per GPU than B200 on Kimi K2.5 in tested configurations.",
    summaryCn:
      "InferenceX 数据显示，在测试配置中 GB200 NVL72 在 Kimi K2.5 上的单 GPU tokens 吞吐显著高于 B200。",
    analystTake:
      "Chinese open-weight and MoE model workloads are useful stress tests for Western AI hardware economics.",
    analystTakeCn:
      "中国开源权重和 MoE 模型工作负载是检验西方 AI 硬件经济性的有用压力测试。"
  },
  {
    id: "news-semianalysis-gb200-bom",
    dateLabel: "2024-07-16 / still relevant",
    dateSort: "2024-07-16",
    sourceId: "semianalysis-gb200-bom",
    sourceName: "SemiAnalysis",
    sourceType: "Supply-chain model",
    sourceTypeCn: "供应链模型",
    region: "Global",
    layer: "datacenter",
    importance: "High",
    tickers: ["NVDA", "DELL", "SMCI", "VRT", "MRVL", "AVGO", "ANET"],
    headline: "GB200 component and supply-chain model maps rack-level AI value capture.",
    headlineCn: "GB200 组件与供应链模型映射机柜级 AI 价值分配。",
    summary:
      "SemiAnalysis' GB200 model maps components, SKUs, suppliers and bill-of-material implications for NVL72/NVL36 systems.",
    summaryCn:
      "SemiAnalysis 的 GB200 模型映射 NVL72/NVL36 系统的组件、SKU、供应商和 BOM 影响。",
    analystTake:
      "Use this to avoid over-simplifying NVIDIA as only a chip story; many suppliers participate in rack-scale value.",
    analystTakeCn:
      "用它避免把 NVIDIA 简化成单一芯片故事；大量供应商参与机柜级价值分配。"
  },
  {
    id: "news-semianalysis-accelerator-hbm",
    dateLabel: "Model covers 2023-2027",
    dateSort: "2026-02-01",
    sourceId: "semianalysis-accelerator-hbm-model",
    sourceName: "SemiAnalysis",
    sourceType: "Data model",
    sourceTypeCn: "数据模型",
    region: "Global",
    layer: "silicon",
    importance: "High",
    tickers: ["NVDA", "AMD", "AVGO", "MRVL", "GOOGL", "AMZN", "MSFT", "MU"],
    headline: "Accelerator & HBM model tracks accelerator production and HBM supply.",
    headlineCn: "AI 加速器与 HBM 模型跟踪加速器产量和 HBM 供应。",
    summary:
      "SemiAnalysis describes a quarterly 2023-2027 model covering accelerator shipments, ASPs, supply chain data, deployed capacity and FLOPS.",
    summaryCn:
      "SemiAnalysis 描述其 2023-2027 季度模型覆盖加速器出货、ASP、供应链数据、部署产能和 FLOPS。",
    analystTake:
      "This is the type of dataset needed for institutional-level triangulation beyond company press releases.",
    analystTakeCn:
      "这类数据集适合机构级交叉验证，超越公司新闻稿本身。"
  },
  {
    id: "news-semianalysis-space-dc",
    dateLabel: "2026",
    dateSort: "2026-06-01",
    sourceId: "semianalysis-space-dc-tco",
    sourceName: "SemiAnalysis",
    sourceType: "TCO model",
    sourceTypeCn: "TCO 模型",
    region: "Global",
    layer: "energy-grid",
    importance: "Medium",
    tickers: ["NVDA", "VRT", "GEV", "ETN"],
    headline: "Space datacenter TCO model stress-tests terrestrial AI capacity constraints.",
    headlineCn: "太空数据中心 TCO 模型用于压力测试地面 AI 产能约束。",
    summary:
      "SemiAnalysis' model evaluates whether and when orbital compute could compete with terrestrial AI datacenters under power, cooling, launch and silicon constraints.",
    summaryCn:
      "SemiAnalysis 模型评估在电力、冷却、发射和硅片约束下，轨道计算何时可能与地面 AI 数据中心竞争。",
    analystTake:
      "This is not a near-term base case, but it clarifies how severe terrestrial power and cooling constraints could become.",
    analystTakeCn:
      "这不是近期基本情景，但能说明地面电力和冷却约束可能严重到什么程度。"
  },
  {
    id: "news-semianalysis-chipbook",
    dateLabel: "2026-02 sample",
    dateSort: "2026-02-01",
    sourceId: "semianalysis-chipbook-sample",
    sourceName: "SemiAnalysis",
    sourceType: "Supply-chain data sample",
    sourceTypeCn: "供应链数据样本",
    region: "Global / Asia",
    layer: "semicap",
    importance: "Medium",
    tickers: ["TSM", "ASML", "MU"],
    headline: "Chipbook sample highlights memory, China import data and data-center trackers.",
    headlineCn: "Chipbook 样本强调存储、中国进口数据与数据中心追踪器。",
    summary:
      "SemiAnalysis' sample references memory datasets, China import data and server/data-center supply-chain trackers as alternative data for AI infrastructure monitoring.",
    summaryCn:
      "SemiAnalysis 样本提到存储数据集、中国进口数据以及服务器/数据中心供应链追踪器，可作为 AI 基础设施监测的另类数据。",
    analystTake:
      "Alternative data can catch supply-chain turns before they appear in quarterly earnings.",
      analystTakeCn: "另类数据可能比季度财报更早捕捉供应链拐点。"
  }
];

const companies = [
  {
    id: "nvda",
    ticker: "NVDA",
    company: "NVIDIA",
    companyCn: "英伟达",
    market: "US",
    layer: "silicon",
    type: "Core",
    conviction: "Anchor",
    valuationRisk: "High",
    score: 96,
    role: "AI accelerator, networking and full-stack AI factory platform.",
    roleCn: "AI 加速器、网络互联与全栈 AI 工厂平台。",
    lastReport: "2026-05-20",
    nextWindow: "Late Aug 2026, estimated",
    financials: "Q1 FY2027 revenue $81.6B, +85% YoY; data center revenue $75.2B, +92% YoY; GAAP EPS $2.39.",
    financialsCn: "2027 财年 Q1 收入 816 亿美元，同比 +85%；数据中心收入 752 亿美元，同比 +92%；GAAP EPS 2.39 美元。",
    aiRead: "The cleanest direct read-through for global training and inference demand. Watch mix shift between hyperscaler systems, enterprise AI and networking attach.",
    aiReadCn: "最直接反映全球训练和推理需求。关注超大云系统、企业 AI 与网络互联 attach 的结构变化。",
    catalysts: ["Rubin cycle orders", "Ethernet and NVLink attach", "China/export control updates"],
    catalystsCn: ["Rubin 周期订单", "以太网和 NVLink 配套率", "中国与出口管制更新"],
    risks: ["Customer concentration", "Gross margin normalization", "Export controls"],
    risksCn: ["客户集中度", "毛利率正常化", "出口管制"],
    sourceIds: ["nvda-q1fy27"]
  },
  {
    id: "amd",
    ticker: "AMD",
    company: "Advanced Micro Devices",
    companyCn: "超威半导体",
    market: "US",
    layer: "silicon",
    type: "Core",
    conviction: "High",
    valuationRisk: "High",
    score: 89,
    role: "AI GPUs, EPYC CPUs and semi-custom compute.",
    roleCn: "AI GPU、EPYC CPU 与半定制计算平台。",
    lastReport: "2026-05-05",
    nextWindow: "Early Aug 2026, estimated",
    financials: "Q1 2026 revenue about $10.25B, +38% YoY; data center revenue about $5.8B, +57% YoY.",
    financialsCn: "2026 年 Q1 收入约 102.5 亿美元，同比 +38%；数据中心收入约 58 亿美元，同比 +57%。",
    aiRead: "AMD is the main listed alternative accelerator platform. The investment debate is moving from proof-of-product to size and durability of AI GPU backlog.",
    aiReadCn: "AMD 是上市市场最重要的替代型 AI 加速平台。投资争论正从产品验证转向 AI GPU 订单规模与持续性。",
    catalysts: ["MI450 customer ramps", "Server CPU share gains", "Open ecosystem adoption"],
    catalystsCn: ["MI450 客户放量", "服务器 CPU 份额提升", "开放生态采用"],
    risks: ["NVIDIA ecosystem gap", "Memory and substrate constraints", "China revenue volatility"],
    risksCn: ["与 NVIDIA 生态差距", "存储和基板约束", "中国收入波动"],
    sourceIds: ["amd-q1fy26"]
  },
  {
    id: "avgo",
    ticker: "AVGO",
    company: "Broadcom",
    companyCn: "博通",
    market: "US",
    layer: "silicon",
    type: "Core",
    conviction: "Anchor",
    valuationRisk: "Medium",
    score: 93,
    role: "Custom AI ASICs, networking silicon and infrastructure software.",
    roleCn: "定制 AI ASIC、网络芯片与基础设施软件。",
    lastReport: "2026-06-03",
    nextWindow: "Early Sep 2026, estimated",
    financials: "Q2 FY2026 revenue $22.2B, +48% YoY, driven by AI semiconductor growth and VMware operating leverage.",
    financialsCn: "2026 财年 Q2 收入 222 亿美元，同比 +48%，由 AI 半导体和 VMware 经营杠杆驱动。",
    aiRead: "Best positioned custom silicon compounder for hyperscalers that want ASIC economics beside merchant GPUs.",
    aiReadCn: "在希望用 ASIC 优化成本的云厂商中，博通是最核心的定制芯片复合增长标的。",
    catalysts: ["New XPU customers", "AI networking mix", "VMware cash flow execution"],
    catalystsCn: ["新增 XPU 客户", "AI 网络收入占比", "VMware 现金流执行"],
    risks: ["Large customer timing", "ASIC cyclicality", "Integration complexity"],
    risksCn: ["大客户节奏", "ASIC 周期性", "整合复杂度"],
    sourceIds: ["broadcom-q2fy26"]
  },
  {
    id: "mrvl",
    ticker: "MRVL",
    company: "Marvell Technology",
    companyCn: "美满电子科技",
    market: "US",
    layer: "silicon",
    type: "Watchlist",
    conviction: "High",
    valuationRisk: "High",
    score: 86,
    role: "Data infrastructure silicon, custom compute, optical DSP and AI interconnect.",
    roleCn: "数据基础设施芯片、定制计算、光 DSP 与 AI 互联。",
    lastReport: "2026-05-29",
    nextWindow: "Late Aug 2026, estimated",
    financials: "Q1 FY2027 revenue $2.418B, a record, +28% YoY; data center revenue $1.833B, +27% YoY.",
    financialsCn: "2027 财年 Q1 收入 24.18 亿美元，创纪录，同比 +28%；数据中心收入 18.33 亿美元，同比 +27%。",
    aiRead: "A higher-beta way to express custom silicon, optics and networking content growth inside AI clusters.",
    aiReadCn: "更高 beta 地表达 AI 集群中的定制芯片、光互联和网络内容增长。",
    catalysts: ["Custom ASIC wins", "Optical interconnect cycle", "Celestial AI and XConn integration"],
    catalystsCn: ["定制 ASIC 订单", "光互联周期", "Celestial AI 与 XConn 整合"],
    risks: ["Lumpy programs", "Execution after acquisitions", "High expectations"],
    risksCn: ["项目收入波动", "收购后执行", "预期过高"],
    sourceIds: ["mrvl-q1fy27"]
  },
  {
    id: "arm",
    ticker: "ARM",
    company: "Arm Holdings",
    companyCn: "Arm",
    market: "US",
    layer: "silicon",
    type: "Watchlist",
    conviction: "High",
    valuationRisk: "High",
    score: 84,
    role: "CPU IP, compute subsystems and edge-to-cloud royalty model.",
    roleCn: "CPU IP、计算子系统与从边缘到云的版税模式。",
    lastReport: "2026-05-06",
    nextWindow: "Early Aug 2026, estimated",
    financials: "Q4 FY2026 revenue $1.49B, +20% YoY; FY2026 revenue $4.92B, +23%; record royalty revenue.",
    financialsCn: "2026 财年 Q4 收入 14.9 亿美元，同比 +20%；全年收入 49.2 亿美元，同比 +23%；版税收入创纪录。",
    aiRead: "Arm is a toll road on edge AI, custom silicon and lower-power compute, but valuation already prices a long runway.",
    aiReadCn: "Arm 是边缘 AI、定制芯片和低功耗计算的收费站，但估值已反映较长增长预期。",
    catalysts: ["Arm AGI CPU demand", "Cloud AI royalties", "CSS adoption"],
    catalystsCn: ["Arm AGI CPU 需求", "云 AI 版税", "CSS 采用"],
    risks: ["Royalty timing", "Customer bargaining power", "Premium multiple"],
    risksCn: ["版税确认节奏", "客户议价能力", "高估值倍数"],
    sourceIds: ["arm-q4fy26"]
  },
  {
    id: "mu",
    ticker: "MU",
    company: "Micron Technology",
    companyCn: "美光科技",
    market: "US",
    layer: "silicon",
    type: "Core",
    conviction: "High",
    valuationRisk: "Medium",
    score: 88,
    role: "HBM, DRAM and NAND supplier for AI servers.",
    roleCn: "AI 服务器 HBM、DRAM 与 NAND 供应商。",
    lastReport: "2026-03-18",
    nextWindow: "Late Jun 2026, estimated",
    financials: "Fiscal Q2 2026 results highlighted HBM demand and guided FY2026 revenue to about $33.5B plus/minus $750M.",
    financialsCn: "2026 财年 Q2 强调 HBM 需求，并指引 2026 财年收入约 335 亿美元，上下浮动 7.5 亿美元。",
    aiRead: "Memory is a binding constraint in AI systems; HBM mix can lift margins, but the cycle remains supply-sensitive.",
    aiReadCn: "存储是 AI 系统的关键约束；HBM 结构提升有利于毛利率，但行业仍受供给周期影响。",
    catalysts: ["HBM share gains", "Pricing cycle", "Data center DRAM records"],
    catalystsCn: ["HBM 份额提升", "价格周期", "数据中心 DRAM 创纪录"],
    risks: ["Memory cycle downturn", "Capex overbuild", "Customer qualification timing"],
    risksCn: ["存储周期下行", "资本开支过度", "客户认证节奏"],
    sourceIds: ["mu-q2fy26"]
  },
  {
    id: "tsm",
    ticker: "TSM",
    company: "Taiwan Semiconductor Manufacturing",
    companyCn: "台积电",
    market: "US/Taiwan",
    layer: "semicap",
    type: "Core",
    conviction: "Anchor",
    valuationRisk: "Medium",
    score: 94,
    role: "Leading-edge foundry and advanced packaging capacity.",
    roleCn: "先进制程晶圆代工与先进封装产能。",
    lastReport: "2026-05-08",
    nextWindow: "Monthly revenue on or around Jul 10 2026; Q2 results mid-Jul, estimated",
    financials: "April 2026 revenue NT$410.73B, -1.1% MoM and +17.5% YoY.",
    financialsCn: "2026 年 4 月营收新台币 4107.3 亿元，环比 -1.1%，同比 +17.5%。",
    aiRead: "The most important manufacturing bottleneck for advanced AI silicon; watch CoWoS, 2nm and customer mix.",
    aiReadCn: "先进 AI 芯片最重要的制造瓶颈；重点关注 CoWoS、2nm 与客户结构。",
    catalysts: ["CoWoS expansion", "2nm ramp", "AI accelerator demand"],
    catalystsCn: ["CoWoS 扩产", "2nm 量产", "AI 加速器需求"],
    risks: ["Geopolitics", "Customer concentration", "FX and capex intensity"],
    risksCn: ["地缘政治", "客户集中度", "汇率与资本开支强度"],
    sourceIds: ["tsmc-apr2026"]
  },
  {
    id: "asml",
    ticker: "ASML",
    company: "ASML",
    companyCn: "阿斯麦",
    market: "US/Netherlands",
    layer: "semicap",
    type: "Core",
    conviction: "Anchor",
    valuationRisk: "Medium",
    score: 92,
    role: "EUV and High-NA lithography monopoly supplier.",
    roleCn: "EUV 与 High-NA 光刻设备垄断供应商。",
    lastReport: "2026-04-15",
    nextWindow: "Mid-Jul 2026, estimated",
    financials: "Q1 2026 net sales €8.77B; net income €2.76B; gross margin 53.0%.",
    financialsCn: "2026 年 Q1 净销售额 87.7 亿欧元；净利润 27.6 亿欧元；毛利率 53.0%。",
    aiRead: "A structural toll road on leading-edge logic and memory, with China/export controls the main swing factor.",
    aiReadCn: "先进逻辑与存储制程的结构性收费站，主要波动来自中国需求和出口管制。",
    catalysts: ["High-NA adoption", "2026 guidance confidence", "Foundry and memory capex"],
    catalystsCn: ["High-NA 采用", "2026 指引信心", "代工和存储资本开支"],
    risks: ["Export restrictions", "Order lumpiness", "Customer capex pauses"],
    risksCn: ["出口限制", "订单波动", "客户资本开支暂停"],
    sourceIds: ["asml-q1fy26"]
  },
  {
    id: "amat",
    ticker: "AMAT",
    company: "Applied Materials",
    companyCn: "应用材料",
    market: "US",
    layer: "semicap",
    type: "Core",
    conviction: "High",
    valuationRisk: "Medium",
    score: 87,
    role: "Deposition, materials engineering and advanced packaging tools.",
    roleCn: "沉积、材料工程与先进封装设备。",
    lastReport: "2026-05-14",
    nextWindow: "Mid-Aug 2026, estimated",
    financials: "Q2 FY2026 revenue $7.91B, +11% YoY; non-GAAP EPS $2.86; company expects semiconductor equipment business growth above 30% in calendar 2026.",
    financialsCn: "2026 财年 Q2 收入 79.1 亿美元，同比 +11%；非 GAAP EPS 2.86 美元；公司预计 2026 年半导体设备业务增长超 30%。",
    aiRead: "Beneficiary of HBM, DRAM, gate-all-around and packaging inflections.",
    aiReadCn: "受益于 HBM、DRAM、GAA 和先进封装技术拐点。",
    catalysts: ["DRAM/HBM equipment spend", "Advanced packaging", "EPIC Center partnerships"],
    catalystsCn: ["DRAM/HBM 设备支出", "先进封装", "EPIC Center 合作"],
    risks: ["China restrictions", "WFE cyclicality", "Gross margin mix"],
    risksCn: ["中国限制", "晶圆厂设备周期", "毛利率结构"],
    sourceIds: ["amat-q2fy26"]
  },
  {
    id: "lrcx",
    ticker: "LRCX",
    company: "Lam Research",
    companyCn: "泛林集团",
    market: "US",
    layer: "semicap",
    type: "Core",
    conviction: "High",
    valuationRisk: "Medium",
    score: 85,
    role: "Etch and deposition tools leveraged to memory and advanced packaging.",
    roleCn: "刻蚀与沉积设备，受益于存储与先进封装。",
    lastReport: "2026-04-22",
    nextWindow: "Late Jul 2026, estimated",
    financials: "March 2026 quarter delivered record revenue and EPS, with management citing AI-driven demand reshaping semiconductors.",
    financialsCn: "2026 年 3 月季度收入和 EPS 创纪录，管理层称 AI 需求正在重塑半导体行业。",
    aiRead: "Higher memory exposure makes Lam especially sensitive to HBM and NAND recovery.",
    aiReadCn: "存储暴露更高，因此对 HBM 与 NAND 复苏更敏感。",
    catalysts: ["HBM capacity additions", "Etch intensity", "Services resilience"],
    catalystsCn: ["HBM 产能扩张", "刻蚀强度提升", "服务业务韧性"],
    risks: ["Memory oversupply", "Export rules", "Order timing"],
    risksCn: ["存储供给过剩", "出口规则", "订单节奏"],
    sourceIds: ["lrcx-mar2026"]
  },
  {
    id: "klac",
    ticker: "KLAC",
    company: "KLA",
    companyCn: "科磊",
    market: "US",
    layer: "semicap",
    type: "Core",
    conviction: "High",
    valuationRisk: "Medium",
    score: 86,
    role: "Process control, inspection and yield-management systems.",
    roleCn: "过程控制、检测与良率管理系统。",
    lastReport: "2026-04-29",
    nextWindow: "Late Jul 2026, estimated",
    financials: "Q3 FY2026 revenue $3.415B; GAAP net income $1.20B; GAAP diluted EPS $9.12.",
    financialsCn: "2026 财年 Q3 收入 34.15 亿美元；GAAP 净利润 12.0 亿美元；GAAP 摊薄 EPS 9.12 美元。",
    aiRead: "Defect inspection grows in importance as AI chips become larger, denser and more packaging-intensive.",
    aiReadCn: "AI 芯片面积更大、密度更高、封装更复杂，缺陷检测的重要性持续上升。",
    catalysts: ["Advanced nodes", "Packaging inspection", "Service revenue"],
    catalystsCn: ["先进制程", "封装检测", "服务收入"],
    risks: ["Semicap cycle", "China concentration", "High margins invite expectations"],
    risksCn: ["半导体设备周期", "中国占比", "高利润率带来的预期压力"],
    sourceIds: ["klac-q3fy26"]
  },
  {
    id: "snps",
    ticker: "SNPS",
    company: "Synopsys",
    companyCn: "新思科技",
    market: "US",
    layer: "semicap",
    type: "Core",
    conviction: "High",
    valuationRisk: "Medium",
    score: 84,
    role: "EDA, IP and simulation software for chip and system design.",
    roleCn: "芯片与系统设计所需的 EDA、IP 和仿真软件。",
    lastReport: "2026-05-27",
    nextWindow: "Late Aug 2026, estimated",
    financials: "Q2 FY2026 revenue $2.276B in financial supplement; EDA revenue $1.162B and design IP $454M.",
    financialsCn: "2026 财年 Q2 补充资料显示收入 22.76 亿美元；EDA 收入 11.62 亿美元，设计 IP 收入 4.54 亿美元。",
    aiRead: "EDA is a scarce software layer in custom silicon; Ansys integration expands system-level relevance.",
    aiReadCn: "EDA 是定制芯片稀缺软件层；Ansys 整合提升系统级设计相关性。",
    catalysts: ["AI-assisted design", "Ansys cross-sell", "Custom silicon R&D"],
    catalystsCn: ["AI 辅助设计", "Ansys 交叉销售", "定制芯片研发"],
    risks: ["Integration risk", "Long sales cycles", "Regulatory overhang"],
    risksCn: ["整合风险", "销售周期长", "监管不确定性"],
    sourceIds: ["snps-q2fy26"]
  },
  {
    id: "cdns",
    ticker: "CDNS",
    company: "Cadence Design Systems",
    companyCn: "铿腾电子",
    market: "US",
    layer: "semicap",
    type: "Core",
    conviction: "High",
    valuationRisk: "Medium",
    score: 83,
    role: "EDA, verification, digital implementation and AI design automation.",
    roleCn: "EDA、验证、数字实现与 AI 设计自动化。",
    lastReport: "2026-04-28",
    nextWindow: "Late Jul 2026, estimated",
    financials: "Q1 2026 results showed accelerating AI demand and record backlog; core EDA revenue grew 18% YoY.",
    financialsCn: "2026 年 Q1 显示 AI 需求加速与积压订单创纪录；核心 EDA 收入同比 +18%。",
    aiRead: "Strong exposure to advanced AI infrastructure design and AI-driven EDA productivity.",
    aiReadCn: "高度受益于先进 AI 基础设施设计与 AI 驱动的 EDA 生产率提升。",
    catalysts: ["AI Super Agents", "Verification demand", "Backlog conversion"],
    catalystsCn: ["AI Super Agents", "验证需求", "积压订单转化"],
    risks: ["Premium valuation", "EDA budget cycles", "Competition with Synopsys"],
    risksCn: ["高估值", "EDA 预算周期", "与 Synopsys 竞争"],
    sourceIds: ["cdns-q1fy26"]
  },
  {
    id: "anet",
    ticker: "ANET",
    company: "Arista Networks",
    companyCn: "Arista Networks",
    market: "US",
    layer: "datacenter",
    type: "Core",
    conviction: "High",
    valuationRisk: "Medium",
    score: 88,
    role: "Ethernet switching for cloud and AI data center fabrics.",
    roleCn: "云与 AI 数据中心以太网交换网络。",
    lastReport: "2026-05-05",
    nextWindow: "Early Aug 2026, estimated",
    financials: "Q1 2026 revenue $2.709B, +35.1% YoY, with AI and cloud networking demand.",
    financialsCn: "2026 年 Q1 收入 27.09 亿美元，同比 +35.1%，受 AI 与云网络需求驱动。",
    aiRead: "Key beneficiary if Ethernet continues gaining share inside AI clusters against proprietary fabrics.",
    aiReadCn: "若以太网在 AI 集群中持续替代专有网络，Arista 将是关键受益者。",
    catalysts: ["AI Ethernet adoption", "Cloud titan capex", "Campus expansion"],
    catalystsCn: ["AI 以太网采用", "云巨头资本开支", "园区网络扩张"],
    risks: ["Customer concentration", "AI fabric competition", "Gross margin pressure"],
    risksCn: ["客户集中", "AI 网络竞争", "毛利率压力"],
    sourceIds: ["anet-q1fy26"]
  },
  {
    id: "vrt",
    ticker: "VRT",
    company: "Vertiv",
    companyCn: "维谛技术",
    market: "US",
    layer: "energy-grid",
    type: "Core",
    conviction: "High",
    valuationRisk: "Medium",
    score: 87,
    role: "Power, thermal management and liquid cooling for data centers.",
    roleCn: "数据中心电力、热管理与液冷基础设施。",
    lastReport: "2026-04-22",
    nextWindow: "Late Jul 2026, estimated",
    financials: "Q1 2026 organic sales +23% YoY; adjusted operating margin expanded about 430 bps to 20.8%.",
    financialsCn: "2026 年 Q1 有机销售同比 +23%；调整后经营利润率提升约 430 个基点至 20.8%。",
    aiRead: "Direct beneficiary of denser racks, liquid cooling adoption and long data center build cycles.",
    aiReadCn: "直接受益于高密度机柜、液冷采用和数据中心长期建设周期。",
    catalysts: ["Liquid cooling capacity", "Backlog conversion", "Service attachment"],
    catalystsCn: ["液冷产能", "积压订单转化", "服务配套率"],
    risks: ["Execution at high growth", "Input cost inflation", "Customer project delays"],
    risksCn: ["高增长执行", "投入成本通胀", "客户项目延期"],
    sourceIds: ["vrt-q1fy26"]
  },
  {
    id: "dell",
    ticker: "DELL",
    company: "Dell Technologies",
    companyCn: "戴尔科技",
    market: "US",
    layer: "datacenter",
    type: "Core",
    conviction: "High",
    valuationRisk: "Medium",
    score: 86,
    role: "AI server integration, enterprise AI factory and infrastructure services.",
    roleCn: "AI 服务器集成、企业 AI 工厂与基础设施服务。",
    lastReport: "2026-05-28",
    nextWindow: "Late Aug 2026, estimated",
    financials: "Q1 FY2027 call cited $24.4B of AI orders, $16.1B of AI server revenue and record $51.3B AI backlog.",
    financialsCn: "2027 财年 Q1 电话会提到 AI 订单 244 亿美元、AI 服务器收入 161 亿美元、AI 积压订单创纪录达 513 亿美元。",
    aiRead: "A practical AI buildout beneficiary where backlog and component pricing matter more than headline PC cycles.",
    aiReadCn: "现实 AI 建设受益者，积压订单和组件定价比传统 PC 周期更关键。",
    catalysts: ["AI backlog conversion", "NVIDIA rack systems", "Enterprise AI Factory adoption"],
    catalystsCn: ["AI 积压订单转化", "NVIDIA 机柜系统", "企业 AI Factory 采用"],
    risks: ["Low-margin hardware mix", "Memory shortages", "Working capital swings"],
    risksCn: ["低毛利硬件结构", "存储短缺", "营运资金波动"],
    sourceIds: ["dell-q1fy27"]
  },
  {
    id: "smci",
    ticker: "SMCI",
    company: "Super Micro Computer",
    companyCn: "超微电脑",
    market: "US",
    layer: "datacenter",
    type: "Watchlist",
    conviction: "Medium",
    valuationRisk: "High",
    score: 73,
    role: "AI server and rack-scale system supplier.",
    roleCn: "AI 服务器与机柜级系统供应商。",
    lastReport: "2026-05-05",
    nextWindow: "Early Aug 2026, estimated",
    financials: "Q3 FY2026 unaudited results; diluted EPS $0.72 versus $0.60 in Q2 FY2026 and $0.17 in Q3 FY2025.",
    financialsCn: "2026 财年 Q3 未审计财报；摊薄 EPS 0.72 美元，高于 Q2 的 0.60 美元和去年同期的 0.17 美元。",
    aiRead: "High-beta AI server exposure, but investors must underwrite governance, delivery timing and margin volatility.",
    aiReadCn: "AI 服务器高 beta 标的，但需要严肃评估治理、交付节奏和利润率波动。",
    catalysts: ["Rack-scale wins", "New manufacturing footprint", "Guidance credibility"],
    catalystsCn: ["机柜级订单", "新制造基地", "指引可信度"],
    risks: ["Governance perception", "Shipment delays", "Margin volatility"],
    risksCn: ["治理认知", "出货延迟", "利润率波动"],
    sourceIds: ["smci-q3fy26"]
  },
  {
    id: "hpe",
    ticker: "HPE",
    company: "Hewlett Packard Enterprise",
    companyCn: "慧与科技",
    market: "US",
    layer: "datacenter",
    type: "Watchlist",
    conviction: "Medium",
    valuationRisk: "Medium",
    score: 76,
    role: "AI systems, networking, storage and enterprise infrastructure.",
    roleCn: "AI 系统、网络、存储与企业基础设施。",
    lastReport: "2026-06-03",
    nextWindow: "Early Sep 2026, estimated",
    financials: "Q2 FY2026 investor materials highlight AI systems and infrastructure demand; verify latest segment detail before trading.",
    financialsCn: "2026 财年 Q2 投资者材料强调 AI 系统与基础设施需求；交易前需核对最新分部明细。",
    aiRead: "A turnaround and AI-systems lever, especially if enterprise and sovereign AI demand broadens.",
    aiReadCn: "若企业与主权 AI 需求扩散，HPE 是兼具转型与 AI 系统杠杆的标的。",
    catalysts: ["AI systems orders", "Juniper integration", "Enterprise AI services"],
    catalystsCn: ["AI 系统订单", "Juniper 整合", "企业 AI 服务"],
    risks: ["Integration risk", "Lower hardware multiples", "Competitive pricing"],
    risksCn: ["整合风险", "硬件估值较低", "价格竞争"],
    sourceIds: ["hpe-q2fy26"]
  },
  {
    id: "msft",
    ticker: "MSFT",
    company: "Microsoft",
    companyCn: "微软",
    market: "US",
    layer: "cloud",
    type: "Core",
    conviction: "Anchor",
    valuationRisk: "Medium",
    score: 94,
    role: "Azure AI, Copilot, enterprise software and OpenAI ecosystem.",
    roleCn: "Azure AI、Copilot、企业软件与 OpenAI 生态。",
    lastReport: "2026-04-29",
    nextWindow: "Late Jul 2026, estimated",
    financials: "FY2026 Q3 revenue $82.9B; Microsoft Cloud revenue $54.5B, +29%; AI business surpassed $37B annual revenue run-rate.",
    financialsCn: "2026 财年 Q3 收入 829 亿美元；Microsoft Cloud 收入 545 亿美元，同比 +29%；AI 业务年化收入超过 370 亿美元。",
    aiRead: "Most balanced AI monetization profile across infrastructure, platform and applications.",
    aiReadCn: "在基础设施、平台和应用三层中，AI 商业化最均衡。",
    catalysts: ["Azure AI capacity", "Copilot seat expansion", "OpenAI economics"],
    catalystsCn: ["Azure AI 产能", "Copilot 席位扩张", "OpenAI 经济分成"],
    risks: ["Capex scrutiny", "AI gross margins", "Regulatory pressure"],
    risksCn: ["资本开支审视", "AI 毛利率", "监管压力"],
    sourceIds: ["msft-fy26q3"]
  },
  {
    id: "googl",
    ticker: "GOOGL",
    company: "Alphabet",
    companyCn: "Alphabet / Google",
    market: "US",
    layer: "cloud",
    type: "Core",
    conviction: "Anchor",
    valuationRisk: "Medium",
    score: 91,
    role: "Search, Google Cloud, Gemini, TPU and AI research platform.",
    roleCn: "搜索、Google Cloud、Gemini、TPU 与 AI 研究平台。",
    lastReport: "2026-04-29",
    nextWindow: "Late Jul 2026, estimated",
    financials: "Q1 2026 revenue $109.896B; Google Cloud revenue $20.028B; operating income $39.696B.",
    financialsCn: "2026 年 Q1 收入 1098.96 亿美元；Google Cloud 收入 200.28 亿美元；经营利润 396.96 亿美元。",
    aiRead: "Key debate is whether AI strengthens Search and Cloud enough to offset higher capex and competitive answer engines.",
    aiReadCn: "核心争议是 AI 能否足够强化搜索和云业务，以抵消更高资本开支与问答引擎竞争。",
    catalysts: ["Cloud margin expansion", "Gemini product usage", "TPU cost advantage"],
    catalystsCn: ["云利润率扩张", "Gemini 产品使用", "TPU 成本优势"],
    risks: ["Search disruption", "Antitrust remedies", "Capex intensity"],
    risksCn: ["搜索被冲击", "反垄断补救措施", "资本开支强度"],
    sourceIds: ["goog-q1fy26"]
  },
  {
    id: "amzn",
    ticker: "AMZN",
    company: "Amazon",
    companyCn: "亚马逊",
    market: "US",
    layer: "cloud",
    type: "Core",
    conviction: "Anchor",
    valuationRisk: "Medium",
    score: 90,
    role: "AWS, Trainium/Inferentia, marketplace AI and logistics automation.",
    roleCn: "AWS、Trainium/Inferentia、电商 AI 与物流自动化。",
    lastReport: "2026-04-29",
    nextWindow: "Late Jul 2026, estimated",
    financials: "Q1 2026 net sales $181.5B; AWS sales $37.6B, +28% YoY.",
    financialsCn: "2026 年 Q1 净销售额 1815 亿美元；AWS 销售额 376 亿美元，同比 +28%。",
    aiRead: "AWS reacceleration and custom silicon economics are the cleanest AI indicators; retail ads provide a second monetization flywheel.",
    aiReadCn: "AWS 再加速与自研芯片经济性是最清晰的 AI 指标；零售广告提供第二增长飞轮。",
    catalysts: ["AWS AI workloads", "Trainium adoption", "Advertising margin"],
    catalystsCn: ["AWS AI 工作负载", "Trainium 采用", "广告利润率"],
    risks: ["Massive capex", "Retail margin cyclicality", "Regulatory scrutiny"],
    risksCn: ["巨大资本开支", "零售利润率周期", "监管审查"],
    sourceIds: ["amzn-q1fy26"]
  },
  {
    id: "meta",
    ticker: "META",
    company: "Meta Platforms",
    companyCn: "Meta",
    market: "US",
    layer: "cloud",
    type: "Core",
    conviction: "High",
    valuationRisk: "Medium",
    score: 88,
    role: "AI-driven ads, open models, social graph and consumer AI.",
    roleCn: "AI 广告、开放模型、社交图谱与消费级 AI。",
    lastReport: "2026-04-29",
    nextWindow: "Late Jul 2026, estimated",
    financials: "Q1 2026 revenue $56.31B, +33% YoY; diluted EPS $10.44, boosted by an $8.03B tax benefit.",
    financialsCn: "2026 年 Q1 收入 563.1 亿美元，同比 +33%；摊薄 EPS 10.44 美元，其中包含 80.3 亿美元税收收益影响。",
    aiRead: "AI is already visible in ad targeting and engagement, but investors are testing whether superintelligence capex has disciplined ROI.",
    aiReadCn: "AI 已体现在广告定向和用户参与度上，但投资者正在检验超级智能资本开支是否有清晰回报。",
    catalysts: ["AI ad tools", "Meta AI usage", "Capex discipline"],
    catalystsCn: ["AI 广告工具", "Meta AI 使用量", "资本开支纪律"],
    risks: ["Capex escalation", "Reality Labs losses", "Regulatory pressure"],
    risksCn: ["资本开支升级", "Reality Labs 亏损", "监管压力"],
    sourceIds: ["meta-q1fy26"]
  },
  {
    id: "orcl",
    ticker: "ORCL",
    company: "Oracle",
    companyCn: "甲骨文",
    market: "US",
    layer: "cloud",
    type: "Watchlist",
    conviction: "High",
    valuationRisk: "High",
    score: 84,
    role: "OCI cloud infrastructure, database and AI training capacity.",
    roleCn: "OCI 云基础设施、数据库与 AI 训练产能。",
    lastReport: "2026-03-10",
    nextWindow: "2026-06-10 announced",
    financials: "Q3 FY2026 results were reported March 10; Oracle announced Q4 FY2026 results will be released June 10, 2026 after market close.",
    financialsCn: "2026 财年 Q3 已于 3 月 10 日披露；Oracle 公告 2026 财年 Q4 将于 2026 年 6 月 10 日盘后发布。",
    aiRead: "OCI is a high-upside AI capacity story, but investors need backlog-to-revenue conversion and funding discipline.",
    aiReadCn: "OCI 是高上行空间的 AI 产能故事，但需要验证订单转收入和融资纪律。",
    catalysts: ["Q4 FY2026 earnings", "OCI RPO conversion", "Large AI customer contracts"],
    catalystsCn: ["2026 财年 Q4 财报", "OCI RPO 转化", "大型 AI 客户合同"],
    risks: ["Debt and capex intensity", "Customer concentration", "Execution at scale"],
    risksCn: ["债务和资本开支强度", "客户集中度", "大规模执行"],
    sourceIds: ["orcl-q4date"]
  },
  {
    id: "crm",
    ticker: "CRM",
    company: "Salesforce",
    companyCn: "Salesforce",
    market: "US",
    layer: "software",
    type: "Core",
    conviction: "Medium",
    valuationRisk: "Medium",
    score: 79,
    role: "AI CRM, Agentforce and enterprise workflow data.",
    roleCn: "AI CRM、Agentforce 与企业工作流数据。",
    lastReport: "2026-05-27",
    nextWindow: "Late Aug 2026, estimated",
    financials: "Q1 FY2027 revenue $11.1B, +13% YoY; Agentforce ARR cited at about $1.2B in external coverage.",
    financialsCn: "2027 财年 Q1 收入 111 亿美元，同比 +13%；外部报道提到 Agentforce ARR 约 12 亿美元。",
    aiRead: "The central question is whether agents expand workflow value or cannibalize traditional SaaS seats.",
    aiReadCn: "核心问题是智能体会扩展工作流价值，还是蚕食传统 SaaS 席位。",
    catalysts: ["Agentforce adoption", "Data 360 integration", "Margin discipline"],
    catalystsCn: ["Agentforce 采用", "Data 360 整合", "利润率纪律"],
    risks: ["Seat cannibalization", "M&A integration", "Slower bookings"],
    risksCn: ["席位被替代", "并购整合", "订单增长放慢"],
    sourceIds: ["crm-q1fy27"]
  },
  {
    id: "pltr",
    ticker: "PLTR",
    company: "Palantir Technologies",
    companyCn: "Palantir",
    market: "US",
    layer: "software",
    type: "Core",
    conviction: "High",
    valuationRisk: "Very High",
    score: 86,
    role: "Operational AI platform for government and enterprise workflows.",
    roleCn: "面向政府与企业运营工作流的 AI 平台。",
    lastReport: "2026-05-06",
    nextWindow: "Early Aug 2026, estimated",
    financials: "Q1 2026 filings show strong U.S. commercial and government momentum; verify exact segment numbers from 10-Q before trading.",
    financialsCn: "2026 年 Q1 10-Q 显示美国商业和政府业务动能强劲；交易前应核对 10-Q 中具体分部数字。",
    aiRead: "AIP monetization is real, but valuation requires unusually durable growth and operating leverage.",
    aiReadCn: "AIP 商业化已被验证，但估值要求极高的持续增长和经营杠杆。",
    catalysts: ["AIP bootcamp conversion", "Government AI contracts", "International commercial scale"],
    catalystsCn: ["AIP bootcamp 转化", "政府 AI 合同", "国际商业扩张"],
    risks: ["Extreme multiple", "Government controversy", "Growth deceleration"],
    risksCn: ["极高估值倍数", "政府业务争议", "增长放缓"],
    sourceIds: ["pltr-q1fy26"]
  },
  {
    id: "snow",
    ticker: "SNOW",
    company: "Snowflake",
    companyCn: "Snowflake",
    market: "US",
    layer: "software",
    type: "Core",
    conviction: "High",
    valuationRisk: "High",
    score: 84,
    role: "AI Data Cloud, Cortex and enterprise data platform.",
    roleCn: "AI Data Cloud、Cortex 与企业数据平台。",
    lastReport: "2026-05-27",
    nextWindow: "Late Aug 2026, estimated",
    financials: "Q1 FY2027 product revenue $1.33B, +34% YoY; strongest sequential dollar growth in company history.",
    financialsCn: "2027 财年 Q1 产品收入 13.3 亿美元，同比 +34%；创公司历史最强环比美元增长。",
    aiRead: "Data gravity is central to enterprise AI. Watch whether AI workloads lift consumption without hurting gross margin.",
    aiReadCn: "数据重力是企业 AI 核心。关注 AI 工作负载是否提升消费，同时不损害毛利率。",
    catalysts: ["Cortex adoption", "Product revenue acceleration", "RPO conversion"],
    catalystsCn: ["Cortex 采用", "产品收入加速", "RPO 转化"],
    risks: ["Consumption volatility", "Cloud cost pressure", "Competitive data platforms"],
    risksCn: ["消费模式波动", "云成本压力", "数据平台竞争"],
    sourceIds: ["snow-q1fy27"]
  },
  {
    id: "now",
    ticker: "NOW",
    company: "ServiceNow",
    companyCn: "ServiceNow",
    market: "US",
    layer: "software",
    type: "Core",
    conviction: "High",
    valuationRisk: "Medium",
    score: 83,
    role: "AI workflow platform and enterprise service operations.",
    roleCn: "AI 工作流平台与企业服务运营。",
    lastReport: "2026-04-22",
    nextWindow: "Late Jul 2026, estimated",
    financials: "Q1 2026 subscription revenue $3.671B, +22% YoY and +19% constant currency.",
    financialsCn: "2026 年 Q1 订阅收入 36.71 亿美元，同比 +22%，按固定汇率 +19%。",
    aiRead: "Strong candidate for agentic workflow monetization because it sits inside mission-critical enterprise processes.",
    aiReadCn: "由于位于关键企业流程中，是智能体工作流商业化的强候选者。",
    catalysts: ["Now Assist adoption", "Armis acquisition", "Large-deal growth"],
    catalystsCn: ["Now Assist 采用", "Armis 收购", "大单增长"],
    risks: ["Enterprise budget scrutiny", "AI attach transparency", "Integration risk"],
    risksCn: ["企业预算审视", "AI 附加率透明度", "整合风险"],
    sourceIds: ["now-q1fy26"]
  },
  {
    id: "crwd",
    ticker: "CRWD",
    company: "CrowdStrike",
    companyCn: "CrowdStrike",
    market: "US",
    layer: "software",
    type: "Core",
    conviction: "High",
    valuationRisk: "High",
    score: 82,
    role: "Endpoint, cloud, identity and AI security platform.",
    roleCn: "终端、云、身份与 AI 安全平台。",
    lastReport: "2026-06-03",
    nextWindow: "Early Sep 2026, estimated",
    financials: "Q1 FY2027 revenue $1.39B, +26% YoY; management raised FY2027 revenue outlook.",
    financialsCn: "2027 财年 Q1 收入 13.9 亿美元，同比 +26%；管理层上调 2027 财年收入展望。",
    aiRead: "Cybersecurity becomes foundational AI infrastructure as agents increase identity, cloud and data risk.",
    aiReadCn: "随着智能体扩大身份、云与数据风险，网络安全成为 AI 基础设施的一部分。",
    catalysts: ["AI security modules", "Platform consolidation", "ARR acceleration"],
    catalystsCn: ["AI 安全模块", "平台整合", "ARR 加速"],
    risks: ["Post-outage trust", "High valuation", "Security competition"],
    risksCn: ["事故后信任修复", "高估值", "安全行业竞争"],
    sourceIds: ["crwd-q1fy27"]
  },
  {
    id: "ddog",
    ticker: "DDOG",
    company: "Datadog",
    companyCn: "Datadog",
    market: "US",
    layer: "software",
    type: "Watchlist",
    conviction: "Medium",
    valuationRisk: "Medium",
    score: 78,
    role: "Observability and security for AI-era cloud applications.",
    roleCn: "AI 时代云应用的可观测性与安全平台。",
    lastReport: "2026-05-07",
    nextWindow: "Early Aug 2026, estimated",
    financials: "Q1 2026 revenue growth 32% YoY; operating cash flow $335M and free cash flow $289M.",
    financialsCn: "2026 年 Q1 收入同比 +32%；经营现金流 3.35 亿美元，自由现金流 2.89 亿美元。",
    aiRead: "AI workloads increase complexity, telemetry volume and security needs, but spend optimization can pressure consumption.",
    aiReadCn: "AI 工作负载提升复杂度、遥测数据量和安全需求，但云成本优化可能压制消费。",
    catalysts: ["Bits AI agents", "Security cross-sell", "AI workload monitoring"],
    catalystsCn: ["Bits AI 智能体", "安全交叉销售", "AI 工作负载监控"],
    risks: ["Consumption model volatility", "Competition", "IT budget cycles"],
    risksCn: ["消费模式波动", "竞争", "IT 预算周期"],
    sourceIds: ["ddog-q1fy26"]
  },
  {
    id: "net",
    ticker: "NET",
    company: "Cloudflare",
    companyCn: "Cloudflare",
    market: "US",
    layer: "software",
    type: "Watchlist",
    conviction: "Medium",
    valuationRisk: "High",
    score: 77,
    role: "Global network, edge compute, developer platform and AI traffic control.",
    roleCn: "全球网络、边缘计算、开发者平台与 AI 流量控制。",
    lastReport: "2026-05-07",
    nextWindow: "Early Aug 2026, estimated",
    financials: "Q1 2026 external coverage cited revenue $639.8M, +34% YoY; company highlighted agentic web and internal AI productivity.",
    financialsCn: "外部报道显示 2026 年 Q1 收入 6.398 亿美元，同比 +34%；公司强调 agentic web 与内部 AI 效率。",
    aiRead: "Potential toll road for AI agents, inference at the edge and secure traffic, but margins and restructuring need monitoring.",
    aiReadCn: "可能成为 AI 智能体、边缘推理和安全流量的收费站，但需观察利润率与组织调整。",
    catalysts: ["Workers AI", "Enterprise deal reacceleration", "AI agent traffic"],
    catalystsCn: ["Workers AI", "企业大单再加速", "AI agent 流量"],
    risks: ["Guidance disappointment", "Restructuring disruption", "Platform margin mix"],
    risksCn: ["指引低于预期", "组织调整扰动", "平台利润率结构"],
    sourceIds: ["ddog-q1fy26"]
  },
  {
    id: "app",
    ticker: "APP",
    company: "AppLovin",
    companyCn: "AppLovin",
    market: "US",
    layer: "software",
    type: "Watchlist",
    conviction: "High",
    valuationRisk: "Very High",
    score: 81,
    role: "AI ad engine, mobile performance marketing and creative automation.",
    roleCn: "AI 广告引擎、移动效果营销与创意自动化。",
    lastReport: "2026-05-06",
    nextWindow: "Early Aug 2026, estimated",
    financials: "Q1 2026 revenue $1.84B, +59% YoY; adjusted EBITDA margin about 85% per company presentation.",
    financialsCn: "2026 年 Q1 收入 18.4 亿美元，同比 +59%；公司材料显示调整后 EBITDA 利润率约 85%。",
    aiRead: "One of the strongest visible AI monetization stories in advertising, but concentration and durability need stress testing.",
    aiReadCn: "广告领域最强的可见 AI 商业化故事之一，但需压力测试集中度和持续性。",
    catalysts: ["Axon platform opening", "AI creative tools", "Non-gaming verticals"],
    catalystsCn: ["Axon 平台开放", "AI 创意工具", "非游戏垂直行业"],
    risks: ["Ad cycle sensitivity", "Platform policy changes", "Extreme margin expectations"],
    risksCn: ["广告周期敏感", "平台政策变化", "极高利润率预期"],
    sourceIds: ["app-q1fy26"]
  },
  {
    id: "ttd",
    ticker: "TTD",
    company: "The Trade Desk",
    companyCn: "The Trade Desk",
    market: "US",
    layer: "software",
    type: "Watchlist",
    conviction: "Medium",
    valuationRisk: "High",
    score: 72,
    role: "Programmatic ad platform with AI optimization.",
    roleCn: "带 AI 优化能力的程序化广告平台。",
    lastReport: "2026-05-07",
    nextWindow: "Early Aug 2026, estimated",
    financials: "Q1 2026 prepared remarks guided Q2 revenue to at least $750M; external coverage cited Q1 revenue growth around 12% YoY.",
    financialsCn: "2026 年 Q1 准备稿指引 Q2 收入至少 7.5 亿美元；外部报道显示 Q1 收入增速约 12%。",
    aiRead: "Kokai and CTV remain relevant, but AI narrative is less clean than APP unless growth reaccelerates.",
    aiReadCn: "Kokai 与 CTV 仍有价值，但若增长不再加速，AI 叙事不如 APP 清晰。",
    catalysts: ["Kokai adoption", "CTV ad share", "Retail media data"],
    catalystsCn: ["Kokai 采用", "CTV 广告份额", "零售媒体数据"],
    risks: ["Growth deceleration", "Ad-tech competition", "Margin pressure"],
    risksCn: ["增长放缓", "广告技术竞争", "利润率压力"],
    sourceIds: ["app-q1fy26"]
  },
  {
    id: "etn",
    ticker: "ETN",
    company: "Eaton",
    companyCn: "伊顿",
    market: "US",
    layer: "energy-grid",
    type: "Core",
    conviction: "High",
    valuationRisk: "Medium",
    score: 85,
    role: "Electrical equipment, power distribution, cooling and data center power chain.",
    roleCn: "电气设备、配电、冷却与数据中心供电链条。",
    lastReport: "2026-04-30",
    nextWindow: "Early Aug 2026, estimated",
    financials: "Q1 2026 materials point to complete architectures for AI factories and strong Electrical Americas demand.",
    financialsCn: "2026 年 Q1 材料强调 AI 工厂完整电力架构与 Electrical Americas 强劲需求。",
    aiRead: "AI data centers are creating a multi-year electrical equipment cycle, with pricing power where capacity is constrained.",
    aiReadCn: "AI 数据中心带来多年电气设备周期，在产能受限环节具备定价权。",
    catalysts: ["Data center order growth", "Boyd Thermal integration", "Pricing actions"],
    catalystsCn: ["数据中心订单增长", "Boyd Thermal 整合", "提价动作"],
    risks: ["Industrial cycle", "Input costs", "Backlog conversion timing"],
    risksCn: ["工业周期", "投入成本", "积压订单转化节奏"],
    sourceIds: ["etn-q1fy26"]
  },
  {
    id: "gev",
    ticker: "GEV",
    company: "GE Vernova",
    companyCn: "GE Vernova",
    market: "US",
    layer: "energy-grid",
    type: "Core",
    conviction: "High",
    valuationRisk: "Medium",
    score: 83,
    role: "Power generation, grid equipment and electrification.",
    roleCn: "发电设备、电网设备与电气化。",
    lastReport: "2026-04-22",
    nextWindow: "Late Jul 2026, estimated",
    financials: "Q1 2026 results raised 2026 guidance; orders and backlog supported by long-cycle power and electrification demand.",
    financialsCn: "2026 年 Q1 上调全年指引；订单与积压订单受长期电力和电气化需求支持。",
    aiRead: "Power scarcity turns GEV into an AI infrastructure second-order beneficiary through turbines, grid and transformers.",
    aiReadCn: "电力稀缺使 GEV 通过燃机、电网和变压器成为 AI 基础设施二阶受益者。",
    catalysts: ["Grid equipment orders", "Gas power demand", "Prolec GE integration"],
    catalystsCn: ["电网设备订单", "燃气发电需求", "Prolec GE 整合"],
    risks: ["Project execution", "Policy/regulation", "Supply chain bottlenecks"],
    risksCn: ["项目执行", "政策监管", "供应链瓶颈"],
    sourceIds: ["gev-q1fy26"]
  },
  {
    id: "pwr",
    ticker: "PWR",
    company: "Quanta Services",
    companyCn: "Quanta Services",
    market: "US",
    layer: "energy-grid",
    type: "Core",
    conviction: "Medium",
    valuationRisk: "Medium",
    score: 80,
    role: "Utility construction, transmission, grid modernization and data center power services.",
    roleCn: "公用事业施工、输电、电网现代化与数据中心供电服务。",
    lastReport: "2026-04-30",
    nextWindow: "Late Jul 2026, estimated",
    financials: "Q1 2026 release raised full-year guidance and highlighted data centers, grid modernization and advanced manufacturing as demand drivers.",
    financialsCn: "2026 年 Q1 上调全年指引，并强调数据中心、电网现代化和先进制造需求驱动。",
    aiRead: "Labor and execution capacity can become the scarce asset in electrification and data center grid connection.",
    aiReadCn: "在电气化和数据中心并网中，劳动力与执行能力可能成为稀缺资产。",
    catalysts: ["Transmission backlog", "Transformer manufacturing investment", "Data center interconnect projects"],
    catalystsCn: ["输电积压订单", "变压器制造投资", "数据中心并网项目"],
    risks: ["Labor availability", "Weather/project delays", "Working capital"],
    risksCn: ["劳动力可得性", "天气和项目延期", "营运资金"],
    sourceIds: ["pwr-q1fy26"]
  },
  {
    id: "soun",
    ticker: "SOUN",
    company: "SoundHound AI",
    companyCn: "SoundHound AI",
    market: "US",
    layer: "edge",
    type: "Speculative",
    conviction: "Medium",
    valuationRisk: "Very High",
    score: 65,
    role: "Voice AI, restaurant/auto agents and conversational commerce.",
    roleCn: "语音 AI、餐饮/汽车智能体与对话式商业。",
    lastReport: "2026-05-07",
    nextWindow: "Early Aug 2026, estimated",
    financials: "Q1 2026 revenue $44.2M, +52% YoY; FY2026 revenue outlook reaffirmed at $225M to $260M.",
    financialsCn: "2026 年 Q1 收入 4420 万美元，同比 +52%；重申 2026 年收入指引 2.25 亿至 2.60 亿美元。",
    aiRead: "Real revenue growth in vertical voice AI, but losses, acquisitions and competition keep it speculative.",
    aiReadCn: "垂直语音 AI 已有真实收入增长，但亏损、并购和竞争使其仍属投机型。",
    catalysts: ["OASYS agent platform", "Restaurant automation", "Automotive wins"],
    catalystsCn: ["OASYS 智能体平台", "餐饮自动化", "汽车客户订单"],
    risks: ["Cash burn", "Integration risk", "Large-platform competition"],
    risksCn: ["现金消耗", "整合风险", "大型平台竞争"],
    sourceIds: ["soun-q1fy26"]
  },
  {
    id: "bbai",
    ticker: "BBAI",
    company: "BigBear.ai",
    companyCn: "BigBear.ai",
    market: "US",
    layer: "edge",
    type: "Speculative",
    conviction: "Low",
    valuationRisk: "Very High",
    score: 58,
    role: "Mission-ready AI for defense, national security, travel and trade.",
    roleCn: "面向国防、国家安全、旅行与贸易的任务型 AI。",
    lastReport: "2026-05-05",
    nextWindow: "Early Aug 2026, estimated",
    financials: "Q1 2026 revenue $34.4M, down 1% YoY; backlog improved with more than $60M in national-security contracts.",
    financialsCn: "2026 年 Q1 收入 3440 万美元，同比 -1%；积压订单改善，包括超过 6000 万美元国家安全合同。",
    aiRead: "Defense AI optionality is attractive, but growth must reaccelerate and contract conversion must improve.",
    aiReadCn: "国防 AI 期权价值有吸引力，但需要收入重新加速和合同转化改善。",
    catalysts: ["National security backlog", "Ask Sage integration", "Travel and trade deployments"],
    catalystsCn: ["国家安全积压订单", "Ask Sage 整合", "旅行与贸易部署"],
    risks: ["Government budget timing", "Small revenue base", "Execution risk"],
    risksCn: ["政府预算节奏", "收入基数小", "执行风险"],
    sourceIds: ["bbai-q1fy26"]
  },
  {
    id: "ionq",
    ticker: "IONQ",
    company: "IonQ",
    companyCn: "IonQ",
    market: "US",
    layer: "edge",
    type: "Speculative",
    conviction: "Medium",
    valuationRisk: "Very High",
    score: 66,
    role: "Trapped-ion quantum computing hardware and cloud access.",
    roleCn: "离子阱量子计算硬件与云访问。",
    lastReport: "2026-05-06",
    nextWindow: "Early Aug 2026, estimated",
    financials: "Q1 2026 external transcript coverage cited revenue $64.7M, +755% YoY, with high R&D investment.",
    financialsCn: "外部电话会记录显示 2026 年 Q1 收入 6470 万美元，同比 +755%，同时研发投入较高。",
    aiRead: "Quantum is not near-term AI infrastructure, but may become a frontier compute option; valuation is narrative-sensitive.",
    aiReadCn: "量子计算并非短期 AI 基础设施，但可能成为前沿计算期权；估值对叙事高度敏感。",
    catalysts: ["Hardware roadmap", "Government contracts", "SkyWater acquisition"],
    catalystsCn: ["硬件路线图", "政府合同", "SkyWater 收购"],
    risks: ["Commercial timing", "R&D burn", "Technology uncertainty"],
    risksCn: ["商业化时间", "研发消耗", "技术不确定性"],
    sourceIds: ["ionq-q1fy26"]
  },
  {
    id: "rgti",
    ticker: "RGTI",
    company: "Rigetti Computing",
    companyCn: "Rigetti Computing",
    market: "US",
    layer: "edge",
    type: "Speculative",
    conviction: "Low",
    valuationRisk: "Very High",
    score: 54,
    role: "Superconducting quantum processors and cloud quantum systems.",
    roleCn: "超导量子处理器与云量子系统。",
    lastReport: "2026-05-11",
    nextWindow: "Mid-Aug 2026, estimated",
    financials: "Q1 2026 revenue $4.4M versus $1.47M in Q1 2025; 108-qubit system milestone highlighted in coverage.",
    financialsCn: "2026 年 Q1 收入 440 万美元，去年同期 147 万美元；外部报道强调 108 量子比特系统里程碑。",
    aiRead: "Very early frontier-compute exposure; position sizing should reflect binary technical and financing risk.",
    aiReadCn: "极早期前沿计算暴露；仓位应反映二元技术和融资风险。",
    catalysts: ["108-qubit availability", "Government funding", "Roadmap milestones"],
    catalystsCn: ["108 量子比特可用", "政府资金", "路线图里程碑"],
    risks: ["Tiny revenue base", "Dilution", "Technical uncertainty"],
    risksCn: ["收入基数极小", "稀释", "技术不确定性"],
    sourceIds: ["rgti-q1fy26"]
  },
  {
    id: "path",
    ticker: "PATH",
    company: "UiPath",
    companyCn: "UiPath",
    market: "US",
    layer: "software",
    type: "Watchlist",
    conviction: "Medium",
    valuationRisk: "Medium",
    score: 71,
    role: "Enterprise automation, orchestration and AI agents.",
    roleCn: "企业自动化、编排与 AI 智能体。",
    lastReport: "2026-05-28",
    nextWindow: "Late Aug 2026, estimated",
    financials: "Q1 FY2027 results reported May 28; FY2027 revenue guidance range $1.776B to $1.781B.",
    financialsCn: "2027 财年 Q1 于 5 月 28 日披露；2027 财年收入指引 17.76 亿至 17.81 亿美元。",
    aiRead: "Agentic automation can revive RPA relevance if UiPath proves governance and workflow depth.",
    aiReadCn: "若 UiPath 能证明治理能力和工作流深度，智能体自动化可能重塑 RPA 价值。",
    catalysts: ["Agent orchestration", "WorkFusion compliance agents", "ARR stability"],
    catalystsCn: ["智能体编排", "WorkFusion 合规智能体", "ARR 稳定"],
    risks: ["RPA commoditization", "Sales execution", "AI platform competition"],
    risksCn: ["RPA 商品化", "销售执行", "AI 平台竞争"],
    sourceIds: ["path-q1fy27"]
  },
  {
    id: "tsla",
    ticker: "TSLA",
    company: "Tesla",
    companyCn: "特斯拉",
    market: "US",
    layer: "edge",
    type: "Speculative",
    conviction: "Medium",
    valuationRisk: "Very High",
    score: 72,
    role: "EV platform, autonomy, robotaxi, Optimus and AI inference at the edge.",
    roleCn: "电动车平台、自动驾驶、Robotaxi、Optimus 与边缘 AI 推理。",
    lastReport: "2026-04-22",
    nextWindow: "Late Jul 2026, estimated",
    financials: "Q1 2026 results posted April 22; external coverage cited revenue around $22.4B and rising AI/autonomy capex.",
    financialsCn: "2026 年 Q1 于 4 月 22 日发布；外部报道显示收入约 224 亿美元，AI/自动驾驶资本开支上升。",
    aiRead: "Stock increasingly prices autonomy and robotics optionality, while near-term earnings still depend on EV economics.",
    aiReadCn: "股价越来越反映自动驾驶和机器人期权，但短期盈利仍依赖电动车经济性。",
    catalysts: ["Robotaxi milestones", "Optimus production", "FSD take-rate"],
    catalystsCn: ["Robotaxi 里程碑", "Optimus 量产", "FSD 采用率"],
    risks: ["Execution credibility", "EV competition", "Regulatory and safety scrutiny"],
    risksCn: ["执行可信度", "电动车竞争", "监管与安全审查"],
    sourceIds: ["tsla-q1fy26"]
  },
  {
    id: "isrg",
    ticker: "ISRG",
    company: "Intuitive Surgical",
    companyCn: "直觉外科",
    market: "US",
    layer: "edge",
    type: "Core",
    conviction: "High",
    valuationRisk: "Medium",
    score: 82,
    role: "Robotic surgery systems, instruments, data and procedure ecosystem.",
    roleCn: "手术机器人系统、耗材、数据与手术生态。",
    lastReport: "2026-04-21",
    nextWindow: "Mid-Jul 2026, estimated",
    financials: "Q1 2026 GAAP net income $822M, or $2.28 diluted EPS; external coverage cited revenue $2.77B, +23% YoY.",
    financialsCn: "2026 年 Q1 GAAP 净利润 8.22 亿美元，摊薄 EPS 2.28 美元；外部报道显示收入 27.7 亿美元，同比 +23%。",
    aiRead: "A mature physical-AI compounder with data, workflow and installed-base economics rather than a pure generative AI story.",
    aiReadCn: "成熟的物理 AI 复合增长公司，核心在数据、工作流和装机量经济性，而非纯生成式 AI。",
    catalysts: ["da Vinci 5 adoption", "Procedure growth", "Ion system expansion"],
    catalystsCn: ["da Vinci 5 采用", "手术量增长", "Ion 系统扩张"],
    risks: ["Hospital capex", "Competition", "Procedure reimbursement"],
    risksCn: ["医院资本开支", "竞争", "手术报销"],
    sourceIds: ["isrg-q1fy26"]
  },
  {
    id: "mbly",
    ticker: "MBLY",
    company: "Mobileye",
    companyCn: "Mobileye",
    market: "US",
    layer: "edge",
    type: "Watchlist",
    conviction: "Medium",
    valuationRisk: "High",
    score: 70,
    role: "ADAS, autonomous driving software and vision chips.",
    roleCn: "ADAS、自动驾驶软件与视觉芯片。",
    lastReport: "2026-04-23",
    nextWindow: "Late Jul 2026, estimated",
    financials: "Q1 2026 revenue $558M, +27% YoY; full-year outlook midpoint about $1.975B.",
    financialsCn: "2026 年 Q1 收入 5.58 亿美元，同比 +27%；全年收入展望中值约 19.75 亿美元。",
    aiRead: "Physical AI exposure through ADAS and autonomy, with optionality from the Mentee Robotics acquisition.",
    aiReadCn: "通过 ADAS 和自动驾驶暴露于物理 AI，并受益于 Mentee Robotics 收购带来的期权。",
    catalysts: ["ADAS design wins", "India growth", "Physical AI strategy"],
    catalystsCn: ["ADAS 定点", "印度增长", "物理 AI 战略"],
    risks: ["Auto cycle", "OEM pricing", "Autonomy timeline"],
    risksCn: ["汽车周期", "车厂定价", "自动驾驶时间线"],
    sourceIds: ["mbly-q1fy26"]
  }
];

const portfolioPlaybooks = [
  {
    title: "Core AI Infrastructure Basket",
    titleCn: "核心 AI 基础设施组合",
    tickers: ["NVDA", "AVGO", "TSM", "ASML", "MSFT", "AMZN", "GOOGL", "VRT", "ANET", "MU"],
    logic: "Own the bottlenecks: compute, custom silicon, foundry, lithography, cloud demand, power/cooling and networking.",
    logicCn: "持有瓶颈环节：算力、定制芯片、代工、光刻、云需求、电力/冷却和网络。"
  },
  {
    title: "Second-Derivative Data Center Basket",
    titleCn: "数据中心二阶受益组合",
    tickers: ["VRT", "ETN", "GEV", "PWR", "DELL", "SMCI", "HPE", "ANET", "MRVL"],
    logic: "Focus on order backlog, lead times, pricing power and physical buildout constraints.",
    logicCn: "关注积压订单、交付周期、定价权和物理建设约束。"
  },
  {
    title: "Enterprise AI Monetization Basket",
    titleCn: "企业 AI 商业化组合",
    tickers: ["MSFT", "NOW", "SNOW", "CRM", "PLTR", "CRWD", "DDOG", "NET", "PATH"],
    logic: "Prefer platforms that can prove AI attach, retention and workflow productivity in dollars.",
    logicCn: "优先选择能用收入证明 AI 附加率、留存和工作流生产率的平台。"
  },
  {
    title: "High-Optionality Speculative Basket",
    titleCn: "高期权投机组合",
    tickers: ["SOUN", "BBAI", "IONQ", "RGTI", "TSLA", "MBLY"],
    logic: "Use small sizing and strict catalysts; these names are more sensitive to funding, narrative and execution.",
    logicCn: "适合小仓位与严格催化剂管理；这些公司对融资、叙事和执行更敏感。"
  }
];

const analystFramework = [
  {
    label: "Demand signal",
    labelCn: "需求信号",
    detail: "Cloud capex, AI orders, backlog, HBM allocation, power connection queues and AI ARR.",
    detailCn: "云资本开支、AI 订单、积压订单、HBM 分配、电力接入排队和 AI ARR。"
  },
  {
    label: "Monetization quality",
    labelCn: "商业化质量",
    detail: "Prioritize revenue acceleration, gross margin resilience, free cash flow and disclosed usage metrics.",
    detailCn: "优先看收入加速、毛利率韧性、自由现金流和披露的使用量指标。"
  },
  {
    label: "Supply constraints",
    labelCn: "供给约束",
    detail: "HBM, CoWoS, advanced substrates, transformers, switchgear, turbines, liquid cooling and skilled labor.",
    detailCn: "HBM、CoWoS、先进基板、变压器、开关设备、燃机、液冷和熟练劳动力。"
  },
  {
    label: "Risk controls",
    labelCn: "风险控制",
    detail: "Separate secular winners from over-owned momentum; stress-test capex ROI, concentration and valuation.",
    detailCn: "区分长期赢家与拥挤动量交易；压力测试资本回报、集中度和估值。"
  }
];
