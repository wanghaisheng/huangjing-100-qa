import initSqlJs, { Database } from 'sql.js';
import { StorageAdapter } from '../types';

export class SqlJsAdapter implements StorageAdapter {
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

  async create(collection: string, data: any) {
    const db = await this.ensureDb();
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data).map(v => typeof v === 'string' ? `'${v}'` : v).join(', ');
    db.run(`INSERT INTO ${collection} (${columns}) VALUES (${values})`);
    return data;
  }

  async read(collection: string, id: string) {
    const db = await this.ensureDb();
    const result = db.exec(`SELECT * FROM ${collection} WHERE id = '${id}'`);
    if (result.length === 0) return null;
    return result[0].values[0];
  }

  async update(collection: string, id: string, data: any) {
    const db = await this.ensureDb();
    const setClause = Object.entries(data).map(([k, v]) => `${k} = ${typeof v === 'string' ? `'${v}'` : v}`).join(', ');
    db.run(`UPDATE ${collection} SET ${setClause} WHERE id = '${id}'`);
    return data;
  }

  async delete(collection: string, id: string) {
    const db = await this.ensureDb();
    db.run(`DELETE FROM ${collection} WHERE id = '${id}'`);
  }

  async query(collection: string, filter: any) {
    const db = await this.ensureDb();
    const whereClause = Object.entries(filter).map(([k, v]) => `${k} = ${typeof v === 'string' ? `'${v}'` : v}`).join(' AND ');
    const result = db.exec(`SELECT * FROM ${collection} WHERE ${whereClause}`);
    if (result.length === 0) return [];
    return result[0].values;
  }

  async signIn(credentials: any) {
    // SqlJs doesn't have built-in auth, mock it
    return { user: { id: 'mock-user' } };
  }

  async signOut() {
    // No-op
  }

  async getCurrentUser() {
    return { id: 'mock-user' };
  }
}
