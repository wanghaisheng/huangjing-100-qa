export interface StorageAdapter {
  // CRUD
  create(collection: string, data: any): Promise<any>;
  read(collection: string, id: string): Promise<any>;
  update(collection: string, id: string, data: any): Promise<any>;
  delete(collection: string, id: string): Promise<void>;
  
  // Query
  query(collection: string, filter: any): Promise<any[]>;
  
  // Auth
  signIn(credentials: any): Promise<any>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<any>;
}
