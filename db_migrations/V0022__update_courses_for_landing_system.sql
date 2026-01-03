-- Добавляем новые поля в таблицу courses для лендингов
ALTER TABLE courses ADD COLUMN IF NOT EXISTS type VARCHAR(20) DEFAULT 'онлайн';
ALTER TABLE courses ADD COLUMN IF NOT EXISTS short_description TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS cover_url TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS cta_button_text VARCHAR(100) DEFAULT 'Запросить промокод';
ALTER TABLE courses ADD COLUMN IF NOT EXISTS author_description TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS author_experience VARCHAR(255);
ALTER TABLE courses ADD COLUMN IF NOT EXISTS duration VARCHAR(100);
ALTER TABLE courses ADD COLUMN IF NOT EXISTS lesson_format TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS support_available BOOLEAN DEFAULT false;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS access_period VARCHAR(100);
ALTER TABLE courses ADD COLUMN IF NOT EXISTS city VARCHAR(100);
ALTER TABLE courses ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS event_dates VARCHAR(255);
ALTER TABLE courses ADD COLUMN IF NOT EXISTS days_count INTEGER;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS price_text VARCHAR(255);
ALTER TABLE courses ADD COLUMN IF NOT EXISTS payment_format TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS discount_info TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS partner_link TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS promo_description TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS notification_email VARCHAR(255);
ALTER TABLE courses ADD COLUMN IF NOT EXISTS notification_template TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS seo_title VARCHAR(255);
ALTER TABLE courses ADD COLUMN IF NOT EXISTS seo_description TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS slug VARCHAR(255);

-- Создаем уникальный индекс для slug если его нет
CREATE UNIQUE INDEX IF NOT EXISTS idx_courses_slug_unique ON courses(slug) WHERE slug IS NOT NULL;

-- Обновляем существующие данные
UPDATE courses SET 
    type = 'онлайн',
    short_description = SUBSTRING(description, 1, 300),
    cover_url = image_url,
    partner_link = COALESCE(external_url, ''),
    slug = 'course-' || id::text
WHERE slug IS NULL;

-- Создаем таблицы для repeater-полей если их еще нет
CREATE TABLE IF NOT EXISTS course_target_audience (
    id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL REFERENCES courses(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon_url TEXT,
    sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS course_results (
    id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL REFERENCES courses(id),
    result_text TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS course_program (
    id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL REFERENCES courses(id),
    module_name VARCHAR(255) NOT NULL,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    event_date DATE
);

CREATE TABLE IF NOT EXISTS course_bonuses (
    id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL REFERENCES courses(id),
    bonus_name VARCHAR(255) NOT NULL,
    description TEXT,
    sort_order INTEGER DEFAULT 0
);

-- Создаем индексы если их нет
CREATE INDEX IF NOT EXISTS idx_course_target_audience_course_id ON course_target_audience(course_id);
CREATE INDEX IF NOT EXISTS idx_course_results_course_id ON course_results(course_id);
CREATE INDEX IF NOT EXISTS idx_course_program_course_id ON course_program(course_id);
CREATE INDEX IF NOT EXISTS idx_course_bonuses_course_id ON course_bonuses(course_id);
