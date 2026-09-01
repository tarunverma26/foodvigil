import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'foodvigil.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
  } else {
    console.log('Connected to FoodVigil SQLite database at:', dbPath);
    initializeDatabase();
  }
});

// Helper for promise-based queries
export const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

export const get = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

function initializeDatabase() {
  db.serialize(() => {
    // 1. Food Additives / INS Knowledge Base
    db.run(`
      CREATE TABLE IF NOT EXISTS food_additives (
        code TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        purpose TEXT NOT NULL,
        category TEXT NOT NULL,
        simple_explanation TEXT NOT NULL,
        fact TEXT NOT NULL,
        ai_interpretation TEXT NOT NULL,
        consumer_note TEXT NOT NULL
      )
    `);

    // 2. FSSAI Registered Businesses
    db.run(`
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
      )
    `);

    // 3. Safety Alerts & Recalls
    db.run(`
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
      )
    `);

    // 4. Scanned Products History
    db.run(`
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
      )
    `);

    // 5. Consumer Reports & Complaints
    db.run(`
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
      )
    `);

    // 6. Evidence Documents Vault
    db.run(`
      CREATE TABLE IF NOT EXISTS evidence (
        id TEXT PRIMARY KEY,
        report_id TEXT,
        file_name TEXT NOT NULL,
        file_type TEXT NOT NULL,
        file_size TEXT NOT NULL,
        storage_path TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Seed Data
    seedDatabase();
  });
}

async function seedDatabase() {
  const count = await get('SELECT COUNT(*) as count FROM food_additives');
  if (count && count.count > 0) return; // Already seeded

  console.log('Seeding FoodVigil SQLite Database with master records...');

  // Seed INS Additives
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
      code: '627',
      name: 'Disodium Guanylate',
      purpose: 'Flavour Enhancer',
      category: 'Informational',
      simple_explanation: 'Synergistic flavour compound that works alongside MSG to enhance richness.',
      fact: 'Produced through fermentation of carbohydrates or yeast extracts.',
      ai_interpretation: 'Used in small quantities to amplify savoury flavours.',
      consumer_note: 'Those advised on low-purine dietary regimens (e.g. for gout) may note its presence.'
    },
    {
      code: '631',
      name: 'Disodium Inosinate',
      purpose: 'Flavour Enhancer',
      category: 'Informational',
      simple_explanation: 'Enhances meaty and savoury flavour notes in processed snack seasonings.',
      fact: 'Derived via starch fermentation or animal/fish sources.',
      ai_interpretation: 'Generally safe and used in minute amounts for taste balancing.',
      consumer_note: 'Vegetarian consumers should look for the green veg logo to ensure plant-based origin.'
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
      code: '150d',
      name: 'Caramel IV (Sulphite Ammonia Caramel)',
      purpose: 'Food Colouring',
      category: 'Attention',
      simple_explanation: 'Provides dark brown colour in colas, sauces, gravies, and baked products.',
      fact: 'Produced by heating carbohydrates in the presence of sulphite and ammonium compounds.',
      ai_interpretation: 'By-product 4-MEI is globally monitored by food safety authorities. FSSAI limits 4-MEI to safe background thresholds.',
      consumer_note: 'Contains sulphite residues. Individuals with sulphite allergies should check allergen declarations.'
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
      code: '320',
      name: 'Butylated Hydroxyanisole (BHA)',
      purpose: 'Synthetic Antioxidant',
      category: 'High attention',
      simple_explanation: 'Prevents oils and fats in butter, chips, and baked goods from turning rancid.',
      fact: 'Synthetic phenolic compound.',
      ai_interpretation: 'Under ongoing international surveillance for potential endocrine interactions when consumed in large chronic doses.',
      consumer_note: 'Check labels if seeking preservative-free dietary choices.'
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
      code: '412',
      name: 'Guar Gum',
      purpose: 'Thickener & Stabilizer',
      category: 'Informational',
      simple_explanation: 'A natural plant fiber used to give smooth texture to ice creams, sauces, and baked products.',
      fact: 'Extracted from the seeds of the guar plant (Cyamopsis tetragonoloba).',
      ai_interpretation: 'Completely natural dietary fiber. Harmless in standard dietary amounts.',
      consumer_note: 'Safe and commonly cultivated across western India.'
    },
    {
      code: '551',
      name: 'Silicon Dioxide',
      purpose: 'Anti-Caking Agent',
      category: 'Informational',
      simple_explanation: 'Stops dry powders like table salt, spice blends, and instant coffee from clumping due to moisture.',
      fact: 'Purified mineral silica (amorphous food-grade).',
      ai_interpretation: 'Passes unabsorbed through the digestive tract. Safe within authorized limits.',
      consumer_note: 'Keeps dry seasoning mixes free-flowing in humid environments.'
    },
    {
      code: '951',
      name: 'Aspartame',
      purpose: 'Artificial Sweetener',
      category: 'High attention',
      simple_explanation: 'Low-calorie intense sweetener (approx. 200 times sweeter than table sugar) used in diet beverages.',
      fact: 'Dipeptide of aspartic acid and phenylalanine.',
      ai_interpretation: 'Classified as Group 2B ("possibly carcinogenic") by IARC in 2023, while JECFA reaffirmed an acceptable daily intake (ADI) of 0–40 mg/kg body weight.',
      consumer_note: 'Must carry mandatory warning: "Contains Phenylalanine — Not for Phenylketonurics (PKU)". Not recommended for children.'
    }
  ];

  for (const item of additives) {
    await run(
      `INSERT INTO food_additives (code, name, purpose, category, simple_explanation, fact, ai_interpretation, consumer_note)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [item.code, item.name, item.purpose, item.category, item.simple_explanation, item.fact, item.ai_interpretation, item.consumer_note]
    );
  }

  // Seed FSSAI Businesses
  const businesses = [
    {
      license_number: '10014021001234',
      business_name: 'Gujarat Co-operative Milk Marketing Federation Ltd (AMUL)',
      brand_name: 'Amul Dairy & Health Foods',
      premises_address: 'Amul Dairy Road, Anand, Gujarat - 388001',
      category: 'Dairy Processing & Value Added Products (Central License)',
      status: 'ACTIVE',
      status_code: 'active',
      issue_date: '12-Jan-2014',
      valid_upto: '11-Jan-2029',
      hygiene_rating: 5,
      inspection_grade: 'Grade A+ (Exemplary Compliance)',
      public_notices_json: JSON.stringify([])
    },
    {
      license_number: '10012011000168',
      business_name: 'Nestle India Limited',
      brand_name: 'Nestlé Culinary & Dairy Unit',
      premises_address: 'GT Road, Moga Industrial Estate, Punjab - 142001',
      category: 'Large Scale Food Manufacturer (Central License)',
      status: 'ACTIVE',
      status_code: 'active',
      issue_date: '04-Mar-2012',
      valid_upto: '03-Mar-2028',
      hygiene_rating: 4,
      inspection_grade: 'Grade A (High Compliance)',
      public_notices_json: JSON.stringify([
        {
          id: 'ADV-2025-PB-09',
          date: '14-Nov-2025',
          title: 'Routine Surveillance Cleared',
          details: 'Randomized testing of noodle batches confirmed heavy metal levels well within permissible limits.'
        }
      ])
    },
    {
      license_number: '20822005001298',
      business_name: 'Delight Cloud Kitchens & Caterers LLP',
      brand_name: 'Royal Biryani & Rolls Online',
      premises_address: 'Basement 4, Sector 18 Commercial Complex, Gurugram, Haryana - 122002',
      category: 'Food Service Provider / Cloud Kitchen (State License)',
      status: 'SUSPENDED',
      status_code: 'suspended',
      issue_date: '10-Oct-2022',
      valid_upto: '09-Oct-2027',
      hygiene_rating: 1,
      inspection_grade: 'Grade F (Failed Standards)',
      public_notices_json: JSON.stringify([
        {
          id: 'NOT-2026-HR-041',
          date: '18-Feb-2026',
          title: 'Operation Suspended by Food Safety Officer',
          details: 'Elevated microbial bacterial counts detected in kitchen water source. Facility sealed pending complete filtration overhaul.'
        }
      ])
    },
    {
      license_number: '12218027000412',
      business_name: 'Shree Krishna Spices & Condiments Trading',
      brand_name: 'Shree Krishna Pure Haldi',
      premises_address: 'Plot 44, Krishi Upaj Mandi, Nagaur, Rajasthan - 341001',
      category: 'Spice Grinding & Packaging Unit (State License)',
      status: 'CANCELLED & RECALLED',
      status_code: 'cancelled',
      issue_date: '15-Aug-2018',
      valid_upto: '14-Aug-2023',
      hygiene_rating: 0,
      inspection_grade: 'CRITICAL HAZARD',
      public_notices_json: JSON.stringify([
        {
          id: 'REC-2025-RJ-112',
          date: '05-Dec-2025',
          title: 'Nationwide Recall: Metanil Yellow Detected in Turmeric Powder',
          details: 'Banned industrial chemical dye (Metanil Yellow) detected in 100g, 200g, and 500g pouches. License revoked permanently under Section 59 of FSS Act.'
        }
      ])
    }
  ];

  for (const b of businesses) {
    await run(
      `INSERT INTO fssai_businesses (license_number, business_name, brand_name, premises_address, category, status, status_code, issue_date, valid_upto, hygiene_rating, inspection_grade, is_demo_data, public_notices_json)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)`,
      [b.license_number, b.business_name, b.brand_name, b.premises_address, b.category, b.status, b.status_code, b.issue_date, b.valid_upto, b.hygiene_rating, b.inspection_grade, b.public_notices_json]
    );
  }

  // Seed Safety Alerts
  const alerts = [
    {
      id: 'ALT-2026-01',
      title: 'Advisory on Non-Permitted Industrial Dyes in Loose Spice Powders',
      category: 'Spices & Condiments',
      severity: 'High attention',
      date_issued: '24-Aug-2026',
      region: 'North & Western Regions',
      product: 'Loose Turmeric & Red Chilli Powders',
      manufacturer: 'Unbranded Wholesale Mandi Traders',
      reason: 'Surveillance sampling identified non-permitted colorants (Metanil Yellow & Sudan Red dyes) in unbranded bulk sacks.',
      source: 'State Food Safety Commissionerate Advisory Ref: FSC/SP-2026/19',
      action_required: 'Consumers are advised to purchase packaged spices with verified 14-digit FSSAI licenses and AGMARK certifications.'
    },
    {
      id: 'ALT-2026-02',
      title: 'Voluntary Recall of Specific Batches of Premium Infant Cereal',
      category: 'Infant Nutrition',
      severity: 'High attention',
      date_issued: '18-Aug-2026',
      region: 'National',
      product: 'BabyFirst Organic Rice & Apple Puree (Batch #BF-26-08)',
      manufacturer: 'EarlyCare Nutrition India Ltd',
      reason: 'Routine quality audit detected trace elevated moisture levels causing potential premature mold growth before stated best-before date.',
      source: 'Manufacturer Direct Notice & FSSAI Voluntary Recall Register #VR-402',
      action_required: 'Consumers holding batch #BF-26-08 should return unconsumed packs to point of purchase for immediate replacement or full refund.'
    }
  ];

  for (const a of alerts) {
    await run(
      `INSERT INTO safety_alerts (id, title, category, severity, date_issued, region, product, manufacturer, reason, source, action_required)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [a.id, a.title, a.category, a.severity, a.date_issued, a.region, a.product, a.manufacturer, a.reason, a.source, a.action_required]
    );
  }

  console.log('Seeding complete. FoodVigil SQLite Database ready.');
}

export default db;
