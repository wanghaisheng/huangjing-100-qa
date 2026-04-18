import * as duckdb from '@duckdb/duckdb-wasm';
import duckdb_wasm from '@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url';
import mvp_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url';
import duckdb_wasm_eh from '@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url';
import eh_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url';

const DUCKDB_BUNDLES: duckdb.DuckDBBundles = {
    mvp: {
        mainModule: duckdb_wasm,
        mainWorker: mvp_worker,
    },
    eh: {
        mainModule: duckdb_wasm_eh,
        mainWorker: eh_worker,
    },
};

let db: duckdb.AsyncDuckDB | null = null;
let conn: duckdb.AsyncDuckDBConnection | null = null;
let initPromise: Promise<void> | null = null;
const loadedTables = new Set<string>();
const loadingPromises = new Map<string, Promise<void>>();

export const DuckDBService = {
  init: async () => {
    if (initPromise) return initPromise;

    initPromise = (async () => {
      try {
        console.log('Starting DuckDB initialization...');
        
        const bundle = DUCKDB_BUNDLES.mvp;
        console.log('Bundle forced to:', bundle);
        
        const worker = new Worker(bundle.mainWorker!);
        
        const logger = new duckdb.ConsoleLogger();
        db = new duckdb.AsyncDuckDB(logger, worker);
        // CRITICAL: instantiate with ONLY module to disable EH/pthread/SharedArrayBuffer requirements
        await db.instantiate(bundle.mainModule);
        conn = await db.connect();
        
        console.log('DuckDB Initialized successfully');
      } catch (error) {
        initPromise = null; // Allow retry on failure
        console.error('DuckDB Initialization failed:', error);
        throw error;
      }
    })();

    return initPromise;
  },

  loadData: async (tableName: string, data: any[]) => {
    if (loadedTables.has(tableName)) return;
    if (loadingPromises.has(tableName)) return loadingPromises.get(tableName);

    const promise = (async () => {
      await DuckDBService.init();
      if (!db || !conn) throw new Error('DuckDB not initialized');

      try {
        // Drop table if it exists to avoid "Table already exists" error
        await conn.query(`DROP TABLE IF EXISTS ${tableName}`);

        // Convert data to JSON and load into DuckDB
        const jsonStr = JSON.stringify(data);
        await db.registerFileText(`${tableName}.json`, jsonStr);
        await conn.insertJSONFromPath(`${tableName}.json`, { name: tableName });
        loadedTables.add(tableName);
        console.log(`Data loaded into table: ${tableName}`);
      } catch (e) {
        console.error(`Error loading data into ${tableName}:`, e);
      } finally {
        loadingPromises.delete(tableName);
      }
    })();
    
    loadingPromises.set(tableName, promise);
    return promise;
  },

  loadCSV: async (tableName: string, csvPath: string) => {
    await DuckDBService.init();
    if (!conn) throw new Error('DuckDB not initialized');

    // Fetch the CSV file from the local path
    const response = await fetch(csvPath);
    const csvText = await response.text();
    
    await DuckDBService.loadCSVText(tableName, csvText);
  },

  loadCSVText: async (tableName: string, csvText: string) => {
    if (loadedTables.has(tableName)) return;
    if (loadingPromises.has(tableName)) return loadingPromises.get(tableName);

    const promise = (async () => {
      await DuckDBService.init();
      if (!db || !conn) throw new Error('DuckDB not initialized');

      try {
        await db.registerFileText(`${tableName}.csv`, csvText);
        
        // Use read_csv_auto to create the table
        await conn.query(`CREATE TABLE IF NOT EXISTS ${tableName} AS SELECT * FROM read_csv_auto('${tableName}.csv')`);
        loadedTables.add(tableName);
        console.log(`CSV text loaded into table: ${tableName}`);
      } catch (e) {
        console.error(`Error loading CSV text into ${tableName}:`, e);
      } finally {
        loadingPromises.delete(tableName);
      }
    })();

    loadingPromises.set(tableName, promise);
    return promise;
  },

  query: async (sql: string) => {
    await DuckDBService.init();
    if (!conn) throw new Error('DuckDB not initialized');

    const result = await conn.query(sql);
    return result.toArray().map((row) => row.toJSON());
  }
};
