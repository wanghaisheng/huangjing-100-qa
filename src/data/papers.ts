export type I18nString = string | { zh: string; en: string };

export interface Paper {
  id: number;
  title: I18nString;
  source: I18nString;
  year: number;
  category: I18nString;
  significance: I18nString;
}

export const CATEGORIES = [
  { zh: "化学成分与质量标准", en: "Chemical Composition & Quality Standards" },
  { zh: "炮制工艺与“九蒸九制”", en: "Processing Technology & 'Nine Steaming and Nine Sun-drying'" },
  { zh: "生殖健康研究", en: "Reproductive Health Research" },
  { zh: "代谢性疾病", en: "Metabolic Diseases" },
  { zh: "神经系统与抗衰老", en: "Nervous System & Anti-aging" },
  { zh: "肠道健康与免疫调节", en: "Gut Health & Immune Regulation" },
  { zh: "肝、肾、骨骼及其他", en: "Liver, Kidney, Bone & Others" },
  { zh: "抗肿瘤研究", en: "Anti-tumor Research" },
  { zh: "产品开发与产业", en: "Product Development & Industry" },
  { zh: "现代技术与安全性", en: "Modern Technology & Safety" }
];

export const PAPERS: Paper[] = [
  // 一、 化学成分与质量标准
  {
    id: 1,
    title: { zh: "黄精中性糖分离纯化及结构分析", en: "Isolation, Purification and Structural Analysis of Neutral Polysaccharides from Polygonatum" },
    source: { zh: "长春工业大学", en: "Changchun University of Technology" },
    year: 2025,
    category: { zh: "化学成分与质量标准", en: "Chemical Composition & Quality Standards" },
    significance: { zh: "揭示核心成分结构。", en: "Revealing the structure of core components." }
  },
  {
    id: 2,
    title: "黄精属药用植物亲缘关系及多糖的研究",
    source: "博士, 天津大学",
    year: 2021,
    category: "化学成分与质量标准",
    significance: "宏观解析品种差异。"
  },
  {
    id: 3,
    title: "大叶黄精化学成分、生物活性及质量评价研究",
    source: "重庆三峡学院",
    year: 2025,
    category: "化学成分与质量标准",
    significance: "针对特定基原的研究。"
  },
  {
    id: 4,
    title: "黄精属植物化学成分的比较研究",
    source: "北京协和医学院",
    year: 2022,
    category: "化学成分与质量标准",
    significance: "权威机构的系统对比。"
  },
  {
    id: 5,
    title: "液相色谱和质谱法在中药黄精化学成分分析中的应用研究",
    source: "湖南师范大学",
    year: 2022,
    category: "化学成分与质量标准",
    significance: "现代检测方法应用。"
  },
  {
    id: 6,
    title: "黄精与多花黄精的DNA条形码研究",
    source: "湖南中医药大学",
    year: 2013,
    category: "化学成分与质量标准",
    significance: "分子生物学鉴定代表。"
  },

  // 二、 炮制工艺与“九蒸九制”
  {
    id: 7,
    title: "多花黄精炮制化学及炮制增效机理研究",
    source: "博士, 中国中医科学院",
    year: 2023,
    category: "炮制工艺与“九蒸九制”",
    significance: "深入探讨炮制科学内涵。"
  },
  {
    id: 8,
    title: "九蒸九制黄精质量标志物的发现及评价方法的研究",
    source: "黑龙江省中医药科学院",
    year: 2025,
    category: "炮制工艺与“九蒸九制”",
    significance: "确定炮制后的Q-Marker。"
  },
  {
    id: 9,
    title: "不同炮制次数对多花黄精主要成分的生物可及性与生物活性的影响",
    source: "南昌大学",
    year: 2025,
    category: "炮制工艺与“九蒸九制”",
    significance: "量化炮制次数的意义。"
  },
  {
    id: 10,
    title: "黄精在九蒸九晒炮制中多糖含量与构成的变化研究",
    source: "重庆大学",
    year: 2024,
    category: "炮制工艺与“九蒸九制”",
    significance: "聚焦核心成分随工艺的变化。"
  },
  {
    id: 11,
    title: "“九蒸九晒”黄精质量控制及产业化生产工艺研究",
    source: "安徽中医药大学",
    year: 2020,
    category: "炮制工艺与“九蒸九制”",
    significance: "链接实验室与工业生产。"
  },
  {
    id: 12,
    title: "黄精产地趁鲜加工与炮制一体化关键技术研究",
    source: "西北农林科技大学",
    year: 2022,
    category: "炮制工艺与“九蒸九制”",
    significance: "探讨产业加工新模式。"
  },

  // 三、 生殖健康研究
  {
    id: 13,
    title: "基于线粒体自噬研究黄精赞育胶囊治疗少弱精子症的作用机制",
    source: "北京中医药大学",
    year: 2025,
    category: "生殖健康研究",
    significance: "最新机制研究。"
  },
  {
    id: 14,
    title: "基于自噬-凋亡交互作用探讨黄精赞育胶囊治疗少、弱精子症的分子机制",
    source: "博士, 北京中医药大学",
    year: 2022,
    category: "生殖健康研究",
    significance: "深度理论解析。"
  },
  {
    id: 15,
    title: "黄精对少弱精子症雄性大鼠生殖损伤的保护作用及铁死亡机制研究",
    source: "湖南中医药大学",
    year: 2025,
    category: "生殖健康研究",
    significance: "引入“铁死亡”前沿概念。"
  },
  {
    id: 16,
    title: "黄精赞育胶囊化学成分及改善少弱精子症的作用机制研究",
    source: "博士, 北京中医药大学",
    year: 2014,
    category: "生殖健康研究",
    significance: "该领域的里程碑研究。"
  },
  {
    id: 17,
    title: "海龙黄精散治疗少弱精子症及其调控生精细胞凋亡的研究",
    source: "博士, 北京中医药大学",
    year: 2022,
    category: "生殖健康研究",
    significance: "经典复方研究。"
  },

  // 四、 代谢性疾病
  {
    id: 18,
    title: "黄精炮制前后有效成分变化及其降糖活性研究",
    source: "昆明理工大学",
    year: 2025,
    category: "代谢性疾病",
    significance: "炮制与药效的关联分析。"
  },
  {
    id: 19,
    title: "九华黄精均一多糖的结构表征及改善糖尿病的作用机制研究",
    source: "安徽中医药大学",
    year: 2025,
    category: "代谢性疾病",
    significance: "针对特定道地产区的研究。"
  },
  {
    id: 20,
    title: "多花黄精多糖通过调节肠道菌群减轻营养性肥胖的作用机制",
    source: "安徽中医药大学",
    year: 2023,
    category: "代谢性疾病",
    significance: "肠道菌群视角的代谢研究。"
  },
  {
    id: 21,
    title: "基于AMPK/mTOR信号通路探讨黄精促进脂肪组织自噬改善肥胖的机制研究",
    source: "天津中医药大学",
    year: 2025,
    category: "代谢性疾病",
    significance: "细胞信号通路研究。"
  },
  {
    id: 22,
    title: "基于“线粒体—脂质代谢网络”研究黄精丸干预代谢相关脂肪性肝病作用机制",
    source: "云南中医药大学",
    year: 2024,
    category: "代谢性疾病",
    significance: "脂肪肝治疗机制。"
  },

  // 五、 神经系统与抗衰老
  {
    id: 23,
    title: "黄精-当归药对调控AD小鼠海马神经细胞自噬的分子机制研究",
    source: "江西中医药大学",
    year: 2024,
    category: "神经系统与抗衰老",
    significance: "药对配伍研究。"
  },
  {
    id: 24,
    title: "基于肠道菌群和代谢组学的黄精多糖抗脑衰老作用及机制探讨",
    source: "湖南中医药大学",
    year: 2023,
    category: "神经系统与抗衰老",
    significance: "多组学结合研究。"
  },
  {
    id: 25,
    title: "黄精不同炮制品防治阿尔茨海默病的药效及机制研究",
    source: "江西中医药大学",
    year: 2022,
    category: "神经系统与抗衰老",
    significance: "炮制对神经保护的影响。"
  },
  {
    id: 26,
    title: "黄精丸治疗阿尔茨海默病小鼠痴呆的作用与机制研究",
    source: "江西中医药大学",
    year: 2021,
    category: "神经系统与抗衰老",
    significance: "经典中药丸剂研究。"
  },
  {
    id: 27,
    title: "黄精健脑方治疗肾虚血瘀型血管性轻度认知障碍的疗效观察...",
    source: "中国中医科学院",
    year: 2024,
    category: "神经系统与抗衰老",
    significance: "临床研究代表。"
  },

  // 六、 肠道健康与免疫调节
  {
    id: 28,
    title: "滇黄精多糖合生元干预炎症性肠病小鼠的作用和机制研究",
    source: "大连理工大学",
    year: 2025,
    category: "肠道健康与免疫调节",
    significance: "“合生元”现代营养学视角。"
  },
  {
    id: 29,
    title: "多花黄精多糖独立于肠道微生物缓解溃疡性结肠炎的作用研究",
    source: "安徽中医药大学",
    year: 2025,
    category: "肠道健康与免疫调节",
    significance: "探讨多糖的直接作用途径。"
  },
  {
    id: 30,
    title: "九蒸九制黄精多糖糖谱变化及对免疫抑制小鼠肠道菌群调节作用研究",
    source: "黑龙江省中医药科学院",
    year: 2025,
    category: "肠道健康与免疫调节",
    significance: "免疫与菌群的综合研究。"
  },
  {
    id: 31,
    title: "多花黄精多糖对巨噬细胞的免疫调节作用及机制初探",
    source: "南昌大学",
    year: 2024,
    category: "肠道健康与免疫调节",
    significance: "免疫细胞层面机制。"
  },

  // 七、 肝、肾、骨骼及其他
  {
    id: 32,
    title: "基于肠-肝轴探究多花黄精多糖对急性酒精肝损伤的保护机制",
    source: "南昌大学",
    year: 2025,
    category: "肝、肾、骨骼及其他",
    significance: "酒精性肝损伤研究。"
  },
  {
    id: 33,
    title: "黄精通过调控p53/Caspase信号通路改善肝纤维化的机制研究",
    source: "成都医学院",
    year: 2025,
    category: "肝、肾、骨骼及其他",
    significance: "肝纤维化研究代表。"
  },
  {
    id: 34,
    title: "肾脏衰老小鼠的代谢谱变化及黄精多糖的延缓衰老作用研究",
    source: "湖南中医药大学",
    year: 2023,
    category: "肝、肾、骨骼及其他",
    significance: "补肾抗衰机制。"
  },
  {
    id: 35,
    title: "黄精水提物对糖皮质激素诱导雌性大鼠骨质疏松的保护作用...",
    source: "安徽医科大学",
    year: 2024,
    category: "肝、肾、骨骼及其他",
    significance: "骨骼健康领域。"
  },
  {
    id: 36,
    title: "基于TLR2/NF-κB信号通路和自噬保护膝骨关节炎软骨的作用机制研究",
    source: "博士, 湖南中医药大学",
    year: 2024,
    category: "肝、肾、骨骼及其他",
    significance: "关节健康深度研究。"
  },

  // 八、 抗肿瘤研究
  {
    id: 37,
    title: "黄精多糖及其金纳米复合物的免疫调节抗肝癌作用研究",
    source: "博士, 重庆医科大学",
    year: 2025,
    category: "抗肿瘤研究",
    significance: "纳米技术结合抗癌。"
  },
  {
    id: 38,
    title: "黄精皂苷dioscin抗子宫内膜癌的分子机制及其纳米颗粒的靶向递送研究",
    source: "博士, 合肥工业大学",
    year: 2023,
    category: "抗肿瘤研究",
    significance: "皂苷类成分抗癌研究。"
  },
  {
    id: 39,
    title: "基于TLR4-MAPK/NF-κB信号通路探讨黄精多糖免疫调节抗肿瘤作用机制研究",
    source: "重庆医科大学",
    year: 2018,
    category: "抗肿瘤研究",
    significance: "免疫抗癌机制。"
  },

  // 九、 产品开发与产业
  {
    id: 40,
    title: "黄精桑椹方免疫增强活性及其颗粒剂制备工艺研究",
    source: "安徽中医药大学",
    year: 2025,
    category: "产品开发与产业",
    significance: "药食同源产品开发。"
  },
  {
    id: 41,
    title: "挤压蒸煮黄精粉的趁鲜制备、品质评价与添加应用研究",
    source: "湖南中医药大学",
    year: 2024,
    category: "产品开发与产业",
    significance: "食品工业技术应用。"
  },
  {
    id: 42,
    title: "基于专利视角的中药黄精产业技术发展现状研究",
    source: "成都中医药大学",
    year: 2023,
    category: "产品开发与产业",
    significance: "产业宏观分析。"
  },
  {
    id: 43,
    title: "黄精的营养成分研究与产品试制",
    source: "西北农林科技大学",
    year: 2022,
    category: "产品开发与产业",
    significance: "营养评价代表。"
  },
  {
    id: 44,
    title: "黄精复方口服液的开发及其降血糖功能研究",
    source: "南昌大学",
    year: 2022,
    category: "产品开发与产业",
    significance: "终端产品研发。"
  },

  // 十、 现代技术与安全性
  {
    id: 45,
    title: "多花黄精药渣碳量子点的制备、表征...及其抗氧化活性研究",
    source: "佳木斯大学",
    year: 2025,
    category: "现代技术与安全性",
    significance: "废物利用与纳米新材料。"
  },
  {
    id: 46,
    title: "基于光谱技术结合深度学习的黄精资源鉴别研究",
    source: "云南中医药大学",
    year: 2024,
    category: "现代技术与安全性",
    significance: "AI与深度学习应用。"
  },
  {
    id: 47,
    title: "利用GC-IMS和红外光谱技术评价中药黄精的霉变研究",
    source: "中国计量大学",
    year: 2024,
    category: "现代技术与安全性",
    significance: "药材安全性控制。"
  },
  {
    id: 48,
    title: "基于近红外光谱的黄精品质无损检测模型研究",
    source: "浙江农林大学",
    year: 2024,
    category: "现代技术与安全性",
    significance: "工业化快检技术。"
  },
  {
    id: 49,
    title: "应用电化学方法和红外光谱法对中药黄精进行质量的初步研究",
    source: "安徽中医药大学",
    year: 2021,
    category: "现代技术与安全性",
    significance: "检测手段创新。"
  },
  {
    id: 50,
    title: "中药黄精真伪鉴定及抗超氧阴离子自由基的研究",
    source: "天津医科大学",
    year: 2007,
    category: "现代技术与安全性",
    significance: "经典的真伪鉴定代表。"
  },
  {
    id: 51,
    title: "黄精炮制前后有效成分变化及其降糖活性研究",
    source: "昆明理工大学",
    year: 2025,
    category: "代谢性疾病",
    significance: "探讨炮制对降糖活性的增强作用。"
  },
  {
    id: 52,
    title: "三七-滇黄精轮作与间作对三七连作障碍的消减效应研究",
    source: "云南师范大学",
    year: 2025,
    category: "产品开发与产业",
    significance: "农业生态种植模式创新。"
  },
  {
    id: 53,
    title: "明胶/黄精多糖纳米纤维海绵的制备及其用于止血和感染性伤口修复的研究",
    source: "青岛大学",
    year: 2025,
    category: "现代技术与安全性",
    significance: "黄精多糖在生物医用材料领域的应用。"
  },
  {
    id: 54,
    title: "黄精多糖通过调控CXCL10与MAPK/NF-κB信号通路改善骨关节炎",
    source: "广西医科大学",
    year: 2025,
    category: "肝、肾、骨骼及其他",
    significance: "揭示黄精多糖保护软骨的新机制。"
  },
  {
    id: 55,
    title: "两种外源激素打破黄精种子双重休眠的机制研究",
    source: "河南农业大学",
    year: 2025,
    category: "产品开发与产业",
    significance: "解决黄精人工栽培中的育种难题。"
  },
  {
    id: 56,
    title: "水杨酸促进多花黄精硒积累及含硒糖化蛋白合成的机制研究",
    source: "中南林业科技大学",
    year: 2025,
    category: "化学成分与质量标准",
    significance: "富硒黄精生产的理论基础。"
  },
  {
    id: 57,
    title: "乳杆菌合成多糖的特征及其协同黄精缓解胃炎的作用",
    source: "江南大学",
    year: 2025,
    category: "肠道健康与免疫调节",
    significance: "益生菌与中药协同保护胃黏膜。"
  },
  {
    id: 58,
    title: "黄精多糖基于胆汁酸代谢改善香烟烟雾介导的小鼠结直肠癌的机制研究",
    source: "四川农业大学",
    year: 2025,
    category: "抗肿瘤研究",
    significance: "从代谢角度探讨癌症预防。"
  },
  {
    id: 59,
    title: "蒸制烘干循环对黄精品质变化及产品研究的影响",
    source: "江南大学",
    year: 2025,
    category: "炮制工艺与“九蒸九制”",
    significance: "量化蒸晒循环对品质的动态影响。"
  },
  {
    id: 60,
    title: "酵母菌协同乳酸菌发酵富硒黄精工艺优化及其生物活性研究",
    source: "武汉轻工大学",
    year: 2025,
    category: "炮制工艺与“九蒸九制”",
    significance: "现代发酵技术在黄精炮制中的应用。"
  },
  {
    id: 61,
    title: "桂东北中药黄精3种基原植物林下栽培管理方式及经济效益分析",
    source: "广西师范大学",
    year: 2025,
    category: "产品开发与产业",
    significance: "林下经济模式的实证研究。"
  },
  {
    id: 62,
    title: "黄精硒化多糖的制备、抗氧化活性分析及口含片产品的开发",
    source: "山东农业大学",
    year: 2025,
    category: "产品开发与产业",
    significance: "黄精深加工产品的研发范例。"
  },
  {
    id: 63,
    title: "基于比较转录组的代谢工程提高黄精内生菌胞外多糖产量的研究",
    source: "山东农业大学",
    year: 2025,
    category: "化学成分与质量标准",
    significance: "利用生物技术手段提升活性成分产量。"
  },
  {
    id: 64,
    title: "牛蹄筋胶原蛋白-木薯淀粉-黄精多糖复合凝胶的制备及其质地特性研究",
    source: "甘肃农业大学",
    year: 2025,
    category: "产品开发与产业",
    significance: "黄精在功能性食品凝胶中的应用。"
  },
  {
    id: 65,
    title: "黄精对少弱精子症雄性大鼠生殖损伤的保护作用及铁死亡机制研究",
    source: "湖南中医药大学",
    year: 2025,
    category: "生殖健康研究",
    significance: "引入铁死亡概念解析生殖保护机制。"
  },
  {
    id: 66,
    title: "多花黄精抗氧化肽的制备、鉴定及其机制研究",
    source: "新疆农业大学",
    year: 2025,
    category: "化学成分与质量标准",
    significance: "发现黄精中除多糖外的另一类重要活性物质。"
  },
  {
    id: 67,
    title: "黄精对面团特性的影响研究及面包开发",
    source: "郑州轻工业大学",
    year: 2025,
    category: "产品开发与产业",
    significance: "黄精在烘焙食品工业中的应用研究。"
  },
  {
    id: 68,
    title: "多花黄精皂苷对硫酸葡聚糖钠致肠道损伤的保护作用及机制研究",
    source: "南昌大学",
    year: 2025,
    category: "肠道健康与免疫调节",
    significance: "聚焦皂苷成分对肠道屏障的修复作用。"
  },
  {
    id: 69,
    title: "多花黄精药渣碳量子点的制备、表征、分析应用及其抗氧化活性研究",
    source: "佳木斯大学",
    year: 2025,
    category: "现代技术与安全性",
    significance: "中药废弃物资源化利用的前沿探索。"
  },
  {
    id: 70,
    title: "黄酒曲发酵黄精的工艺优化及发酵黄精多糖降脂功效机制研究",
    source: "浙江科技大学",
    year: 2025,
    category: "代谢性疾病",
    significance: "发酵工艺对黄精降脂活性的提升研究。"
  },
  {
    id: 71,
    title: "黄精粉对面包品质的影响以及低GI面包的开发",
    source: "安徽工程大学",
    year: 2025,
    category: "产品开发与产业",
    significance: "针对健康需求的低GI食品研发。"
  },
  {
    id: 72,
    title: "滇黄精多糖结构表征及其益生元活性研究",
    source: "贵州大学",
    year: 2025,
    category: "肠道健康与免疫调节",
    significance: "系统评价滇黄精多糖对益生菌的促进作用。"
  },
  {
    id: 73,
    title: "黄精-桑叶-荷叶功能茶工艺优化及其功能特性研究",
    source: "江西农业大学",
    year: 2025,
    category: "产品开发与产业",
    significance: "多味药食同源物质配伍茶饮开发。"
  },
  {
    id: 74,
    title: "黄精中性糖分离纯化及结构分析",
    source: "长春工业大学",
    year: 2025,
    category: "化学成分与质量标准",
    significance: "对黄精多糖中特定组分的深度解析。"
  },
  {
    id: 75,
    title: "藤黄精酸促进口腔鳞状细胞癌细胞凋亡的作用机制研究",
    source: "湖北医药学院",
    year: 2025,
    category: "抗肿瘤研究",
    significance: "探索黄精成分在口腔癌治疗中的潜力。"
  },
  {
    id: 76,
    title: "黄精通过调控p53/Caspase信号通路改善肝纤维化的机制研究",
    source: "成都医学院",
    year: 2025,
    category: "肝、肾、骨骼及其他",
    significance: "揭示黄精抗肝纤维化的分子靶点。"
  },
  {
    id: 77,
    title: "适宜林下种植的黄精品种筛选及种植模式研究",
    source: "贵州大学",
    year: 2025,
    category: "产品开发与产业",
    significance: "为区域林下中药材产业提供品种支撑。"
  },
  {
    id: 78,
    title: "多花黄精遗传转化体系优化及PcRAP2.11的功能研究",
    source: "福建农林大学",
    year: 2025,
    category: "现代技术与安全性",
    significance: "黄精分子育种的基础研究。"
  },
  {
    id: 79,
    title: "黄精脱须装置设计与试验研究",
    source: "江西农业大学",
    year: 2025,
    category: "产品开发与产业",
    significance: "黄精初加工机械化设备的研发。"
  },
  {
    id: 80,
    title: "基于近红外、中红外光谱的多花黄精品质快速无损检测研究",
    source: "江苏科技大学",
    year: 2025,
    category: "现代技术与安全性",
    significance: "现代光谱技术在药材质量快检中的应用。"
  },
  {
    id: 81,
    title: "黄精皂苷与复合乳酸菌联合降糖作用评价及其机制研究",
    source: "东北林业大学",
    year: 2025,
    category: "代谢性疾病",
    significance: "中药成分与益生菌的协同降糖效应。"
  },
  {
    id: 82,
    title: "多花黄精叶抗氧化活性部位的制备及抗氧化产品的研发",
    source: "重庆工商大学",
    year: 2025,
    category: "产品开发与产业",
    significance: "拓宽黄精非药用部位（叶）的利用价值。"
  },
  {
    id: 83,
    title: "多花黄精叶多酚提取纯化及其在抗氧化复合膜中的应用",
    source: "重庆工商大学",
    year: 2025,
    category: "现代技术与安全性",
    significance: "黄精叶多酚在活性包装材料中的应用。"
  },
  {
    id: 84,
    title: "九华黄精均一多糖的结构表征及改善糖尿病的作用机制研究",
    source: "安徽中医药大学",
    year: 2025,
    category: "代谢性疾病",
    significance: "道地药材九华黄精的降糖机制研究。"
  },
  {
    id: 85,
    title: "多花黄精多糖独立于肠道微生物缓解溃疡性结肠炎的作用研究",
    source: "安徽中医药大学",
    year: 2025,
    category: "肠道健康与免疫调节",
    significance: "探讨多糖对肠道的直接保护作用。"
  },
  {
    id: 86,
    title: "磷酸化九蒸九制黄精多糖的制备及抗衰老化妆品的研发",
    source: "安徽中医药大学",
    year: 2025,
    category: "产品开发与产业",
    significance: "结构修饰提升黄精多糖的护肤功效。"
  },
  {
    id: 87,
    title: "黄精山楂果糕的制备工艺及降血脂作用研究",
    source: "成都大学",
    year: 2025,
    category: "代谢性疾病",
    significance: "药食同源休闲食品的降脂功效评价。"
  },
  {
    id: 88,
    title: "多花黄精须根多糖诱导小麦白粉病抗性机制探究",
    source: "四川农业大学",
    year: 2024,
    category: "产品开发与产业",
    significance: "黄精须根在植物免疫诱抗剂中的应用。"
  },
  {
    id: 89,
    title: "基于药材和食材用途的多花黄精种质资源分析及评价",
    source: "贵州大学",
    year: 2024,
    category: "化学成分与质量标准",
    significance: "多维度评价黄精种质的药食两用价值。"
  },
  {
    id: 90,
    title: "多花黄精皂苷对人卵巢癌细胞A2780的抑制作用及机制研究",
    source: "浙江农林大学",
    year: 2024,
    category: "抗肿瘤研究",
    significance: "皂苷成分抗妇科肿瘤的机制探索。"
  },
  {
    id: 91,
    title: "黄精对淀粉类食品品质及体外消化特性的影响",
    source: "浙江农林大学",
    year: 2024,
    category: "产品开发与产业",
    significance: "研究黄精对主食消化特性的改良作用。"
  },
  {
    id: 92,
    title: "11种地理标志黄精资源评价及其功能食品试制",
    source: "浙江农林大学",
    year: 2024,
    category: "化学成分与质量标准",
    significance: "全国地理标志黄精的系统性对比评价。"
  },
  {
    id: 93,
    title: "黄精健脑方治疗肾虚血瘀型血管性轻度认知障碍的疗效观察及静息态功能磁共振研究",
    source: "中国中医科学院",
    year: 2024,
    category: "神经系统与抗衰老",
    significance: "结合影像学技术验证黄精复方的健脑作用。"
  },
  {
    id: 94,
    title: "黄精多糖的生物酶辅助提取工艺优化及其生物活性研究",
    source: "兰州理工大学",
    year: 2024,
    category: "化学成分与质量标准",
    significance: "绿色提取工艺提升多糖得率与活性。"
  },
  {
    id: 95,
    title: "利用GC-IMS和红外光谱技术评价中药黄精的霉变研究",
    source: "中国计量大学",
    year: 2024,
    category: "现代技术与安全性",
    significance: "建立黄精霉变的早期预警检测方法。"
  },
  {
    id: 96,
    title: "黄精黄酒酿造工艺及其对小鼠高脂血症改善作用研究",
    source: "陕西理工大学",
    year: 2024,
    category: "代谢性疾病",
    significance: "传统黄酒与黄精结合的降脂研究。"
  },
  {
    id: 97,
    title: "黄精益智仁复合固体饮料的研制及抗疲劳研究",
    source: "长春工业大学",
    year: 2024,
    category: "产品开发与产业",
    significance: "针对疲劳人群的功能性饮料开发。"
  },
  {
    id: 98,
    title: "多花黄精多糖对巨噬细胞的免疫调节作用及机制初探",
    source: "南昌大学",
    year: 2024,
    category: "肠道健康与免疫调节",
    significance: "从细胞层面解析多糖的免疫增强作用。"
  },
  {
    id: 99,
    title: "挤压蒸煮黄精粉的趁鲜制备、品质评价与添加应用研究",
    source: "湖南中医药大学",
    year: 2024,
    category: "炮制工艺与“九蒸九制”",
    significance: "现代挤压加工技术对黄精品质的改良。"
  },
  {
    id: 100,
    title: "黄精麻味物质基础及消减机制研究",
    source: "湖南农业大学",
    year: 2024,
    category: "炮制工艺与“九蒸九制”",
    significance: "科学解释“麻舌感”的成因与消除方法。"
  }
];
