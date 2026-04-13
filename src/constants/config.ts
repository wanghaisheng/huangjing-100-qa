export const APP_CONFIG = {
  NAME: '药食同源百问百答 • 黄精篇',
  NAME_EN: 'Medicinal & Edible Homology Series • Huangjing Chapter',
  SERIES_NAME: '药食同源百问百答系列',
  COPYRIGHT: '© 2026 Medicinal & Edible Homology Series',
  DUCKDB_VERSION: '1.28.0',
  DUCKDB_CDN_BASE: 'https://cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@1.28.0/dist',
  DUCKDB_QUERY_LIMIT: 100,
  ITEMS_PER_PAGE: 20,
  STORAGE_PROVIDER: 'supabase', // 'supabase' | 'sqljs'
  CNKI_BASE_URL: 'https://kns.cnki.net/kns8s/defaultresult/index?crossids=YSTT4HG0%2CLSTPFY1C%2CJUP3MUPD%2CMPMFIG1A%2CWQ0UVIAA%2CBLZOG7CK%2CPWFIRAGL%2CEMRPGLPA%2CNLBO1Z6R%2CNN3FJMUV&korder=SU&kw=',
  DUCKDB_COLUMNS: {
    TITLE: '中文题名',
    AUTHOR: '作者',
    INSTITUTION: '学位授予单位',
    YEAR: '学位授予年度',
    DATABASE: '数据库'
  }
};

export const THEME = {
  COLORS: {
    BRUTAL_BLACK: 'var(--color-brutal-black)',
    GALLERY_WHITE: 'var(--color-gallery-white)',
    NEON_ORANGE: 'var(--color-neon-orange)',
  }
};

export const STRINGS = {
  HERO: {
    TAG: '药食同源百问百答系列 • 黄精篇',
    TITLE_1: '传统智慧',
    TITLE_2: '现代科学',
    DESC: '盲目养生不仅无效，甚至可能带来风险。我们致力于让每一份黄精养生建议，都有严谨的科学数据作为支撑。',
    CTA_PAPERS: '探索文献库 →',
    CTA_FAQ: '科学知识库 →',
  },
  METHODOLOGY: {
    SECTION_ID: '01 // 我们的方法',
    CARDS: [
      { title: '文献挖掘', desc: '深入数千篇学术研究，提炼核心结论。' },
      { title: '数据驱动', desc: '炮制工艺与药理机制可视化。' },
      { title: '安全把控', desc: '重金属与农残科学评估。' },
    ]
  },
  FAQ_OVERVIEW: {
    SECTION_ID: '02 // 百问百答概览',
  },
  CONCERNS: {
    SECTION_ID: '03 // 核心关切与科学解答',
    SUBTITLE: '针对用户最关心的 4 大核心维度，基于文献数据给出硬核答复',
    CARDS: [
      { 
        tag: '安全 • SAFETY', 
        title: '重金属与农残超标？', 
        desc: '实测数据显示，多数地理标志产地（如铜鼓、湘西）农残远低于绿色标准，但部分野生品种需警惕土壤镉超标。',
        stat: '农残 < 0.1mg/kg'
      },
      { 
        tag: '功效 • EFFICACY', 
        title: '肠道修复真的有效？', 
        desc: '九蒸九晒黄精能显著上调紧密连接蛋白 ZO-1，修复肠道屏障，增加双歧杆菌丰度达 5 倍以上。',
        stat: '益生菌 +528%'
      },
      { 
        tag: '品质 • QUALITY', 
        title: '为什么一定要九蒸九晒？', 
        desc: '反复蒸晒使刺激性成分 5-HMF 降至最低，同时还原糖提升 10 倍，实现“甜如饴”的药理转化。',
        stat: '还原糖 +1000%'
      },
      { 
        tag: '禁忌 • CONTRA', 
        title: '所有人都能吃吗？', 
        desc: '黄精性滋腻，湿阻中焦、腹胀便溏者慎用。建议每日摄入量折合干品约 9-15g。',
        stat: '建议量 9-15g'
      }
    ]
  },
  COMMUNITY: {
    SECTION_ID: '04 // 社群与数字资源',
    TITLE: '药食同源百问百答',
    SUBTITLE: '本平台内容仅为冰山一角，加入社群获取完整 110+ 章节实时更新版',
    SINGLE_PRICE: '¥29 / 款',
    SINGLE_DESC: '单款产品买断版',
    SINGLE_SUB: '永久拥有单款产品数据 • 实时同步',
    BUNDLES: [
      { count: '10份', price: '¥99', saving: '立省 ¥191', type: '永久买断' },
      { count: '50份', price: '¥399', saving: '立省 ¥1051', type: '永久买断' },
      { count: '100份', price: '¥599', saving: '立省 ¥2301', type: '永久买断' }
    ],
    MEMBERSHIP: {
      PRICE: '¥399',
      UNIT: '/年',
      TAG: '早鸟特惠 • 限前100名',
      BENEFIT: '全集解锁 + 实时更新 + 社群服务',
      RULE: '每增加 100 人，年费上涨 100 元',
      PROGRESS: 68, // Current members in the current tier
      CURRENT_STATUS: '距离下次涨价仅剩 32 席'
    }
  },
  SHAKE: {
    SECTION_ID: '05 // 随机灵感瓶',
    TITLE: '随机灵感瓶',
    DESC: '摇动左侧的灵感瓶\n随机获取一篇深度研究文献',
    CTA: '摇出一篇文献',
    CLICK_PROMPT: 'Click to Shake',
    LOADING: 'Mixing data...',
    LUCKY_PICK: 'Lucky Pick',
    READ_MORE: '查看详情'
  },
  APP: {
    SEARCH_PLACEHOLDER: '搜索文献或问题...',
    DUCKDB_ACTIVE: 'DuckDB WASM Active',
    FILTER_TITLE: '研究领域分类',
    ALL_PAPERS: '全部文献',
    ITEMS_SUFFIX: 'ITEMS',
    READ_MORE: 'READ MORE',
    NO_RESULTS: 'NO RESULTS FOUND',
    TRY_DIFFERENT: 'TRY DIFFERENT KEYWORDS OR CATEGORIES',
    FAQ_TITLE: '黄精知识常见问题解答',
    FAQ_SUBTITLE: 'BASED ON LATEST SCIENTIFIC RESEARCH',
    ALL_QUESTIONS: '全部问题',
    FULL_DB_TITLE: '全量文献大库',
    FULL_DB_SUBTITLE: '1100+ SCIENTIFIC PAPERS & THESES',
    QUERYING: 'Querying DuckDB...',
    TABLE_HEADERS: {
      YEAR: '年度',
      TITLE: '中文题名',
      AUTHOR: '作者',
      INSTITUTION: '单位',
      DATABASE: '库'
    },
    NO_DB_RESULTS: 'No results found in DuckDB',
    POWERED_BY: 'Powered by DuckDB-Wasm',
    PREV_PAGE: '上一页',
    NEXT_PAGE: '下一页',
    PAGE_INFO: '第 {current} 页 / 共 {total} 页',
    TOTAL_RECORDS: '共 {total} 条记录'
  },
  HEADER: {
    TABS: {
      PAPERS: '代表文献',
      FAQ: '常见问题',
      FULL_DB: '全量大库'
    }
  },
  FOOTER: {
    DESC: '本平台旨在为研究人员及爱好者提供便捷的文献索引服务。所有数据均来源于公开学术资源。',
    SERIES_TITLE: '全系列 110+ 章节',
    SERIES_COLLECTION: 'SERIES COLLECTION',
    CHAPTERS: 'CHAPTERS',
    DB_INDEX_FULL: 'DATABASE INDEX // FULL ACCESS',
    LINKS: [
      { label: 'About Project', href: '#' },
      { label: 'Data Source', href: '#' },
      { label: 'Contact', href: '#' },
    ]
  }
};

