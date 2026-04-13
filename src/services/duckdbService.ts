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

export const DuckDBService = {
  init: async () => {
    if (initPromise) return initPromise;

    initPromise = (async () => {
      try {
        console.log('Starting DuckDB initialization...');
        const bundle = await duckdb.selectBundle(DUCKDB_BUNDLES);
        console.log('Bundle selected:', bundle);
        
        // Use the worker URL directly if possible, or handle worker creation differently
        const worker = new Worker(bundle.mainWorker!);
        
        const logger = new duckdb.ConsoleLogger();
        db = new duckdb.AsyncDuckDB(logger, worker);
        await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
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
    await DuckDBService.init();
    if (!db || !conn) throw new Error('DuckDB not initialized');

    // Convert data to JSON and load into DuckDB
    const jsonStr = JSON.stringify(data);
    await db.registerFileText(`${tableName}.json`, jsonStr);
    await conn.insertJSONFromPath(`${tableName}.json`, { name: tableName });
    console.log(`Data loaded into table: ${tableName}`);
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
    await DuckDBService.init();
    if (!db || !conn) throw new Error('DuckDB not initialized');

    await db.registerFileText(`${tableName}.csv`, csvText);
    
    // Use read_csv_auto to create the table
    await conn.query(`CREATE TABLE IF NOT EXISTS ${tableName} AS SELECT * FROM read_csv_auto('${tableName}.csv')`);
    console.log(`CSV text loaded into table: ${tableName}`);
  },

  query: async (sql: string) => {
    await DuckDBService.init();
    if (!conn) throw new Error('DuckDB not initialized');

    const result = await conn.query(sql);
    return result.toArray().map((row) => row.toJSON());
  }
};
