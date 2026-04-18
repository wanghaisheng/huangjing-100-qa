import initSqlJs, { Database } from 'sql.js';
import sqlWasmUrl from 'sql.js/dist/sql-wasm.wasm?url';
import { StorageAdapter } from '../types';

export class SqlJsAdapter<T extends { id: string }, AuthUser = { id: string }> implements StorageAdapter<T, AuthUser> {
  private db: Database | null = null;
  private appId: string | null = null;

  async init() {
    const SQL = await initSqlJs({
      locateFile: () => sqlWasmUrl
    });
    this.db = new SQL.Database();
  }

  setAppId(appId: string): void {
    this.appId = appId;
  }

  private async ensureDb() {
    if (!this.db) await this.init();
    return this.db!;
  }

  async create(collection: string, data: T): Promise<T> {
    const db = await this.ensureDb();
    const dataToWrite = this.appId ? { ...data, appId: this.appId } : data;
    
    // Create table if not exists (simple heuristic based on first row)
    const columnsDef = Object.keys(dataToWrite as object).map(k => k === 'id' ? `"${k}" TEXT PRIMARY KEY` : `"${k}" TEXT`).join(', ');
    db.run(`CREATE TABLE IF NOT EXISTS "${collection}" (${columnsDef})`);

    const columns = Object.keys(dataToWrite as object).map(k => `"${k}"`).join(', ');
    const values = Object.values(dataToWrite as object).map(v => {
      if (typeof v === 'object') return `'${JSON.stringify(v).replace(/'/g, "''")}'`;
      if (typeof v === 'string') return `'${v.replace(/'/g, "''")}'`;
      return v;
    }).join(', ');
    db.run(`INSERT OR REPLACE INTO "${collection}" (${columns}) VALUES (${values})`);
    return data;
  }

  private getAuthorizedWhere = () => {
    return this.appId ? `appId = '${this.appId}'` : '1=1';
  };

  async read(collection: string, id: string): Promise<T | null> {
    const db = await this.ensureDb();
    try {
      const result = db.exec(`SELECT * FROM ${collection} WHERE id = '${id}' AND ${this.getAuthorizedWhere()}`);
      if (result.length === 0) return null;
      
      // Map columns to values
      const columns = result[0].columns;
      const values = result[0].values[0];
      const row: Record<string, unknown> = {};
      columns.forEach((col, i) => {
        try {
          row[col] = JSON.parse(values[i] as string);
        } catch {
          row[col] = values[i];
        }
      });
      return row as unknown as T;
    } catch {
      return null;
    }
  }

  async update(collection: string, id: string, data: Partial<T>): Promise<T> {
    const db = await this.ensureDb();
    const setClause = Object.entries(data).map(([k, v]) => {
      if (typeof v === 'object') return `${k} = '${JSON.stringify(v).replace(/'/g, "''")}'`;
      if (typeof v === 'string') return `${k} = '${v.replace(/'/g, "''")}'`;
      return `${k} = ${v}`;
    }).join(', ');
    db.run(`UPDATE ${collection} SET ${setClause} WHERE id = '${id}' AND ${this.getAuthorizedWhere()}`);
    return this.read(collection, id) as Promise<T>;
  }

  async delete(collection: string, id: string): Promise<void> {
    const db = await this.ensureDb();
    db.run(`DELETE FROM ${collection} WHERE id = '${id}' AND ${this.getAuthorizedWhere()}`);
  }

  async bulkCreate(collection: string, data: T[]): Promise<void> {
    if (!data || data.length === 0) return;
    const db = await this.ensureDb();
    
    // Add appId if configured
    const dataToWrite = this.appId ? data.map(item => ({ ...item, appId: this.appId })) : data;
    
    // Create table based on keys of the first row
    const columnsDef = Object.keys(dataToWrite[0]).map(k => k === 'id' ? `"${k}" TEXT PRIMARY KEY` : `"${k}" TEXT`).join(', ');
    db.run(`CREATE TABLE IF NOT EXISTS "${collection}" (${columnsDef})`);
    
    // Execute bulk insertion in a transaction for performance
    db.run('BEGIN TRANSACTION;');
    
    const columns = Object.keys(dataToWrite[0]).map(k => `"${k}"`).join(', ');
    
    const stmt = db.prepare(`INSERT OR REPLACE INTO "${collection}" (${columns}) VALUES (${Object.keys(dataToWrite[0]).map(() => '?').join(', ')})`);
    for (const row of dataToWrite) {
      const values = Object.values(row).map(v => typeof v === 'object' ? JSON.stringify(v) : String(v));
      stmt.run(values);
    }
    stmt.free();
    
    db.run('COMMIT;');
  }

  async query(collection: string, filter: Record<string, unknown>): Promise<T[]> {
    const db = await this.ensureDb();
    
    if (filter.rawSql) {
      try {
        const result = db.exec(filter.rawSql as string);
        if (result.length === 0) return [];
        
        const columns = result[0].columns;
        return result[0].values.map(values => {
          const row: Record<string, unknown> = {};
          columns.forEach((col, i) => {
            try {
              // Try to parse JSON if it looks like one, otherwise use raw value
              const val = values[i];
              if (typeof val === 'string' && (val.startsWith('{') || val.startsWith('['))) {
                row[col] = JSON.parse(val);
              } else {
                row[col] = val;
              }
            } catch {
              row[col] = values[i];
            }
          });
          return row as unknown as T;
        });
      } catch (e) {
        if (e instanceof Error && e.message.includes('no such table')) {
          return [];
        }
        console.error("SQL query error:", e);
        return [];
      }
    }

    const filterClause = Object.keys(filter).length > 0 
      ? Object.entries(filter).map(([k, v]) => `${k} = ${typeof v === 'string' ? `'${v}'` : v}`).join(' AND ')
      : '1=1';
    
    // Only combine with AND if we have a valid filter clause
    const whereClause = `${filterClause} AND ${this.getAuthorizedWhere()}`;
    
    try {
      const result = db.exec(`SELECT * FROM ${collection} WHERE ${whereClause}`);
      if (result.length === 0) return [];
      
      // Map columns to values
      const columns = result[0].columns;
      return result[0].values.map(values => {
        const row: Record<string, unknown> = {};
        columns.forEach((col, i) => {
          try {
            row[col] = JSON.parse(values[i] as string);
          } catch {
            row[col] = values[i];
          }
        });
        return row as unknown as T;
      });
    } catch (e) {
      // If table doesn't exist yet, just return empty instead of crashing
      if (e instanceof Error && e.message.includes('no such table')) {
        return [];
      }
      console.error(`Error querying collection ${collection}:`, e);
      return [];
    }
  }

  async signIn(credentials: Record<string, unknown>): Promise<AuthUser> {
    // SqlJs doesn't have built-in auth, mock it
    return { id: 'mock-user' } as unknown as AuthUser;
  }

  async signOut(): Promise<void> {
    // No-op
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    return { id: 'mock-user' } as unknown as AuthUser;
  }
}