export const HERBS_LIST = [
  "山楂", "乌梅", "甘草", "桑叶", "桑椹", "黄精", "蜂蜜", "铁皮石斛", "肉苁蓉（荒漠）", "化橘红",
  "党参", "黄芪", "山茱萸", "天冬", "丁香", "八角茴香", "刀豆", "小茴香", "小蓟", "山药",
  "马齿苋", "乌梢蛇", "木瓜", "火麻仁", "代代花", "玉竹", "白芷", "白果", "白扁豆", "白扁豆花",
  "龙眼肉（桂圆）", "决明子", "百合", "肉豆蔻", "肉桂", "余甘子", "佛手", "杏仁（甜、苦）", "沙棘", "牡蛎",
  "芡实", "花椒", "赤小豆", "阿胶", "鸡内金", "麦芽", "昆布", "枣（大枣、酸枣、黑枣）", "罗汉果", "郁李仁",
  "金银花", "青果", "鱼腥草", "姜（生姜、干姜）", "枳椇子", "枸杞子", "栀子", "砂仁", "胖大海", "茯苓",
  "香橼", "香薷", "桃仁", "桔红", "桔梗", "益智仁", "荷叶", "莱菔子", "莲子", "高良姜",
  "淡竹叶", "淡豆豉", "菊花", "菊苣", "黄芥子", "紫苏", "紫苏籽", "葛根", "黑芝麻", "黑胡椒",
  "槐米", "槐花", "蒲公英", "榧子", "酸枣仁", "鲜白茅根", "鲜芦根", "蝮蛇", "橘皮", "薄荷",
  "薏苡仁", "薤白", "覆盆子", "藿香", "当归", "山柰", "西红花（藏红花）", "草果", "姜黄", "荜茇",
  "西洋参", "灵芝", "天麻", "杜仲叶", "地黄", "麦冬", "人参", "山银花", "芫荽", "玫瑰花"
];
