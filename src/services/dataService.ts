import { PAPERS, CATEGORIES } from '../data/papers';
import { FAQ_DATA } from '../data/faq';

export interface Paper {
  id: number;
  title: string;
  year: number;
  source: string;
  category: string;
  significance: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const DataService = {
  getPapers: (): Paper[] => {
    // In a real Astro app, this might be a fetch call or file system read
    return PAPERS;
  },
  getCategories: (): string[] => {
    return CATEGORIES;
  },
  getFaqData: (): FaqItem[] => {
    return FAQ_DATA;
  },
  getFaqCategories: (): string[] => {
    return Array.from(new Set(FAQ_DATA.map(item => item.category)));
  }
};
