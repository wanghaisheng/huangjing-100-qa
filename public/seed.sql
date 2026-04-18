-- Huangjing (黄精) - Research & FAQ Seed SQL
-- Generated for Medicinal & Edible Homology Series

-- Table: papers
CREATE TABLE IF NOT EXISTS "papers" ("id" TEXT PRIMARY KEY, "title" TEXT, "year" TEXT, "source" TEXT, "category" TEXT, "significance" TEXT);
INSERT OR REPLACE INTO "papers" ("id", "title", "year", "source", "category", "significance") VALUES ('1', '基于代谢组学和蛋白组学研究抗栓一号方干预稳定性冠心病的临床效应及机制', '2025', '南京中医药大学', '博士', '代谢组学, 蛋白组学, 抗栓一号方, 稳定性冠心病, 临床效应, 机制');
INSERT OR REPLACE INTO "papers" ("id", "title", "year", "source", "category", "significance") VALUES ('2', '基于线粒体自噬研究黄精赞育胶囊治疗少弱精子症的作用机制', '2025', '北京中医药大学', '硕士', '线粒体自噬, 黄精赞育胶囊, 少弱精子症');
INSERT OR REPLACE INTO "papers" ("id", "title", "year", "source", "category", "significance") VALUES ('3', '黄精炮制前后有效成分变化及其降糖活性研究', '2025', '昆明理工大学', '硕士', '黄精, 炮制, 有方成分, 降糖活性');
INSERT OR REPLACE INTO "papers" ("id", "title", "year", "source", "category", "significance") VALUES ('4', '三七-滇黄精轮作与间作对三七连作障碍的消减效应研究', '2025', '云南师范大学', '硕士', '三七, 滇黄精, 轮作, 间作, 连作障碍, 消减效应');
INSERT OR REPLACE INTO "papers" ("id", "title", "year", "source", "category", "significance") VALUES ('5', '明胶/黄精多糖纳米纤维海绵的制备及其用于止血和感染性伤口修复的研究', '2025', '青岛大学', '硕士', '明胶, 黄精多糖, 纳米纤维海绵, 止血, 感染性伤口修复');
INSERT OR REPLACE INTO "papers" ("id", "title", "year", "source", "category", "significance") VALUES ('6', '黄精多糖通过调控CXCL10与MAPK/NF-κB信号通路改善骨关节炎', '2025', '广西医科大学', '硕士', '黄精多糖, CXCL10, MAPK/NF-κB信号通路, 骨关节炎');
INSERT OR REPLACE INTO "papers" ("id", "title", "year", "source", "category", "significance") VALUES ('7', '国医大师薛伯寿高血压防治体系构建研究', '2025', '中国中医科学院', '博士', '国医大师, 薛伯寿, 高血压');
INSERT OR REPLACE INTO "papers" ("id", "title", "year", "source", "category", "significance") VALUES ('8', '两种外源激素打破黄精种子双重休眠的机制研究', '2025', '河南农业大学', '硕士', '机制, 外源激素, 黄精种子, 双重休眠');
INSERT OR REPLACE INTO "papers" ("id", "title", "year", "source", "category", "significance") VALUES ('9', '一种低成本高效的降血糖评价方法的研究', '2025', '右江民族医学院', '硕士', '降血糖评价方法');
INSERT OR REPLACE INTO "papers" ("id", "title", "year", "source", "category", "significance") VALUES ('10', '水杨酸促进多花黄精硒积累及含硒糖化蛋白合成的机制研究', '2025', '中南林业科技大学', '博士', '水杨酸, 多花黄精, 硒积累, 含硒糖化蛋白, 合成机制');

