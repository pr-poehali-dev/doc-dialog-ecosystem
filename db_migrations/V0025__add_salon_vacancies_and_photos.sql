-- Добавляем таблицу для вакансий массажистов в салонах
CREATE TABLE IF NOT EXISTS t_p46047379_doc_dialog_ecosystem.salon_vacancies (
    id SERIAL PRIMARY KEY,
    salon_id INTEGER NOT NULL,
    specializations TEXT[] NOT NULL,
    schedule VARCHAR(500),
    salary_from NUMERIC(10, 2),
    salary_to NUMERIC(10, 2),
    salary_currency VARCHAR(10) DEFAULT 'RUB',
    requirements TEXT,
    requires_partner_courses BOOLEAN DEFAULT true,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Добавляем поле для фото салона
ALTER TABLE t_p46047379_doc_dialog_ecosystem.salons 
ADD COLUMN IF NOT EXISTS photos TEXT[] DEFAULT ARRAY[]::TEXT[];

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_salon_vacancies_salon_id ON t_p46047379_doc_dialog_ecosystem.salon_vacancies(salon_id);
CREATE INDEX IF NOT EXISTS idx_salon_vacancies_active ON t_p46047379_doc_dialog_ecosystem.salon_vacancies(is_active);
