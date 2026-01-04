-- Добавляем поля для лендинга очных обучений
ALTER TABLE t_p46047379_doc_dialog_ecosystem.offline_training
ADD COLUMN IF NOT EXISTS school_id INTEGER REFERENCES t_p46047379_doc_dialog_ecosystem.schools(id),
ADD COLUMN IF NOT EXISTS slug VARCHAR(255),
ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS currency VARCHAR(10) DEFAULT 'RUB',
ADD COLUMN IF NOT EXISTS current_participants INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS hero_title TEXT,
ADD COLUMN IF NOT EXISTS hero_subtitle TEXT,
ADD COLUMN IF NOT EXISTS about_training TEXT,
ADD COLUMN IF NOT EXISTS what_you_get JSONB,
ADD COLUMN IF NOT EXISTS training_program JSONB,
ADD COLUMN IF NOT EXISTS instructor JSONB,
ADD COLUMN IF NOT EXISTS co_instructors JSONB,
ADD COLUMN IF NOT EXISTS benefits JSONB,
ADD COLUMN IF NOT EXISTS testimonials JSONB,
ADD COLUMN IF NOT EXISTS faq JSONB,
ADD COLUMN IF NOT EXISTS cta_button_text VARCHAR(255) DEFAULT 'Записаться на обучение',
ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW();

-- Создаем индексы
CREATE INDEX IF NOT EXISTS idx_offline_training_slug ON t_p46047379_doc_dialog_ecosystem.offline_training(slug);
CREATE INDEX IF NOT EXISTS idx_offline_training_school_id ON t_p46047379_doc_dialog_ecosystem.offline_training(school_id);
CREATE INDEX IF NOT EXISTS idx_offline_training_status ON t_p46047379_doc_dialog_ecosystem.offline_training(status);