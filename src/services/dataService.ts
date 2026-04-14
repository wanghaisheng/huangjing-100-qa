import { PAPERS, CATEGORIES } from '../data/papers';
import { FAQ_DATA } from '../data/faq';

export interface I18nString {
  zh: string;
  en: string;
}

export interface Paper {
  id: number;
  title: string | I18nString;
  year: number;
  source: string | I18nString;
  category: string | I18nString;
  significance: string | I18nString;
}

export interface FaqItem {
  question: string | I18nString;
  answer: string | I18nString;
  category: string | I18nString;
}

export const DataService = {
  getPapers: (): Paper[] => {
    // In a real Astro app, this might be a fetch call or file system read
    return PAPERS as any;
  },
  getCategories: (): (string | I18nString)[] => {
    return CATEGORIES as any;
  },
  getFaqData: (): FaqItem[] => {
    return FAQ_DATA as any;
  },
  getFaqCategories: (): string[] => {
    return Array.from(new Set(FAQ_DATA.map(item => typeof item.category === 'string' ? item.category : (item.category as any).zh)));
  }
};
