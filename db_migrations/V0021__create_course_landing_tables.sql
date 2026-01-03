-- Таблица лендингов курсов
CREATE TABLE IF NOT EXISTS t_p46047379_doc_dialog_ecosystem.course_landings (
    id SERIAL PRIMARY KEY,
    school_id INTEGER REFERENCES t_p46047379_doc_dialog_ecosystem.schools(id),
    
    -- 1. Основная информация
    title VARCHAR(255) NOT NULL,
    short_description TEXT,
    format VARCHAR(50), -- онлайн / офлайн / гибрид
    category VARCHAR(100),
    cover_url TEXT,
    cta_button_text VARCHAR(100) DEFAULT 'Записаться на курс',
    
    -- 3. Автор курса
    author_name VARCHAR(255),
    author_photo_url TEXT,
    author_position VARCHAR(255),
    author_description TEXT,
    author_experience TEXT,
    
    -- 7. Формат обучения
    duration VARCHAR(100),
    lesson_format TEXT,
    support_info TEXT,
    access_period VARCHAR(100),
    city VARCHAR(100),
    location TEXT,
    event_dates TEXT,
    days_count INTEGER,
    
    -- 9. Стоимость и условия
    price_text TEXT,
    payment_format TEXT,
    discount_info TEXT,
    partner_link TEXT,
    
    -- 10. Промокод
    promo_description TEXT,
    notification_email VARCHAR(255),
    notification_text TEXT,
    
    -- 11. SEO
    seo_title VARCHAR(255),
    seo_description TEXT,
    slug VARCHAR(255) UNIQUE,
    
    -- 12. Публикация
    status VARCHAR(50) DEFAULT 'draft', -- draft / published / hidden
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Для кого курс (повторяемый блок)
CREATE TABLE IF NOT EXISTS t_p46047379_doc_dialog_ecosystem.course_landing_target_audience (
    id SERIAL PRIMARY KEY,
    landing_id INTEGER REFERENCES t_p46047379_doc_dialog_ecosystem.course_landings(id),
    title VARCHAR(255),
    description TEXT,
    icon_url TEXT,
    sort_order INTEGER DEFAULT 0
);

-- 5. Результаты обучения (список)
CREATE TABLE IF NOT EXISTS t_p46047379_doc_dialog_ecosystem.course_landing_results (
    id SERIAL PRIMARY KEY,
    landing_id INTEGER REFERENCES t_p46047379_doc_dialog_ecosystem.course_landings(id),
    result_text TEXT,
    sort_order INTEGER DEFAULT 0
);

-- 6. Программа курса (повторяемый блок)
CREATE TABLE IF NOT EXISTS t_p46047379_doc_dialog_ecosystem.course_landing_program (
    id SERIAL PRIMARY KEY,
    landing_id INTEGER REFERENCES t_p46047379_doc_dialog_ecosystem.course_landings(id),
    module_name VARCHAR(255),
    description TEXT,
    sort_order INTEGER DEFAULT 0
);

-- 8. Бонусы (повторяемый блок)
CREATE TABLE IF NOT EXISTS t_p46047379_doc_dialog_ecosystem.course_landing_bonuses (
    id SERIAL PRIMARY KEY,
    landing_id INTEGER REFERENCES t_p46047379_doc_dialog_ecosystem.course_landings(id),
    bonus_name VARCHAR(255),
    description TEXT,
    sort_order INTEGER DEFAULT 0
);

-- Индексы для производительности
CREATE INDEX IF NOT EXISTS idx_course_landings_school_id ON t_p46047379_doc_dialog_ecosystem.course_landings(school_id);
CREATE INDEX IF NOT EXISTS idx_course_landings_slug ON t_p46047379_doc_dialog_ecosystem.course_landings(slug);
CREATE INDEX IF NOT EXISTS idx_course_landings_status ON t_p46047379_doc_dialog_ecosystem.course_landings(status);