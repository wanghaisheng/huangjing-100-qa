import { StorageAdapter } from './types';
import { SupabaseAdapter } from './adapters/SupabaseAdapter';
import { SqlJsAdapter } from './adapters/SqlJsAdapter';
import { APP_CONFIG } from '../../constants/config';

let adapter: StorageAdapter | null = null;

export const getStorage = (): StorageAdapter => {
  if (!adapter) {
    switch (APP_CONFIG.STORAGE_PROVIDER) {
      case 'supabase':
        adapter = new SupabaseAdapter();
        break;
      case 'sqljs':
        adapter = new SqlJsAdapter();
        break;
      default:
        throw new Error(`Unknown storage provider: ${APP_CONFIG.STORAGE_PROVIDER}`);
    }
  }
  return adapter;
};
