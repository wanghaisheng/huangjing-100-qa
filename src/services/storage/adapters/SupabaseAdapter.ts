import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { StorageAdapter } from '../types';

export class SupabaseAdapter implements StorageAdapter {
  private client: SupabaseClient;

  constructor() {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase configuration is missing');
    }

    this.client = createClient(supabaseUrl, supabaseKey);
  }

  async create(collection: string, data: any) {
    const { data: result, error } = await this.client.from(collection).insert(data).single();
    if (error) throw error;
    return result;
  }

  async read(collection: string, id: string) {
    const { data, error } = await this.client.from(collection).select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  async update(collection: string, id: string, data: any) {
    const { data: result, error } = await this.client.from(collection).update(data).eq('id', id).single();
    if (error) throw error;
    return result;
  }

  async delete(collection: string, id: string) {
    const { error } = await this.client.from(collection).delete().eq('id', id);
    if (error) throw error;
  }

  async query(collection: string, filter: any) {
    let query = this.client.from(collection).select('*');
    // Basic filter implementation
    for (const [key, value] of Object.entries(filter)) {
      query = query.eq(key, value);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  async signIn(credentials: any) {
    const { data, error } = await this.client.auth.signInWithPassword(credentials);
    if (error) throw error;
    return data;
  }

  async signOut() {
    const { error } = await this.client.auth.signOut();
    if (error) throw error;
  }

  async getCurrentUser() {
    const { data: { user }, error } = await this.client.auth.getUser();
    if (error) throw error;
    return user;
  }
}
