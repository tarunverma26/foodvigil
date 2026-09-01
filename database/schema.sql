-- Supabase / PostgreSQL Database Schema for FoodVigil

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS food_codes (
    code TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    purpose TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Informational', 'Attention', 'High attention'
    simple_explanation TEXT NOT NULL,
    fact TEXT NOT NULL,
    ai_interpretation TEXT NOT NULL,
    consumer_note TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS businesses (
    license_number VARCHAR(14) PRIMARY KEY,
    business_name TEXT NOT NULL,
    brand_name TEXT NOT NULL,
    premises_address TEXT NOT NULL,
    category TEXT NOT NULL,
    status TEXT NOT NULL, -- 'ACTIVE', 'SUSPENDED', 'EXPIRED', 'CANCELLED'
    issue_date DATE,
    valid_upto DATE,
    hygiene_rating INTEGER DEFAULT 4,
    inspection_grade TEXT,
    is_demo_data BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS safety_alerts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    severity TEXT NOT NULL, -- 'High attention', 'Attention', 'Informational'
    date_issued DATE NOT NULL,
    region TEXT NOT NULL,
    product TEXT NOT NULL,
    manufacturer TEXT NOT NULL,
    reason TEXT NOT NULL,
    source TEXT NOT NULL,
    action_required TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tracking_number TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    brand TEXT NOT NULL,
    category TEXT NOT NULL,
    fssai_license VARCHAR(14),
    batch_number TEXT NOT NULL,
    store_name TEXT NOT NULL,
    city TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT DEFAULT 'Submitted', -- 'Submitted', 'Under Review', 'Assigned to DO', 'Resolved'
    status_step INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS evidence (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size TEXT NOT NULL,
    storage_path TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
