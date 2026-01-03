-- Добавляем поля для полного лендинга курса
ALTER TABLE t_p46047379_doc_dialog_ecosystem.courses
ADD COLUMN IF NOT EXISTS slug VARCHAR(255) UNIQUE,
ADD COLUMN IF NOT EXISTS hero_title TEXT,
ADD COLUMN IF NOT EXISTS hero_subtitle TEXT,
ADD COLUMN IF NOT EXISTS about_course TEXT,
ADD COLUMN IF NOT EXISTS what_you_learn JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS program_modules JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS author_bio TEXT,
ADD COLUMN IF NOT EXISTS author_experience TEXT,
ADD COLUMN IF NOT EXISTS benefits JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS testimonials JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS faq JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS cta_button_text VARCHAR(255) DEFAULT 'Записаться на курс',
ADD COLUMN IF NOT EXISTS cta_button_url TEXT,
ADD COLUMN IF NOT EXISTS duration_text VARCHAR(255);

-- Создаём индекс для slug
CREATE INDEX IF NOT EXISTS idx_courses_slug ON t_p46047379_doc_dialog_ecosystem.courses(slug);

-- Обновляем существующие записи (если нужно)
UPDATE t_p46047379_doc_dialog_ecosystem.courses 
SET slug = 'course-' || id::TEXT
WHERE slug IS NULL;
