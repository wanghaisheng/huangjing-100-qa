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

export interface StorageAdapter<T = unknown, AuthUser = unknown> {
  // Set app context for subsequent operations
  setAppId(appId: string): void;

  // CRUD
  create(collection: string, data: T): Promise<T>;
  read(collection: string, id: string): Promise<T | null>;
  update(collection: string, id: string, data: Partial<T>): Promise<T>;
  delete(collection: string, id: string): Promise<void>;
  
  // Query
  query(collection: string, filter: Record<string, unknown>): Promise<T[]>;
  
  // Bulk operations
  bulkCreate?(collection: string, data: T[]): Promise<void>;
  
  // Auth
  signIn(credentials: Record<string, unknown>): Promise<AuthUser>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<AuthUser | null>;
}
