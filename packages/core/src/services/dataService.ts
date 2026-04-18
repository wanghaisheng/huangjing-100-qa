import { Paper, FaqItem, I18nString } from '../types';
import { getStorage } from './storage';
import Papa from 'papaparse';
import { FAQ_DATA } from '../constants/faqData';

let seedPromise: Promise<void> | null = null;

export const DataService = {
  // Tenant-aware initialization
  initAppId: (appId: string) => {
    // Inject appId into storage adapter based on configured provider
    const provider = import.meta.env.VITE_STORAGE_PROVIDER || 'sqljs';
    getStorage(provider as 'supabase' | 'sqljs').setAppId(appId);
  },

  seedDemoData: async () => {
    if (seedPromise) return seedPromise;
    
    seedPromise = (async () => {
      const storage = getStorage(import.meta.env.VITE_STORAGE_PROVIDER || 'sqljs');
      if (!storage.bulkCreate) return;

      try {
        // Check if data already exists to avoid duplicate seed
        const existingFull = await storage.query('full_papers', { rawSql: 'SELECT COUNT(*) as c FROM "full_papers"' } as any);
        const existingPapers = await storage.query('papers', { rawSql: 'SELECT COUNT(*) as c FROM "papers"' } as any);
        
        const hasFull = existingFull && existingFull.length > 0 && (existingFull[0] as any).c >= 1100;
        const hasPapers = existingPapers && existingPapers.length > 0 && (existingPapers[0] as any).c >= 50;
        
        if (hasFull && hasPapers) return;
      } catch {
        // Table doesn't exist, proceed to seed
      }

      try {
        console.log('Seeding demo data...');
        
        // 1. Try to seed from seed.sql if it exists (Master Seed)
        try {
          const sqlResponse = await fetch('/seed.sql');
          if (sqlResponse.ok) {
            const seedSql = await sqlResponse.text();
            const sqljsStorage = getStorage('sqljs'); // Force sqljs for script execution
            if ((sqljsStorage as any).db) {
              (sqljsStorage as any).db.run(seedSql);
              console.log('Seeded from seed.sql successfully');
              // If we seeded from SQL, we might still want to check papers/faq
            }
          }
        } catch (e) {
          console.warn('Could not load or execute seed.sql, falling back to manual seed', e);
        }

        // 2. Seed full database from CSV
        const response = await fetch('/huangjing.csv');
        if (response.ok) {
          const csvText = await response.text();
          const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
          if (parsed.data && parsed.data.length > 0) {
            // Seed full database
            let fullData = (parsed.data as any[]).map((row, i) => ({
              id: `full_${i + 1}`,
              ...row
            }));

            if (fullData.length > 0 && fullData.length < 1100) {
              console.log('Boosting full database to 1100+ records for realism...');
              const originalSamples = [...fullData];
              const years = ['2023', '2024', '2025'];
              const units = ['广州中医药大学', '成都中医药大学', '上海中医药大学', '南京中医药大学', '昆明理工大学', '河南农业大学', '青岛大学', '广西医科大学'];
              const titles = [
                '黄精多糖对{x}信号通路的影响研究',
                '多花黄精在{x}症治疗中的临床观察',
                '滇黄精化学成分及其在{x}方面的生物活性',
                '基于网络药理学探讨黄精干预{x}的作用机制',
                '黄精产业化发展的{x}策略研究',
                '不同产地黄精中{x}含量的比较分析',
                '黄精提取物对{x}损伤的保护作用',
                '药食同源药材黄精在{x}食品开发中的应用',
                '基于{x}组学技术的黄精质量评价研究',
                '黄精有效成分对{x}细胞凋亡的诱导作用'
              ];
              const keywords = ['肠道菌群', '氧化应激', '炎症因子', '骨质疏松', '糖尿病', '免疫功能', '学习记忆', '抗疲劳', '延缓衰老', '肿瘤抑制', '神经保护', '肝脏保护'];

              for (let i = fullData.length; i < 1120; i++) {
                const base = originalSamples[i % originalSamples.length];
                const year = years[Math.floor(Math.random() * years.length)];
                const unit = units[Math.floor(Math.random() * units.length)];
                const keyword = keywords[Math.floor(Math.random() * keywords.length)];
                const titleTemplate = titles[Math.floor(Math.random() * titles.length)];
                
                fullData.push({
                  ...base,
                  id: `full_${i + 1}`,
                  "学位授予年度": year,
                  "学位授予单位": unit,
                  "中文题名": titleTemplate.replace('{x}', keyword),
                  "作者": `研究人员_${i + 1}`,
                  "被引": Math.floor(Math.random() * 50).toString(),
                  "下载": Math.floor(Math.random() * 500).toString()
                });
              }
            }
            await storage.bulkCreate('full_papers', fullData);
            
            // Seed 50 representative papers (Representative Papers should exist independently)
            const featured = fullData.slice(0, 50).map((row: any, i) => ({
               id: String(i + 1),
               title: row['中文题名'] || '',
               year: Number(row['学位授予年度']) || 2025,
               source: row['学位授予单位'] || '',
               category: row['数据库'] || '学术论文',
               significance: row['被引'] ? `该文献被引用 ${row['被引']} 次，具有较高的学术参考价值。` : '由系统自动选取的代表性学术文献。'
            }));
            await storage.bulkCreate('papers', featured);
          }
        }

        // 2. Seed FAQ data
        const faqWithIds = FAQ_DATA.map((item, i) => ({
          id: `faq_${i + 1}`,
          ...item
        }));
        await storage.bulkCreate('faq', faqWithIds);
        
        console.log('Seed completed.');
      } catch (e) {
        console.error('Error seeding demo data:', e);
      }
    })();

    return seedPromise;
  },

  getPapers: async (): Promise<Paper[]> => {
    const storage = getStorage(import.meta.env.VITE_STORAGE_PROVIDER || 'sqljs');
    return await storage.query('papers', {}) as Paper[];
  },
  
  getCategories: async (): Promise<(string | I18nString)[]> => {
    const storage = getStorage(import.meta.env.VITE_STORAGE_PROVIDER || 'sqljs');
    try {
      const results = await storage.query('papers', { rawSql: 'SELECT DISTINCT "category" FROM "papers"' } as any);
      const unique = new Map<string, string | I18nString>();
      
      results.forEach((r: any) => {
        let parsed;
        try {
          parsed = JSON.parse(r.category);
        } catch {
          parsed = r.category;
        }
        
        const zh = typeof parsed === 'string' ? parsed : (parsed.zh || parsed.en || '');
        if (zh && !unique.has(zh)) {
          unique.set(zh, parsed);
        }
      });
      
      return Array.from(unique.values());
    } catch {
      return [];
    }
  },

  getFaqData: async (): Promise<FaqItem[]> => {
    const storage = getStorage(import.meta.env.VITE_STORAGE_PROVIDER || 'sqljs');
    return await storage.query('faq', {}) as FaqItem[];
  },

  getFaqCategories: async (): Promise<(string | I18nString)[]> => {
    const storage = getStorage(import.meta.env.VITE_STORAGE_PROVIDER || 'sqljs');
    try {
      const results = await storage.query('faq', { rawSql: 'SELECT DISTINCT "category" FROM "faq"' } as any);
      const unique = new Map<string, string | I18nString>();
      
      results.forEach((r: any) => {
        let parsed;
        try {
          parsed = JSON.parse(r.category);
        } catch {
          parsed = r.category;
        }
        
        const zh = typeof parsed === 'string' ? parsed : (parsed.zh || parsed.en || '');
        if (zh && !unique.has(zh)) {
          unique.set(zh, parsed);
        }
      });
      
      return Array.from(unique.values());
    } catch {
      return [];
    }
  }
};
