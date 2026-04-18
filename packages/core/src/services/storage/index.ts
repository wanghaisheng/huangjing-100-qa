import { StorageAdapter } from '../../types';
import { SupabaseAdapter } from '../../adapters/SupabaseAdapter';
import { SqlJsAdapter } from '../../adapters/SqlJsAdapter';
import { DuckDBAdapter } from '../../adapters/DuckDBAdapter';

// Assuming config is passed or handled via environment variables differently in the future
// For now, simple factory.
let adapter: StorageAdapter | null = null;
let duckdbAdapter: StorageAdapter | null = null;

export const getStorage = (provider: 'supabase' | 'sqljs' | 'duckdb'): StorageAdapter => {
  if (provider === 'duckdb') {
    if (!duckdbAdapter) {
      duckdbAdapter = new DuckDBAdapter();
    }
    return duckdbAdapter;
  }

  if (!adapter) {
    const forcedProvider = import.meta.env.VITE_STORAGE_PROVIDER || provider;
    switch (forcedProvider) {
      case 'supabase':
        adapter = new SupabaseAdapter();
        break;
      case 'sqljs':
        adapter = new SqlJsAdapter();
        break;
      default:
        // Defaulting to sqljs if configuration is ambiguous
        adapter = new SqlJsAdapter();
    }
  }
  return adapter;
};
