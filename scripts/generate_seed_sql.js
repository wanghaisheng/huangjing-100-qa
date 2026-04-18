const { FAQ_DATA } = require('./packages/core/src/constants/faqData');
const fs = require('fs');

// Mock Data for Papers (since CSV reading is harder in a simple script without papa)
const papers = [
  { id: '1', title: '基于代谢组学和蛋白组学研究抗栓一号方干预稳定性冠心病的临床效应及机制', year: 2025, source: '南京中医药大学', category: '博士', significance: '代谢组学, 蛋白组学, 抗栓一号方, 稳定性冠心病, 临床效应, 机制' },
  { id: '2', title: '基于线粒体自噬研究黄精赞育胶囊治疗少弱精子症的作用机制', year: 2025, source: '北京中医药大学', category: '硕士', significance: '线粒体自噬, 黄精赞育胶囊, 少弱精子症' },
  { id: '3', title: '黄精炮制前后有效成分变化及其降糖活性研究', year: 2025, source: '昆明理工大学', category: '硕士', significance: '黄精, 炮制, 有效成分, 降糖活性' },
  { id: '4', title: '三七-滇黄精轮作与间作对三七连作障碍的消减效应研究', year: 2025, source: '云南师范大学', category: '硕士', significance: '三七, 滇黄精, 轮作, 间作, 连作障碍, 消减效应' },
  { id: '5', title: '明胶/黄精多糖纳米纤维海绵的制备及其用于止血和感染性伤口修复的研究', year: 2025, source: '青岛大学', category: '硕士', significance: '明胶, 黄精多糖, 纳米纤维海绵, 止血, 感染性伤口修复' },
  { id: '6', title: '黄精多糖通过调控CXCL10与MAPK/NF-κB信号通路改善骨关节炎', year: 2025, source: '广西医科大学', category: '硕士', significance: '黄精多糖, CXCL10, MAPK/NF-κB信号通路, 骨关节炎' },
  { id: '7', title: '国医大师薛伯寿高血压防治体系构建研究', year: 2025, source: '中国中医科学院', category: '博士', significance: '国医大师, 薛伯寿, 高血压' },
  { id: '8', title: '两种外源激素打破黄精种子双重休眠的机制研究', year: 2025, source: '河南农业大学', category: '硕士', significance: '机制, 外源激素, 黄精种子, 双重休眠' },
  { id: '9', title: '一种低成本高效的降血糖评价方法的研究', year: 2025, source: '右江民族医学院', category: '硕士', significance: '降血糖评价方法' },
  { id: '10', title: '水杨酸促进多花黄精硒积累及含硒糖化蛋白合成的机制研究', year: 2025, source: '中南林业科技大学', category: '博士', significance: '水杨酸, 多花黄精, 硒积累, 含硒糖化蛋白, 合成机制' }
];

let sql = '-- Seed SQL for Huangjing (黄精)\n\n';

// Papers
sql += '-- Table: papers\n';
sql += 'CREATE TABLE IF NOT EXISTS "papers" ("id" TEXT PRIMARY KEY, "title" TEXT, "year" TEXT, "source" TEXT, "category" TEXT, "significance" TEXT);\n';
papers.forEach(p => {
  const values = Object.values(p).map(v => `'${String(v).replace(/'/g, "''")}'`).join(', ');
  sql += `INSERT OR REPLACE INTO "papers" ("id", "title", "year", "source", "category", "significance") VALUES (${values});\n`;
});
sql += '\n';

// FAQ
sql += '-- Table: faq\n';
sql += 'CREATE TABLE IF NOT EXISTS "faq" ("id" TEXT PRIMARY KEY, "question" TEXT, "answer" TEXT, "category" TEXT);\n';
FAQ_DATA.forEach((item, i) => {
  const row = {
    id: `faq_${i + 1}`,
    question: typeof item.question === 'object' ? JSON.stringify(item.question) : item.question,
    answer: typeof item.answer === 'object' ? JSON.stringify(item.answer) : item.answer,
    category: typeof item.category === 'object' ? JSON.stringify(item.category) : item.category
  };
  const values = Object.values(row).map(v => `'${String(v).replace(/'/g, "''")}'`).join(', ');
  sql += `INSERT OR REPLACE INTO "faq" ("id", "question", "answer", "category") VALUES (${values});\n`;
});

fs.writeFileSync('./public/seed.sql', sql);
console.log('Seed SQL generated at ./public/seed.sql');
