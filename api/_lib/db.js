import pg from 'pg';
import dotenv from 'dotenv';
import { MASTER_ADDITIVES, DEMO_BUSINESSES, SAFETY_ALERTS, STATE_CODES } from './data.js';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
export const isPostgres = Boolean(DATABASE_URL && DATABASE_URL.startsWith('postgres'));

let pgPool = null;

if (isPostgres) {
  try {
    pgPool = new pg.Pool({
      connectionString: DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' || DATABASE_URL.includes('supabase') || DATABASE_URL.includes('neon.tech')
        ? { rejectUnauthorized: false }
        : false
    });
    pgPool.on('error', (err) => {
      console.error('Postgres Pool Error in Serverless Runtime:', err.message);
    });
  } catch (e) {
    console.error('Failed to initialize Postgres pool:', e);
  }
}

// In-Memory fallback store for serverless environments without DATABASE_URL
const memoryStore = {
  additives: [...MASTER_ADDITIVES],
  businesses: [...DEMO_BUSINESSES],
  alerts: [...SAFETY_ALERTS],
  scans: [],
  reports: [
    {
      id: 'REP-1709923841',
      tracking_number: 'FV-IN-2026-894120',
      product_name: 'PureHarvest Mustard Oil',
      brand: 'Fresh Farms Daily',
      category: 'Oils & Fats',
      fssai_license: '20818005000421',
      batch_number: 'LOT-MG-09',
      store_name: 'City Supermarket, Sector 14',
      city: 'Gurugram',
      description: 'Pungent discoloration and chemical solvent smell observed upon unsealing.',
      health_impact: 'Immediate throat irritation and nausea reported after trial use.',
      status: 'Investigation in Progress',
      status_step: 2,
      evidence_count: 2,
      created_at: new Date(Date.now() - 86400000 * 2).toISOString()
    }
  ],
  evidence: [
    {
      id: 'EVD-1709923841-0',
      report_id: 'REP-1709923841',
      file_name: 'Retail_Tax_Invoice_4412.pdf',
      file_type: 'Tax Invoice',
      file_size: '1.2 MB',
      storage_path: '/uploads/Retail_Tax_Invoice_4412.pdf',
      created_at: new Date(Date.now() - 86400000 * 2).toISOString()
    }
  ]
};

export const query = async (sql, params = []) => {
  if (isPostgres && pgPool) {
    let pgSql = sql;
    let paramIndex = 1;
    pgSql = pgSql.replace(/\?/g, () => `$${paramIndex++}`);
    const res = await pgPool.query(pgSql, params);
    return res.rows;
  }
  return [];
};

export const get = async (sql, params = []) => {
  if (isPostgres && pgPool) {
    let pgSql = sql;
    let paramIndex = 1;
    pgSql = pgSql.replace(/\?/g, () => `$${paramIndex++}`);
    const res = await pgPool.query(pgSql, params);
    return res.rows[0] || null;
  }
  return null;
};

export const run = async (sql, params = []) => {
  if (isPostgres && pgPool) {
    let pgSql = sql;
    let paramIndex = 1;
    pgSql = pgSql.replace(/\?/g, () => `$${paramIndex++}`);
    if (pgSql.includes('INSERT OR REPLACE INTO')) {
      pgSql = pgSql.replace('INSERT OR REPLACE INTO', 'INSERT INTO');
    }
    const res = await pgPool.query(pgSql, params);
    return { id: res.rows[0]?.id || null, rowCount: res.rowCount };
  }
  return { id: null, rowCount: 1 };
};

export const store = memoryStore;

export default { query, get, run, store, isPostgres };
