CREATE TABLE IF NOT EXISTS t_p46047379_doc_dialog_ecosystem.masseur_landing_pages (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    hero_title TEXT,
    hero_subtitle TEXT,
    hero_image TEXT,
    profile_photo TEXT,
    about_title TEXT,
    about_text TEXT,
    services JSONB DEFAULT '[]'::jsonb,
    process_title TEXT,
    process_steps JSONB DEFAULT '[]'::jsonb,
    gallery JSONB DEFAULT '[]'::jsonb,
    certificates JSONB DEFAULT '[]'::jsonb,
    reviews JSONB DEFAULT '[]'::jsonb,
    blog JSONB DEFAULT '[]'::jsonb,
    videos JSONB DEFAULT '[]'::jsonb,
    offers JSONB DEFAULT '[]'::jsonb,
    template VARCHAR(50) DEFAULT 'modern',
    show_phone BOOLEAN DEFAULT true,
    show_telegram BOOLEAN DEFAULT true,
    color_theme VARCHAR(50) DEFAULT 'gradient',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_masseur_landing_user_id ON t_p46047379_doc_dialog_ecosystem.masseur_landing_pages(user_id);