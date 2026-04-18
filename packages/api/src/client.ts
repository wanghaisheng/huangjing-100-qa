import { DataService, Paper, FaqItem, I18nString, getStorage } from '@heytcm/core';

export const apiClient = {
  papers: {
    list: async (): Promise<Paper[]> => {
      return await DataService.getPapers();
    },
    getCategories: async (): Promise<(string | I18nString)[]> => {
      return await DataService.getCategories();
    }
  },
  faq: {
    list: async (): Promise<FaqItem[]> => {
      return await DataService.getFaqData();
    },
    getCategories: async (): Promise<(string | I18nString)[]> => {
      return await DataService.getFaqCategories();
    }
  },
  fullDatabase: {
    search: async (searchQuery: string, page: number, itemsPerPage: number = 20, sortColumn?: string, sortDirection: 'ASC' | 'DESC' = 'ASC') => {
      const storage = getStorage(import.meta.env.VITE_STORAGE_PROVIDER as any || 'sqljs'); // Unified access via default adapter
      
      // SQL.js format mapping
      const whereClause = searchQuery ? `WHERE "中文题名" LIKE '%${searchQuery}%' OR "作者" LIKE '%${searchQuery}%' OR "学位授予单位" LIKE '%${searchQuery}%'` : '';
      const orderClause = sortColumn ? `ORDER BY "${sortColumn}" ${sortDirection}` : '';
      
      const countQuery = `SELECT COUNT(*) as count FROM full_papers ${whereClause}`;
      
      const countResult = await storage.query('full_papers', { rawSql: countQuery } as any);
      const total = countResult.length > 0 ? Number((countResult[0] as any)?.count || 0) : 0;

      const offset = (page - 1) * itemsPerPage;
      const query = `SELECT * FROM full_papers ${whereClause} ${orderClause} LIMIT ${itemsPerPage} OFFSET ${offset}`;
      
      const results = await storage.query('full_papers', { rawSql: query } as any);

      return {
        results,
        total
      };
    }
  }
};
