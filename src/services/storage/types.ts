export interface StorageAdapter<T = unknown, AuthUser = unknown> {
  // CRUD
  create(collection: string, data: T): Promise<T>;
  read(collection: string, id: string): Promise<T | null>;
  update(collection: string, id: string, data: Partial<T>): Promise<T>;
  delete(collection: string, id: string): Promise<void>;
  
  // Query
  query(collection: string, filter: Record<string, unknown>): Promise<T[]>;
  
  // Auth
  signIn(credentials: Record<string, unknown>): Promise<AuthUser>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<AuthUser | null>;
}
