import { SITE_CONFIG } from './siteConfig';

export const APP_CONFIG = {
  NAME: `药食同源百问百答 • ${SITE_CONFIG.herbNameZh}篇`,
  NAME_EN: `Medicinal & Edible Homology Series • ${SITE_CONFIG.herbNameEn} Chapter`,
  SERIES_NAME: '药食同源百问百答系列',
  SERIES_NAME_EN: 'Medicinal & Edible Homology Series',
  COPYRIGHT: '© 2026 Medicinal & Edible Homology Series',
  DUCKDB_VERSION: '1.28.0',
  DUCKDB_CDN_BASE: 'https://cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@1.28.0/dist',
  DUCKDB_QUERY_LIMIT: 100,
  ITEMS_PER_PAGE: 20,
  STORAGE_PROVIDER: 'sqljs', // 'supabase' | 'sqljs'
  CNKI_BASE_URL: 'https://kns.cnki.net/kns8s/defaultresult/index?crossids=YSTT4HG0%2CLSTPFY1C%2CJUP3MUPD%2CMPMFIG1A%2CWQ0UVIAA%2CBLZOG7CK%2CPWFIRAGL%2CEMRPGLPA%2CNLBO1Z6R%2CNN3FJMUV&korder=SU&kw=',
  DUCKDB_COLUMNS: {
    TITLE: '中文题名',
    AUTHOR: '作者',
    INSTITUTION: '学位授予单位',
    YEAR: '学位授予年度',
    DATABASE: '数据库',
    ABSTRACT: '摘要'
  }
};

export const THEME = {
  COLORS: {
    BRUTAL_BLACK: 'var(--color-brutal-black)',
    GALLERY_WHITE: 'var(--color-gallery-white)',
    NEON_ORANGE: 'var(--color-neon-orange)',
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

export const HERBS_LIST_EN = [
  "Hawthorn", "Smoked Plum", "Licorice", "Mulberry Leaf", "Mulberry Fruit", "Huangjing", "Honey", "Dendrobium", "Cistanche", "Exocarpium",
  "Codonopsis", "Astragalus", "Cornus", "Asparagus", "Clove", "Star Anise", "Sword Bean", "Fennel", "Thistle", "Yam",
  "Purslane", "Snake", "Papaya", "Hemp Seed", "Citrus", "Solomonseal", "Angelica", "Ginkgo", "White Bean", "White Bean Flower",
  "Longan", "Cassia Seed", "Lily", "Nutmeg", "Cinnamon", "Phyllanthus", "Bergamot", "Almond", "Sea Buckthorn", "Oyster",
  "Gorgon Fruit", "Sichuan Pepper", "Adzuki Bean", "Donkey-hide Gelatin", "Chicken Gizzard", "Malt", "Kelp", "Jujube", "Monk Fruit", "Prunus",
  "Honeysuckle", "Olive", "Houttuynia", "Ginger", "Hovenia", "Goji Berry", "Gardenia", "Amomum", "Sterculia", "Poria",
  "Citron", "Elsholtzia", "Peach Kernel", "Exocarpium", "Platycodon", "Alpinia Oxyphylla", "Lotus Leaf", "Radish Seed", "Lotus Seed", "Galangal",
  "Bamboo Leaf", "Douchi", "Chrysanthemum", "Chicory", "Mustard Seed", "Perilla", "Perilla Seed", "Kudzu", "Black Sesame", "Black Pepper",
  "Pagoda Bud", "Pagoda Flower", "Dandelion", "Torreya", "Sour Jujube", "Imperata", "Phragmites", "Viper", "Orange Peel", "Mint",
  "Coix Seed", "Allium", "Raspberry", "Agastache", "Angelica Sinensis", "Kaempferia", "Saffron", "Tsaoko", "Turmeric", "Long Pepper",
  "American Ginseng", "Ganoderma", "Gastrodia", "Eucommia Leaf", "Rehmannia", "Ophiopogon", "Ginseng", "Lonicera", "Coriander", "Rose"
];
