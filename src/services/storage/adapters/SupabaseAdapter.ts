import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { StorageAdapter } from '../types';

export class SupabaseAdapter<T extends { id: string }> implements StorageAdapter<T, User> {
  private client: SupabaseClient;

  constructor() {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase configuration is missing');
    }

    this.client = createClient(supabaseUrl, supabaseKey);
  }

  async create(collection: string, data: T): Promise<T> {
    const { data: result, error } = await this.client.from(collection).insert(data).select().single();
    if (error) throw error;
    return result as T;
  }

  async read(collection: string, id: string): Promise<T | null> {
    const { data, error } = await this.client.from(collection).select('*').eq('id', id).single();
    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    return data as T;
  }

  async update(collection: string, id: string, data: Partial<T>): Promise<T> {
    const { data: result, error } = await this.client.from(collection).update(data as any).eq('id', id).select().single();
    if (error) throw error;
    return result as T;
  }

  async delete(collection: string, id: string): Promise<void> {
    const { error } = await this.client.from(collection).delete().eq('id', id);
    if (error) throw error;
  }

  async query(collection: string, filter: Record<string, unknown>): Promise<T[]> {
    let query = this.client.from(collection).select('*');
    // Basic filter implementation
    for (const [key, value] of Object.entries(filter)) {
      query = query.eq(key, value);
    }
    const { data, error } = await query;
    if (error) throw error;
    return (data as T[]) || [];
  }

  async signIn(credentials: Record<string, unknown>): Promise<User> {
    const { data, error } = await this.client.auth.signInWithPassword({
      email: credentials.email as string,
      password: credentials.password as string,
    });
    if (error) throw error;
    return data.user;
  }

  async signOut(): Promise<void> {
    const { error } = await this.client.auth.signOut();
    if (error) throw error;
  }

  async getCurrentUser(): Promise<User | null> {
    const { data: { user }, error } = await this.client.auth.getUser();
    if (error) throw error;
    return user;
  }
}
