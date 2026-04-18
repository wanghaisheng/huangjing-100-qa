import { StorageAdapter } from '../types';
import { DuckDBService } from '../services/duckdb/duckdbService';

export class DuckDBAdapter<T extends { id: string }> implements StorageAdapter<T, any> {
  private appId: string | null = null;
  
  constructor() {}

  setAppId(appId: string): void {
    this.appId = appId;
  }

  async create(collection: string, data: T): Promise<T> {
    throw new Error('Create not implemented for DuckDBAdapter - use CRUD adapter for persistence');
  }

  async read(collection: string, id: string): Promise<T | null> {
    throw new Error('Read not implemented for DuckDBAdapter - use CRUD adapter for persistence');
  }

  async update(collection: string, id: string, data: Partial<T>): Promise<T> {
    throw new Error('Update not implemented for DuckDBAdapter - use CRUD adapter for persistence');
  }

  async delete(collection: string, id: string): Promise<void> {
    throw new Error('Delete not implemented for DuckDBAdapter - use CRUD adapter for persistence');
  }

  async query(collection: string, filter: Record<string, unknown>): Promise<T[]> {
    if (filter.rawSql) {
      return await DuckDBService.query(filter.rawSql as string) as T[];
    }
    
    // Default collection based query
    return await DuckDBService.query(`SELECT * FROM ${collection}`) as T[];
  }

  // Auth is not applicable for a local query engine
  async signIn(credentials: Record<string, unknown>): Promise<any> { throw new Error('Not supported'); }
  async signOut(): Promise<void> {}
  async getCurrentUser(): Promise<any> { return null; }
}
