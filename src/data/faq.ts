export type I18nString = string | { zh: string; en: string };

export interface FAQItem {
  question: I18nString;
  answer: I18nString;
  category: I18nString;
}

export const FAQ_DATA: FAQItem[] = [
  // 第一部分：品种、历史与感官基础 (1-15)
  {
    category: { zh: "品种、历史与感官基础", en: "Varieties, History & Sensory Basics" },
    question: { zh: "黄精在《中国药典》中收载了哪三个品种？", en: "Which three varieties of Polygonatum are listed in the Chinese Pharmacopoeia?" },
    answer: { zh: "分别是黄精（鸡头黄精）、滇黄精（大黄精）和多花黄精（姜形黄精）。", en: "They are Polygonatum sibiricum (chicken-head Polygonatum), Polygonatum kingianum (large Polygonatum), and Polygonatum cyrtonema (ginger-shaped Polygonatum)." }
  },
  {
    category: { zh: "品种、历史与感官基础", en: "Varieties, History & Sensory Basics" },
    question: { zh: "为什么多花黄精在传统评价中被视为精品？", en: "Why is Polygonatum cyrtonema considered a premium variety in traditional evaluation?" },
    answer: { zh: "其历史记载质量上乘，且现代研究发现其总皂苷含量显著高于其他品种，最高可达普通黄精的 20 倍。", en: "It has a historical reputation for superior quality, and modern research shows its total saponin content is significantly higher than other varieties, up to 20 times that of common Polygonatum." }
  },
  {
    category: "品种、历史与感官基础",
    question: "多花黄精的形态特征是什么？",
    answer: "根茎通常呈姜形或连珠状，分枝少而短粗，表面有明显的疣状突起须根痕。"
  },
  {
    category: "品种、历史与感官基础",
    question: "“仙人余粮”的称呼从何而来？",
    answer: "因黄精富含淀粉、糖分等多种营养成分，古人认为久服可延年、不饥。"
  },
  {
    category: "品种、历史与感官基础",
    question: "为什么生黄精会“戟人咽喉”？",
    answer: "生黄精含有生物碱、粘液质及 5-羟甲基糠醛（5-HMF）等刺激性成分。"
  },
  {
    category: "品种、历史与感官基础",
    question: "黄精炮制的标准“黑似漆，甜如饴”是指什么？",
    answer: "指炮制后黄精表面乌黑、质地柔软且味道变甜，不再有麻舌感。"
  },
  {
    category: "品种、历史与感官基础",
    question: "炮制过程中颜色变黑的化学本质是什么？",
    answer: "主要是美拉德反应（Maillard reaction），即还原糖与氨基化合物在高温下产生的生化过程。"
  },
  {
    category: "品种、历史与感官基础",
    question: "九蒸九晒的工艺最早见于哪部典籍？",
    answer: "唐代孙思邈的《千金翼方》记载了重蒸法，孟诜在《食疗本草》中首次明确提出“九蒸九曝”。"
  },
  {
    category: "品种、历史与感官基础",
    question: "生黄精和制黄精的药性有什么区别？",
    answer: "生黄精具有刺感，炮制后能纠偏药性、增加有效成分积累，使其补脾润肺、滋肾填精的功效增强。"
  },
  {
    category: "品种、历史与感官基础",
    question: "“姜形黄精”是指哪种黄精？",
    answer: "主要指多花黄精，因其根茎呈不规则结节块状相连。"
  },
  {
    category: "品种、历史与感官基础",
    question: "多花黄精在中国主要分布在哪些省份？",
    answer: "主要分布于长江流域及其以南地区，如四川、贵州、湖南、江西、安徽等。"
  },
  {
    category: "品种、历史与感官基础",
    question: "为什么江西铜鼓县被称为“中国黄精之乡”？",
    answer: "因其森林覆盖率极高，是多花黄精的优质天然分布区，且铜鼓黄精获国家地理标志认证。"
  },
  {
    category: "品种、历史与感官基础",
    question: "黄精主要入哪几条经脉？",
    answer: "归脾、肺、肾三经。"
  },
  {
    category: "品种、历史与感官基础",
    question: "什么是“代参地”？",
    answer: "指黄精具有能取代人参补气和熟地滋阴的功效。"
  },
  {
    category: "品种、历史与感官基础",
    question: "黄精炮制后重量为什么会下降？",
    answer: "因蒸制过程中浸出液流出及水分流失，反复蒸晒使干重显著降低。"
  },

  // 第二部分：炮制工艺与化学成分转化 (16-40)
  {
    category: "炮制工艺与化学成分转化",
    question: "九蒸九晒过程中总多糖含量如何变化？",
    answer: "总体呈下降趋势，因为大分子多糖在高温高湿下水解为还原糖和单糖。"
  },
  {
    category: "炮制工艺与化学成分转化",
    question: "还原糖含量为什么会在炮制后期显著升高？",
    answer: "由于多糖水解转化，还原糖含量最高可增长约 10 倍，提升了口感甜度。"
  },
  {
    category: "炮制工艺与化学成分转化",
    question: "总皂苷在炮制过程中的动态趋势如何？",
    answer: "通常呈现先增大后降低或趋于稳定的趋势。"
  },
  {
    category: "炮制工艺与化学成分转化",
    question: "5-羟甲基糠醛（5-HMF）的含量如何波动？",
    answer: "随着蒸晒次数增加，5-HMF 含量先升后降，通常在第九次蒸晒后降至最低。"
  },
  {
    category: "炮制工艺与化学成分转化",
    question: "为什么有研究认为“四蒸四晒”是最佳点？",
    answer: "基于感官评价和多糖、浸出物含量的综合评分，四次蒸晒通常在品质和效率上达到平衡点。"
  },
  {
    category: "炮制工艺与化学成分转化",
    question: "但在缓解结肠炎方面，几次蒸晒效果最好？",
    answer: "研究表明九次蒸晒（NSNB）在修复肠道屏障和抗炎效果方面表现最为突出。"
  },
  {
    category: "炮制工艺与化学成分转化",
    question: "什么是“生物可及性”？",
    answer: "指营养成分在胃肠道中被释放并能被人体吸收的比例；九次蒸晒显著提高了总酚和皂苷的生物可及性。"
  },
  {
    category: "炮制工艺与化学成分转化",
    question: "扫描电镜下炮制后的黄精微观结构有何变化？",
    answer: "其细胞壁结构变得破碎、疏松多孔，有利于活性物质的释放。"
  },
  {
    category: "炮制工艺与化学成分转化",
    question: "美拉德反应对黄精滋味有何贡献？",
    answer: "产生了类似焦糖的香味，并使原本的苦涩味在前四次蒸制后显著减弱。"
  },
  {
    category: "炮制工艺与化学成分转化",
    question: "传统炮制工艺中添加酒和黑豆有什么作用？",
    answer: "酒能助药势、辅助皂苷溶出；黑豆则被认为能增强补肾疗效并降低毒性。"
  },
  {
    category: "炮制工艺与化学成分转化",
    question: "微生物发酵法制备黄精有什么独特优势？",
    answer: "比传统工艺更节能、高效（仅需几十小时），且能保留易流失的具有益生元活性的 β-果聚糖。"
  },
  {
    category: "炮制工艺与化学成分转化",
    question: "米曲霉发酵对黄精多糖得率有何影响？",
    answer: "通过酶解作用，发酵可使原本难以提取的活性多糖得率大幅提升（达 40% 以上）。"
  },
  {
    category: "炮制工艺与化学成分转化",
    question: "发酵黄精中会产生哪些新的风味物质？",
    answer: "产生了丰富的酯类、醛类等，增加了果香和甜香气味。"
  },
  {
    category: "炮制工艺与化学成分转化",
    question: "什么是“后生元”？发酵黄精中包含它吗？",
    answer: "后生元是微生物代谢产生的活性物质；发酵黄精在过程中形成了新的有机酸和短链脂肪酸，具有显著的抗炎潜力。"
  },
  {
    category: "炮制工艺与化学成分转化",
    question: "炮制对黄精浸出物含量有何影响？",
    answer: "生品浸出物含量通常最高，炮制后略有降低，但水溶性成分在四蒸左右达到一个峰值。"
  },
  {
    category: "炮制工艺与化学成分转化",
    question: "总酚和总黄酮含量在炮制中如何变化？",
    answer: "总酚含量随炮制次数增加而富集，而总黄酮含量通常随炮制时间延长而减少。"
  },
  {
    category: "炮制工艺与化学成分转化",
    question: "什么是黄精中的特征性成分？",
    answer: "高异黄酮类化合物被认为是黄精属植物的特征成分。"
  },
  {
    category: "炮制工艺与化学成分转化",
    question: "黄精多糖主要由哪些单糖组成？",
    answer: "果糖、葡萄糖、半乳糖、阿拉伯糖等，其中多花黄精以果糖为主（可达 90% 以上）。"
  },
  {
    category: "炮制工艺与化学成分转化",
    question: "黄精中含有的氨基酸种类有多少？",
    answer: "含有 18 种氨基酸，包括 8 种必需氨基酸，其中谷氨酸和天冬氨酸含量最高。"
  },
  {
    category: "炮制工艺与化学成分转化",
    question: "炮制次数对黄精抗氧化活性（DPPH）的影响？",
    answer: "抗氧化能力随蒸晒次数同步增强，第九次蒸晒后活性最强。"
  },
  {
    category: "炮制工艺与化学成分转化",
    question: "什么是黄精多糖的“双峰特征”？",
    answer: "指其分子量分布呈现两个主要的高峰区间。"
  },
  {
    category: "炮制工艺与化学成分转化",
    question: "为什么反复蒸制后黄精会产生酸味？",
    answer: "长期高温可能导致部分糖类降解或有机酸累积，尤其在八蒸之后出现微酸感。"
  },
  {
    category: "炮制工艺与化学成分转化",
    question: "酒黄精中多糖和皂苷的含量要求是多少？",
    answer: "按药典标准，酒黄精多糖不得少于 4.0%。"
  },
  {
    category: "炮制工艺与化学成分转化",
    question: "多花黄精皂苷主要分为哪两类？",
    answer: "甾体皂苷（主要成分）和少量三萜皂苷。"
  },
  {
    category: "炮制工艺与化学成分转化",
    question: "炮制过程中薯蓣皂苷会发生什么转化？",
    answer: "在反复蒸晒下，薯蓣皂苷可能转化为延龄草苷或薯蓣皂苷元。"
  },

  // 第三部分：肠道健康与微环境调节 (41-60)
  {
    category: "肠道健康与微环境调节",
    question: "黄精如何改善溃疡性结肠炎（UC）？",
    answer: "通过下调促炎因子（TNF-α）、修复肠道屏障蛋白（ZO-1）及增加粘蛋白（MUC2）分泌。"
  },
  {
    category: "肠道健康与微环境调节",
    question: "黄精多糖对肠道紧密连接蛋白（TJ）有何作用？",
    answer: "它能显著上调 Occludin、Claudin-1 和 ZO-1 的表达，增强肠道物理屏障，防止内毒素渗漏。"
  },
  {
    category: "肠道健康与微环境调节",
    question: "什么是肠道中的“三道防线”？",
    answer: "物理屏障（紧密连接）、化学屏障（粘液层）和免疫屏障（Treg 细胞等）。"
  },
  {
    category: "肠道健康与微环境调节",
    question: "黄精多糖属于益生元吗？",
    answer: "是的，它不能被胃肠道消化，但能作为碳源被肠道益生菌利用产酸。"
  },
  {
    category: "肠道健康与微环境调节",
    question: "黄精干预后哪种益生菌丰度显著增加？",
    answer: "Akkermansia（阿克曼氏菌）、双歧杆菌属、乳杆菌属及 Allobaculum。"
  },
  {
    category: "肠道健康与微环境调节",
    question: "哪种有害菌会受到抑制？",
    answer: "大肠杆菌-志贺氏菌、肠球菌及幽门螺杆菌属。"
  },
  {
    category: "肠道健康与微环境调节",
    question: "什么是短链脂肪酸（SCFAs）？黄精如何影响它？",
    answer: "是肠道菌群代谢产生的有益产物；黄精能显著提高乙酸、丙酸和丁酸的产量。"
  },
  {
    category: "肠道健康与微环境调节",
    question: "短链脂肪酸对结肠有什么好处？",
    answer: "为肠皮细胞供能、降低肠道 pH 值并抑制致病菌生长。"
  },
  {
    category: "肠道健康与微环境调节",
    question: "黄精如何调节 Treg/Th17 细胞平衡？",
    answer: "在结肠炎模型中，它能提升 Treg 细胞（抑制炎症）并降低 Th17 细胞（促进炎症）的比例。"
  },
  {
    category: "肠道健康与微环境调节",
    question: "发酵黄精在调节肠道免疫方面比传统品更好吗？",
    answer: "有研究显示，发酵产生的后生元在调节免疫稳态方面比水提多糖表现出更精准的作用。"
  },
  {
    category: "肠道健康与微环境调节",
    question: "什么是 F/B 比值？",
    answer: "厚壁菌门与拟杆菌门的比值；黄精能回调失衡的 F/B 比值，从而改善代谢紊乱。"
  },
  {
    category: "肠道健康与微环境调节",
    question: "黄精对粘蛋白 MUC2 的表达有何具体影响？",
    answer: "它能诱导杯状细胞分泌更多 MUC2，加厚肠粘液层，构建生化防线。"
  },
  {
    category: "肠道健康与微环境调节",
    question: "哪种菌群与结肠长度及 DAI 评分呈显著正相关？",
    answer: "Allobaculum 和 Sutterella 菌属通常与肠道健康的恢复程度高度相关。"
  },
  {
    category: "肠道健康与微环境调节",
    question: "黄精多糖能预防香烟烟雾诱发的结直肠癌吗？",
    answer: "研究发现其能通过调节胆汁酸代谢改善烟雾介导的肠道病变风险。"
  },
  {
    category: "肠道健康与微环境调节",
    question: "黄精多糖对高原低氧导致的肠损伤有用吗？",
    answer: "有用，它能调节低氧暴露导致的肠粘膜屏障受损。"
  },
  {
    category: "肠道健康与微环境调节",
    question: "黄精如何通过“肠-胰轴”发挥降糖作用？",
    answer: "通过调节肠道微生物结构，促进 GLP-1（肠促胰素）分泌，改善胰岛素抵抗。"
  },
  {
    category: "肠道健康与微环境调节",
    question: "黄精多糖在体外模拟消化阶段的特点？",
    answer: "在口腔和胃部几乎不被降解，主要在肠道后端被微生物酵解利用。"
  },
  {
    category: "肠道健康与微环境调节",
    question: "什么是“肠道微环境”？",
    answer: "包括菌群组成、代谢产物（SCFAs）和肠粘膜组织的综合生态平衡。"
  },
  {
    category: "肠道健康与微环境调节",
    question: "多花黄精多糖 PCP 85-1-1 组发酵后 SCFA 增长了多少？",
    answer: "实验显示增长了约 5.28 倍。"
  },
  {
    category: "肠道健康与微环境调节",
    question: "黄精多糖能提高肠道菌群的多样性吗？",
    answer: "能显著提高 Chao1 和 Shannon 指数，恢复受损后的菌群丰度。"
  },

  // 第四部分：肝脏保护、降糖与代谢 (61-80)
  {
    category: "肝脏保护、降糖与代谢",
    question: "什么是“肠-肝轴”？",
    answer: "肠道与肝脏通过门静脉系统进行的双向沟通路径。"
  },
  {
    category: "肝脏保护、降糖与代谢",
    question: "多花黄精多糖如何缓解酒精性肝损伤？",
    answer: "通过增强肝脏乙醇脱氢酶（ADH）活性并阻断肠道内毒素入血。"
  },
  {
    category: "肝脏保护、降糖与代谢",
    question: "乙醇脱氢酶（ADH）在其中的作用是什么？",
    answer: "它是酒精代谢的第一步酶，黄精多糖能上调其活性，加速乙醇降解。"
  },
  {
    category: "肝脏保护、降糖与代谢",
    question: "黄精多糖如何抑制肝脏炎症信号通路？",
    answer: "通过抑制 TLR4/NF-κB 通路的激活，减少促炎因子释放。"
  },
  {
    category: "肝脏保护、降糖与代谢",
    question: "黄精对脂质过氧化产物 MDA 的影响？",
    answer: "能显著下调肝脏和血液中的 MDA 含量，缓解氧化应激。"
  },
  {
    category: "肝脏保护、降糖与代谢",
    question: "哪种菌群与酒精肝损伤指标（AST/ALT）显著负相关？",
    answer: "Gordonibacter（及 Gordonibacter pamelaeae）。"
  },
  {
    category: "肝脏保护、降糖与代谢",
    question: "黄精如何增强肝脏抗氧化酶活性？",
    answer: "激活 Keap1/HO-1 信号通路，提升 SOD 和 GSH-Px 的活力。"
  },
  {
    category: "肝脏保护、降糖与代谢",
    question: "黄精多糖对 II 型糖尿病小鼠血糖的影响？",
    answer: "显著降低空腹血糖（FBG）并改善口服糖耐量（OGTT）。"
  },
  {
    category: "肝脏保护、降糖与代谢",
    question: "它对控制食欲有帮助吗？",
    answer: "通过提高血液中 GLP-1 水平，可能有助于增加饱腹感、减少摄食量。"
  },
  {
    category: "肝脏保护、降糖与代谢",
    question: "黄精嫩芽茶提取物能抑制哪两种消化酶？",
    answer: "α-葡萄糖苷酶和 α-淀粉酶，从而延缓餐后血糖上升。"
  },
  {
    category: "肝脏保护、降糖与代谢",
    question: "黄精黄酒对高脂血症有改善作用吗？",
    answer: "酿造过程中多糖与皂苷溶出，能降低总胆固醇（T-CHO）和甘油三酯（TG）。"
  },
  {
    category: "肝脏保护、降糖与代谢",
    question: "黄精提取物如何防治非酒精性脂肪肝？",
    answer: "通过调节胆汁酸代谢及脂质组分，减少肝脏脂肪堆积。"
  },
  {
    category: "肝脏保护、降糖与代谢",
    question: "糖尿病小鼠服用黄精多糖后胰岛结构的变化？",
    answer: "能有效缓解胰岛萎缩、修复受损的胰岛 β 细胞。"
  },
  {
    category: "肝脏保护、降糖与代谢",
    question: "黄精如何改善胰岛素抵抗？",
    answer: "通过改善机体慢性炎症状态及下调 HOMA-IR 指数。"
  },
  {
    category: "肝脏保护、降糖与代谢",
    question: "黄精与复合乳酸菌联用有什么效果？",
    answer: "具有显著的降糖协同增效作用，能提高益生菌的体内定植率。"
  },
  {
    category: "肝脏保护、降糖与代谢",
    question: "黄精皂苷对降糖也有贡献吗？",
    answer: "是的，皂苷通过调节信号通路表现出良好的降血糖活性。"
  },
  {
    category: "肝脏保护、降糖与代谢",
    question: "黄精对肥胖小鼠体重的影响？",
    answer: "显著降低营养性肥胖小鼠的体重及附睾脂肪指数。"
  },
  {
    category: "肝脏保护、降糖与代谢",
    question: "哪种成分被认为是控制血糖波动的关键？",
    answer: "多糖被视为核心成分，但总黄酮和皂苷也通过不同通路参与调节。"
  },
  {
    category: "肝脏保护、降糖与代谢",
    question: "长期饮用黄精茶安全吗？",
    answer: "动物实验显示高剂量浸出物仍具有安全性，但需注意其滋腻特性。"
  },
  {
    category: "肝脏保护、降糖与代谢",
    question: "黄精如何影响小鼠脾脏指数？",
    answer: "能显著提高受损模型的免疫器官指数（胸腺、脾脏），增强整体免疫力。"
  },

  // 第五部分：脑健康、神经保护与综合应用 (81-100)
  {
    category: "脑健康、神经保护与综合应用",
    question: "什么是“微生物-肠-脑轴”？",
    answer: "肠道菌群通过神经、内分泌和免疫系统与大脑进行双向调节的机制。"
  },
  {
    category: "脑健康、神经保护与综合应用",
    question: "黄精多糖对防治阿尔茨海默病（AD）有潜力吗？",
    answer: "有，研究发现其能抑制脑内 Aβ 蛋白表达并降低神经炎症。"
  },
  {
    category: "脑健康、神经保护与综合应用",
    question: "它如何改善老年大鼠的学习记忆能力？",
    answer: "通过莫里斯水迷宫等实验证实其能缩短寻台潜伏期，保护突触可塑性。"
  },
  {
    category: "脑健康、神经保护与综合应用",
    question: "黄精对脑组织中乙酰胆碱酯酶的影响？",
    answer: "能下调该酶活性，从而提高脑内乙酰胆碱水平，改善认知。"
  },
  {
    category: "脑健康、神经保护与综合应用",
    question: "哪种炮制品在 AD 药效上表现优异？",
    answer: "酒黄精、炆黄精和黑豆制黄精均有药效，且通过 UPLC-Q/TOF-MS 发现炮制后差异成分多样化。"
  },
  {
    category: "脑健康、神经保护与综合应用",
    question: "黄精能延缓衰老吗？",
    answer: "是的，主要通过清除自由基、提高抗氧化酶活性及维持器官指数实现。"
  },
  {
    category: "脑健康、神经保护与综合应用",
    question: "肾阴虚模型中，黄精如何发挥补益作用？",
    answer: "降低 cAMP/cGMP 比值，提高 Na-K-ATP 酶活性。"
  },
  {
    category: "脑健康、神经保护与综合应用",
    question: "脾阴虚模型中，黄精干预后的变化？",
    answer: "改善食欲和泄泻症状，通过调节氨基酸及有机酸代谢恢复稳态。"
  },
  {
    category: "脑健康、神经保护与综合应用",
    question: "黄精嫩芽（笔管菜）可以吃吗？",
    answer: "可以，其营养价值甚至在某些指标上优于根茎，富含多糖、蛋白质和总酚。"
  },
  {
    category: "脑健康、神经保护与综合应用",
    question: "黄精花有什么开发价值？",
    answer: "研究发现黄精花抗氧化活性很高，具有开发为功能食品的潜力。"
  },
  {
    category: "脑健康、神经保护与综合应用",
    question: "黄精补品建议怎么喝？",
    answer: "九蒸九晒片推荐浸泡、煎煮或泡茶；嫩芽茶推荐 80℃左右冲泡。"
  },
  {
    category: "脑健康、神经保护与综合应用",
    question: "家庭自制黄精酒比例建议？",
    answer: "实验优化表明 100 mL 水酒浸泡 14 g 黄精，浸泡 12 天效果较佳。"
  },
  {
    category: "脑健康、神经保护与综合应用",
    question: "服用黄精有什么人群禁忌？",
    answer: "性滋腻，湿阻中焦、腹胀便溏者应慎用或在医师指导下服用。"
  },
  {
    category: "脑健康、神经保护与综合应用",
    question: "黄精具有抗疲劳作用吗？",
    answer: "能显著延长小鼠游泳力竭时间，增加肝糖原储备。"
  },
  {
    category: "脑健康、神经保护与综合应用",
    question: "黄精如何改善睡眠？",
    answer: "研究分离出的 1-单油酸甘油酯等物质通过 GABA-BDZ 受体起调节作用。"
  },
  {
    category: "脑健康、神经保护与综合应用",
    question: "黄精多糖能抗肿瘤吗？",
    answer: "具有抑制特定肿瘤细胞（如 HeLa 细胞、乳腺癌细胞）增殖的药理作用。"
  },
  {
    category: "脑健康、神经保护与综合应用",
    question: "黄精嫩芽茶每天喝多少？",
    answer: "动物剂量换算至人体约为每日 9.0g。"
  },
  {
    category: "脑健康、神经保护与综合应用",
    question: "黄精能预防骨质疏松吗？",
    answer: "文献综述提到多糖和皂苷具有改善骨密度的潜在药理价值。"
  },
  {
    category: "脑健康、神经保护与综合应用",
    question: "目前研究的局限性是什么？",
    answer: "大部分结论基于动物模型，缺乏大规模的人体随机对照临床试验（RCT）。"
  },
  {
    category: "脑健康、神经保护与综合应用",
    question: "未来黄精研究的方向？",
    answer: "机制精细化（构效关系）、临床转化研究及个性化营养应用。"
  },
  // 第六部分：安全性与质量控制
  {
    category: "炮制工艺与化学成分转化",
    question: "随着炮制次数增加，黄精的总酚（TPC）和还原糖（RSC）含量具体如何变化？",
    answer: "根据最新研究数据，随着蒸晒次数从0次增加到9次，总酚含量从 1.036 mg GAE/g 显著提升至 7.627 mg GAE/g；还原糖含量也从 47.599 mg GE/DW 增长至 465.333 mg GE/DW（增长约10倍），这科学解释了炮制后黄精甜度增加及抗氧化能力增强的本质。"
  },
  {
    category: "炮制工艺与化学成分转化",
    question: "九蒸九晒（NSNB）在肠道保护方面有哪些具体的实验数据支持？",
    answer: "在结肠炎小鼠模型中，九蒸九晒黄精（NSNB）表现出最强的保护效果：它能显著降低促炎因子（IL-1β, IL-6, TNF-α）的水平，保护肠道屏障通透性，并特异性增加 Bifidobacterium（双歧杆菌）和 Sutterella 等益生菌的丰度。"
  },
  {
    category: "炮制工艺与化学成分转化",
    question: "发酵黄精（30h）与传统炮制品相比，在生物活性上有何优势？",
    answer: "发酵工艺通过微生物降解大分子并破坏细胞壁，使活性物质最大化释放。实验显示，发酵30小时的黄精 DPPH 清除能力可达 844.80 μmol/g，且其主要成分的生物可及性（Bioaccessibility）达到最高水平，能有效逆转结肠缩短并降低 DAI 评分。"
  },
  {
    category: "安全性与质量控制",
    question: "云南地区滇黄精的重金属含量实测情况如何？",
    answer: "对云南10个产地的滇黄精测定显示，不同产地差异巨大。虽然多数符合标准，但部分样品存在超标风险：如某些样品镉（Cd）含量达 1.46 mg/kg（标准0.3），铅（Pb）达 9.10 mg/kg（标准5.0），这强调了选址种植时进行土壤重金属筛查的重要性。"
  },
  {
    category: "安全性与质量控制",
    question: "多花黄精的农药残留实测数据是否符合绿色行业标准？",
    answer: "对新野、南平、郴州、湘西等11个产地的多花黄精进行测定，其五氯硝基苯、六六六、滴滴涕（DDT）的含量均低于 0.1 mg/kg，完全符合《药用植物及制剂外经贸绿色行业标准（WM/T2-2004）》，安全性良好。"
  },
  {
    category: "安全性与质量控制",
    question: "《中国药典》对黄精的安全性指标有哪些规定？",
    answer: "2020版《中国药典》一部对多花黄精中的重金属及有害元素有明确限量规定，但目前尚未见对有机氯农残的专门限量规定。"
  }
];
