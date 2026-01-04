-- Додавання нових полів для лендінгу мастермайнду
ALTER TABLE t_p46047379_doc_dialog_ecosystem.masterminds
ADD COLUMN IF NOT EXISTS hero_title TEXT,
ADD COLUMN IF NOT EXISTS hero_subtitle TEXT,
ADD COLUMN IF NOT EXISTS about_event TEXT,
ADD COLUMN IF NOT EXISTS what_you_get JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS event_program JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS host JSONB,
ADD COLUMN IF NOT EXISTS benefits JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS testimonials JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS faq JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS cta_button_text TEXT DEFAULT 'Зарегистрироваться',
ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS gallery JSONB DEFAULT '[]';

-- Індекс для slug
CREATE INDEX IF NOT EXISTS idx_masterminds_slug ON t_p46047379_doc_dialog_ecosystem.masterminds(slug);
