import initSqlJs, { Database } from 'sql.js';
import { StorageAdapter } from '../types';

export class SqlJsAdapter<T extends { id: string }, AuthUser = { id: string }> implements StorageAdapter<T, AuthUser> {
  private db: Database | null = null;

  async init() {
    const SQL = await initSqlJs({
      locateFile: (file) => `https://sql.js.org/dist/${file}`
    });
    this.db = new SQL.Database();
  }

  private async ensureDb() {
    if (!this.db) await this.init();
    return this.db!;
  }

  async create(collection: string, data: T): Promise<T> {
    const db = await this.ensureDb();
    
    // Create table if not exists (simple heuristic based on first row)
    const columnsDef = Object.keys(data as object).map(k => `${k} TEXT`).join(', ');
    db.run(`CREATE TABLE IF NOT EXISTS ${collection} (${columnsDef})`);

    const columns = Object.keys(data as object).join(', ');
    const values = Object.values(data as object).map(v => {
      if (typeof v === 'object') return `'${JSON.stringify(v).replace(/'/g, "''")}'`;
      if (typeof v === 'string') return `'${v.replace(/'/g, "''")}'`;
      return v;
    }).join(', ');
    db.run(`INSERT INTO ${collection} (${columns}) VALUES (${values})`);
    return data;
  }

  async read(collection: string, id: string): Promise<T | null> {
    const db = await this.ensureDb();
    try {
      const result = db.exec(`SELECT * FROM ${collection} WHERE id = '${id}'`);
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
    db.run(`UPDATE ${collection} SET ${setClause} WHERE id = '${id}'`);
    return this.read(collection, id) as Promise<T>;
  }

  async delete(collection: string, id: string): Promise<void> {
    const db = await this.ensureDb();
    db.run(`DELETE FROM ${collection} WHERE id = '${id}'`);
  }

  async query(collection: string, filter: Record<string, unknown>): Promise<T[]> {
    const db = await this.ensureDb();
    const whereClause = Object.entries(filter).map(([k, v]) => `${k} = ${typeof v === 'string' ? `'${v}'` : v}`).join(' AND ');
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
