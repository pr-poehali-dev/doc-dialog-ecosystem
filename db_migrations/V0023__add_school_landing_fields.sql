-- Добавляем поля для лендинга школы
ALTER TABLE t_p46047379_doc_dialog_ecosystem.schools
ADD COLUMN IF NOT EXISTS slug VARCHAR(255) UNIQUE,
ADD COLUMN IF NOT EXISTS short_description TEXT,
ADD COLUMN IF NOT EXISTS cover_url TEXT,
ADD COLUMN IF NOT EXISTS license_number VARCHAR(100),
ADD COLUMN IF NOT EXISTS is_author_school BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS founded_year INTEGER,
ADD COLUMN IF NOT EXISTS students_count INTEGER,
ADD COLUMN IF NOT EXISTS teachers_count INTEGER,
ADD COLUMN IF NOT EXISTS mission TEXT,
ADD COLUMN IF NOT EXISTS whatsapp VARCHAR(50),
ADD COLUMN IF NOT EXISTS telegram VARCHAR(100),
ADD COLUMN IF NOT EXISTS vk VARCHAR(100),
ADD COLUMN IF NOT EXISTS instagram VARCHAR(100),
ADD COLUMN IF NOT EXISTS cta_button_text VARCHAR(100) DEFAULT 'Оставить заявку',
ADD COLUMN IF NOT EXISTS cta_button_url TEXT,
ADD COLUMN IF NOT EXISTS seo_title VARCHAR(255),
ADD COLUMN IF NOT EXISTS seo_description TEXT,
ADD COLUMN IF NOT EXISTS about_school TEXT,
ADD COLUMN IF NOT EXISTS why_choose_us TEXT,
ADD COLUMN IF NOT EXISTS rating DECIMAL(3,2) DEFAULT 0.00,
ADD COLUMN IF NOT EXISTS reviews_count INTEGER DEFAULT 0;

-- Создаем таблицы для repeater полей лендинга школы
CREATE TABLE IF NOT EXISTS t_p46047379_doc_dialog_ecosystem.school_achievements (
  id SERIAL PRIMARY KEY,
  school_id INTEGER NOT NULL REFERENCES t_p46047379_doc_dialog_ecosystem.schools(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon_name VARCHAR(50),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS t_p46047379_doc_dialog_ecosystem.school_teachers (
  id SERIAL PRIMARY KEY,
  school_id INTEGER NOT NULL REFERENCES t_p46047379_doc_dialog_ecosystem.schools(id),
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255),
  bio TEXT,
  photo_url TEXT,
  experience_years INTEGER,
  specialization TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS t_p46047379_doc_dialog_ecosystem.school_reviews (
  id SERIAL PRIMARY KEY,
  school_id INTEGER NOT NULL REFERENCES t_p46047379_doc_dialog_ecosystem.schools(id),
  author_name VARCHAR(255) NOT NULL,
  author_photo_url TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  course_name VARCHAR(255),
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS t_p46047379_doc_dialog_ecosystem.school_gallery (
  id SERIAL PRIMARY KEY,
  school_id INTEGER NOT NULL REFERENCES t_p46047379_doc_dialog_ecosystem.schools(id),
  image_url TEXT NOT NULL,
  caption TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для оптимизации
CREATE INDEX IF NOT EXISTS idx_schools_slug ON t_p46047379_doc_dialog_ecosystem.schools(slug);
CREATE INDEX IF NOT EXISTS idx_schools_is_verified ON t_p46047379_doc_dialog_ecosystem.schools(is_verified);
CREATE INDEX IF NOT EXISTS idx_school_achievements_school_id ON t_p46047379_doc_dialog_ecosystem.school_achievements(school_id);
CREATE INDEX IF NOT EXISTS idx_school_teachers_school_id ON t_p46047379_doc_dialog_ecosystem.school_teachers(school_id);
CREATE INDEX IF NOT EXISTS idx_school_reviews_school_id ON t_p46047379_doc_dialog_ecosystem.school_reviews(school_id);
CREATE INDEX IF NOT EXISTS idx_school_gallery_school_id ON t_p46047379_doc_dialog_ecosystem.school_gallery(school_id);