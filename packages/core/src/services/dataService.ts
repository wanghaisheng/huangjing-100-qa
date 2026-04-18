import { Paper, FaqItem, I18nString } from '../types';
import { getStorage } from './storage';
import Papa from 'papaparse';

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
        const existing = await storage.query('full_papers', { rawSql: 'SELECT COUNT(*) as c FROM full_papers' } as any);
        if (existing && existing.length > 0 && (existing[0] as any).c > 0) return;
      } catch {
        // Table doesn't exist, proceed to seed
      }

      try {
        console.log('Seeding demo data from huangjing.csv...');
        const response = await fetch('/huangjing.csv');
        if (!response.ok) return; // Skip if no demo file
        
        const csvText = await response.text();
        
        // We parse the csv with PapaParse
        const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
        if (parsed.data && parsed.data.length > 0) {
          
          // 1. Seed full database - Ensure each row has a unique ID for SQL.js PRIMARY KEY
          const fullData = (parsed.data as any[]).map((row, i) => ({
            id: `full_${i + 1}`,
            ...row
          }));
          await storage.bulkCreate('full_papers', fullData);
          
          // 2. Generate and seed 10 featured papers for home page
          const featured = parsed.data.slice(0, 10).map((row: any, i) => ({
             id: String(i + 1),
             title: row['中文题名'] || '',
             year: Number(row['学位授予年度']) || 2025,
             source: row['学位授予单位'] || '',
             category: row['数据库'] || '学术论文',
             significance: row['标签'] || ''
          }));
          await storage.bulkCreate('papers', featured);
          
          console.log('Seed completed.');
        }
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
    // For now, return empty or mock as we need to figure out where categories are stored
    // If they were part of PAPERS, we need to query and extract.
    // For this migration, returning a placeholder or empty list is safer than crashing
    return [];
  },

  getFaqData: async (): Promise<FaqItem[]> => {
    const storage = getStorage(import.meta.env.VITE_STORAGE_PROVIDER || 'sqljs');
    return await storage.query('faq', {}) as FaqItem[];
  },

  getFaqCategories: async (): Promise<(string | I18nString)[]> => {
    // Similar to getCategories, return placeholder for now
    return [];
  }
};