-- Table: faq
CREATE TABLE IF NOT EXISTS "faq" ("id" TEXT PRIMARY KEY, "question" TEXT, "answer" TEXT, "category" TEXT);
INSERT OR REPLACE INTO "faq" ("id", "question", "answer", "category") VALUES ('faq_1', '{"zh":"黄精在《中国药典》中收载了哪三个品种？","en":"Which three varieties of Polygonatum are listed in the Chinese Pharmacopoeia?"}', '{"zh":"分别是黄精（鸡头黄精）、滇黄精（大黄精）和多花黄精（姜形黄精）。","en":"They are Polygonatum sibiricum (chicken-head Polygonatum), Polygonatum kingianum (large Polygonatum), and Polygonatum cyrtonema (ginger-shaped Polygonatum)."}', '{"zh":"品种、历史与感官基础","en":"Varieties, History & Sensory Basics"}');
INSERT OR REPLACE INTO "faq" ("id", "question", "answer", "category") VALUES ('faq_2', '{"zh":"为什么多花黄精在传统评价中被视为精品？","en":"Why is Polygonatum cyrtonema considered a premium variety in traditional evaluation?"}', '{"zh":"其历史记载质量上乘，且现代研究发现其总皂苷含量显著高于其他品种，最高可达普通黄精的 20 倍。","en":"It has a historical reputation for superior quality, and modern research shows its total saponin content is significantly higher than other varieties, up to 20 times that of common Polygonatum."}', '{"zh":"品种、历史与感官基础","en":"Varieties, History & Sensory Basics"}');
INSERT OR REPLACE INTO "faq" ("id", "question", "answer", "category") VALUES ('faq_3', '多花黄精的形态特征是什么？', '根茎通常呈姜形或连珠状，分枝少而短粗，表面有明显的疣状突起须根痕。', '品种、历史与感官基础');
INSERT OR REPLACE INTO "faq" ("id", "question", "answer", "category") VALUES ('faq_4', '“仙人余粮”的称呼从何而来？', '因黄精富含淀粉、糖分等多种营养成分，古人认为久服可延年、不饥。', '品种、历史与感官基础');
INSERT OR REPLACE INTO "faq" ("id", "question", "answer", "category") VALUES ('faq_5', '为什么生黄精会“戟人咽喉”？', '生黄精含有生物碱、粘液质及 5-羟甲基糠醛（5-HMF）等刺激性成分。', '品种、历史与感官基础');
INSERT OR REPLACE INTO "faq" ("id", "question", "answer", "category") VALUES ('faq_6', '黄精炮制的标准“黑似漆，甜如饴”是指什么？', '指炮制后黄精表面乌黑、质地柔软且味道变甜，不再有麻舌感。', '品种、历史与感官基础');
INSERT OR REPLACE INTO "faq" ("id", "question", "answer", "category") VALUES ('faq_7', '炮制过程中颜色变黑的化学本质是什么？', '主要是美拉德反应（Maillard reaction），即还原糖与氨基化合物在高温下产生的生化过程。', '品种、历史与感官基础');
INSERT OR REPLACE INTO "faq" ("id", "question", "answer", "category") VALUES ('faq_8', '九蒸九晒的工艺最早见于哪部典籍？', '唐代孙思邈的《千金翼方》记载了重蒸法，孟诜在《食疗本草》中首次明确提出“九蒸九曝”。', '品种、历史与感官基础');
INSERT OR REPLACE INTO "faq" ("id", "question", "answer", "category") VALUES ('faq_9', '生黄精和制黄精的药性有什么区别？', '生黄精具有刺感，炮制后能纠偏药性、增加有效成分积累，使其补脾润肺、滋肾填精的功效增强。', '品种、历史与感官基础');
INSERT OR REPLACE INTO "faq" ("id", "question", "answer", "category") VALUES ('faq_10', '“姜形黄精”是指哪种黄精？', '主要指多花黄精，因其根茎呈不规则结节块状相连。', '品种、历史与感官基础');

-- Full Database Table Creation (Empty structure for users to fill or use via CSV import)
CREATE TABLE IF NOT EXISTS "full_papers" ("id" TEXT PRIMARY KEY, "字段 1" TEXT, "中文题名" TEXT, "作者" TEXT, "学位授予单位" TEXT, "数据库" TEXT, "学位授予年度" TEXT, "被引" TEXT, "下载" TEXT, "操作" TEXT, "标签" TEXT);
