import sqlite3 from 'sqlite3';
import pg from 'pg';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATABASE_URL = process.env.DATABASE_URL;
let isPostgres = Boolean(DATABASE_URL && DATABASE_URL.startsWith('postgres'));

let pgPool = null;
let sqliteDb = null;

if (isPostgres) {
  console.log('Connecting to PostgreSQL / Supabase Database via DATABASE_URL...');
  pgPool = new pg.Pool({
    connectionString: DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' || DATABASE_URL.includes('supabase') || DATABASE_URL.includes('neon.tech') 
      ? { rejectUnauthorized: false } 
      : false
  });

  pgPool.on('connect', () => {
    console.log('✅ Connected to Cloud PostgreSQL Database!');
  });
  pgPool.on('error', (err) => {
    console.error('PostgreSQL Pool Error:', err.message);
  });
} else {
  const dataDir = path.join(__dirname, '../../data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const dbPath = path.join(dataDir, 'foodvigil.sqlite');
  sqliteDb = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error connecting to SQLite database:', err.message);
    } else {
      console.log('✅ Connected to FoodVigil SQLite Database at:', dbPath);
    }
  });
}

// Unified Query Helper for both PostgreSQL and SQLite
export const query = async (sql, params = []) => {
  if (isPostgres && pgPool) {
    // Convert '?' placeholders to '$1, $2, $3' for Postgres
    let pgSql = sql;
    let paramIndex = 1;
    pgSql = pgSql.replace(/\?/g, () => `$${paramIndex++}`);
    const res = await pgPool.query(pgSql, params);
    return res.rows;
  } else {
    return new Promise((resolve, reject) => {
      sqliteDb.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
};

export const get = async (sql, params = []) => {
  if (isPostgres && pgPool) {
    let pgSql = sql;
    let paramIndex = 1;
    pgSql = pgSql.replace(/\?/g, () => `$${paramIndex++}`);
    const res = await pgPool.query(pgSql, params);
    return res.rows[0] || null;
  } else {
    return new Promise((resolve, reject) => {
      sqliteDb.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }
};

export const run = async (sql, params = []) => {
  if (isPostgres && pgPool) {
    let pgSql = sql;
    let paramIndex = 1;
    pgSql = pgSql.replace(/\?/g, () => `$${paramIndex++}`);
    // Replace SQLite specific INSERT OR REPLACE with standard Postgres syntax
    if (pgSql.includes('INSERT OR REPLACE INTO')) {
      pgSql = pgSql.replace('INSERT OR REPLACE INTO', 'INSERT INTO');
      // Append ON CONFLICT DO UPDATE if needed
    }
    const res = await pgPool.query(pgSql, params);
    return { id: res.rows[0]?.id || null, rowCount: res.rowCount };
  } else {
    return new Promise((resolve, reject) => {
      sqliteDb.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, changes: this.changes });
      });
    });
  }
};

// Database Initializer & Migration Runner
export async function initializeDatabase() {
  const schemaSql = `
    CREATE TABLE IF NOT EXISTS food_additives (
      code TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      purpose TEXT NOT NULL,
      category TEXT NOT NULL,
      simple_explanation TEXT NOT NULL,
      fact TEXT NOT NULL,
      ai_interpretation TEXT NOT NULL,
      consumer_note TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS fssai_businesses (
      license_number TEXT PRIMARY KEY,
      business_name TEXT NOT NULL,
      brand_name TEXT NOT NULL,
      premises_address TEXT NOT NULL,
      category TEXT NOT NULL,
      status TEXT NOT NULL,
      status_code TEXT NOT NULL,
      issue_date TEXT,
      valid_upto TEXT,
      hygiene_rating INTEGER DEFAULT 4,
      inspection_grade TEXT,
      is_demo_data INTEGER DEFAULT 1,
      public_notices_json TEXT
    );

    CREATE TABLE IF NOT EXISTS safety_alerts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      severity TEXT NOT NULL,
      date_issued TEXT NOT NULL,
      region TEXT NOT NULL,
      product TEXT NOT NULL,
      manufacturer TEXT NOT NULL,
      reason TEXT NOT NULL,
      source TEXT NOT NULL,
      action_required TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS scanned_products (
      id TEXT PRIMARY KEY,
      product_name TEXT NOT NULL,
      brand TEXT NOT NULL,
      category TEXT NOT NULL,
      status TEXT NOT NULL,
      status_label TEXT NOT NULL,
      ingredients_json TEXT NOT NULL,
      detected_additives_json TEXT NOT NULL,
      allergens_json TEXT NOT NULL,
      nutrition_json TEXT NOT NULL,
      license_number TEXT,
      fssai_status TEXT,
      manufacturer_info TEXT,
      batch_number TEXT,
      expiry_date TEXT,
      label_completeness INTEGER DEFAULT 85,
      observations_json TEXT,
      attention_items_json TEXT,
      explanation TEXT,
      confidence INTEGER DEFAULT 95,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS reports (
      id TEXT PRIMARY KEY,
      tracking_number TEXT UNIQUE NOT NULL,
      product_name TEXT NOT NULL,
      brand TEXT NOT NULL,
      category TEXT NOT NULL,
      fssai_license TEXT,
      batch_number TEXT NOT NULL,
      store_name TEXT NOT NULL,
      city TEXT NOT NULL,
      description TEXT NOT NULL,
      health_impact TEXT,
      status TEXT DEFAULT 'Submitted',
      status_step INTEGER DEFAULT 1,
      evidence_count INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS evidence (
      id TEXT PRIMARY KEY,
      report_id TEXT,
      file_name TEXT NOT NULL,
      file_type TEXT NOT NULL,
      file_size TEXT NOT NULL,
      storage_path TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `;

  if (isPostgres && pgPool) {
    await pgPool.query(schemaSql);
  } else if (sqliteDb) {
    sqliteDb.exec(schemaSql, (err) => {
      if (err) console.error('SQLite schema creation error:', err);
    });
  }

  seedMasterData();
}

async function seedMasterData() {
  try {
    const count = await get('SELECT COUNT(*) as count FROM food_additives');
    if (count && (Number(count.count) > 0)) return;

    console.log('Seeding Master INS Knowledge Base & FSSAI Data into Database...');

    const additives = [
      {
        code: '621',
        name: 'Monosodium Glutamate (MSG)',
        purpose: 'Flavour Enhancer',
        category: 'Attention',
        simple_explanation: 'Used to provide a savoury "umami" taste in savory foods, noodles, and snacks.',
        fact: 'Sodium salt of glutamic acid, an amino acid naturally present in tomatoes, aged cheeses, and mushrooms.',
        ai_interpretation: 'Commonly added to processed snacks to enhance palatability. Regulated by FSSAI within standard limits.',
        consumer_note: 'Individuals with reported sensitivities may prefer to monitor intake. Not recommended in infant formulations under 12 months.'
      },
      {
        code: '102',
        name: 'Tartrazine (FD&C Yellow 5)',
        purpose: 'Synthetic Food Colour',
        category: 'High attention',
        simple_explanation: 'A synthetic lemon-yellow dye added to give bright visual appeal to drinks, confectioneries, and snacks.',
        fact: 'Synthetic azo dye derived from petroleum hydrocarbons.',
        ai_interpretation: 'European regulatory authorities (EFSA) require warning notices regarding potential hyperactivity in sensitive children. Permitted in India under quantitative caps.',
        consumer_note: 'Individuals with aspirin intolerance or asthma may experience sensitivities. Frequent consumption by young children is not advised.'
      },
      {
        code: '110',
        name: 'Sunset Yellow FCF',
        purpose: 'Synthetic Food Colour',
        category: 'High attention',
        simple_explanation: 'An orange-red artificial dye used in desserts, squashes, and namkeen.',
        fact: 'Synthetic petroleum-derived colouring agent.',
        ai_interpretation: 'Permitted in select processed food categories in India with mandatory front/back declaration.',
        consumer_note: 'Check for natural alternative colorants (like turmeric, paprika, or beta-carotene) if seeking uncoloured alternatives.'
      },
      {
        code: '211',
        name: 'Sodium Benzoate',
        purpose: 'Preservative',
        category: 'High attention',
        simple_explanation: 'Prevents the growth of yeast, bacteria, and mold in acidic beverages and condiments.',
        fact: 'Sodium salt of benzoic acid.',
        ai_interpretation: 'Highly effective preservative. Should not be formulated with high levels of ascorbic acid (Vitamin C) under high heat/light due to trace benzene formation risk.',
        consumer_note: 'Provides shelf-stability in ketchups and juices. Best consumed fresh from whole sources where possible.'
      },
      {
        code: '319',
        name: 'Tertiary Butylhydroquinone (TBHQ)',
        purpose: 'Synthetic Antioxidant',
        category: 'High attention',
        simple_explanation: 'Slows down fat rancidity and oxidation in vegetable oils and fried snack foods.',
        fact: 'Petrochemical antioxidant with strict regulatory maximum limits (200 mg/kg under FSSAI regulations).',
        ai_interpretation: 'Added to extend the shelf life of packaged fried snacks.',
        consumer_note: 'Look for fresh unoxidized cold-pressed or minimal-preservative options for daily kitchen cooking.'
      },
      {
        code: '322',
        name: 'Lecithin (Soy / Sunflower)',
        purpose: 'Emulsifier',
        category: 'Informational',
        simple_explanation: 'Helps mix oil and water smoothly in chocolate, baked goods, and spreads.',
        fact: 'Naturally occurring fatty substance extracted from soybeans, sunflower seeds, or egg yolks.',
        ai_interpretation: 'Generally safe, standard natural emulsifier.',
        consumer_note: 'Soy-allergic individuals should verify the botanical source.'
      },
      {
        code: '150d',
        name: 'Caramel IV (Sulphite Ammonia Caramel)',
        purpose: 'Food Colouring',
        category: 'Attention',
        simple_explanation: 'Provides dark brown colour in colas, sauces, gravies, and baked products.',
        fact: 'Produced by heating carbohydrates in the presence of sulphite and ammonium compounds.',
        ai_interpretation: 'By-product 4-MEI is globally monitored by food safety authorities. FSSAI limits 4-MEI to safe background thresholds.',
        consumer_note: 'Contains sulphite residues. Individuals with sulphite allergies should check allergen declarations.'
      }
    ];

    for (const a of additives) {
      await run(
        `INSERT INTO food_additives (code, name, purpose, category, simple_explanation, fact, ai_interpretation, consumer_note)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [a.code, a.name, a.purpose, a.category, a.simple_explanation, a.fact, a.ai_interpretation, a.consumer_note]
      );
    }

    console.log('Database master seeding finished.');
  } catch (err) {
    console.error('Seed error:', err.message);
  }
}

// Auto-run schema setup on startup
initializeDatabase();

export default { query, get, run };
