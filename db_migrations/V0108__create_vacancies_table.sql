-- Создание таблицы вакансий для импорта из внешних источников
CREATE TABLE IF NOT EXISTS vacancies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    compensation_from INTEGER,
    compensation_to INTEGER,
    gross BOOLEAN DEFAULT false,
    company_name VARCHAR(300) NOT NULL,
    city VARCHAR(200),
    online BOOLEAN DEFAULT false,
    vacancy_link TEXT,
    company_link TEXT,
    company_approved BOOLEAN DEFAULT false,
    it_accreditation BOOLEAN DEFAULT false,
    without_resume BOOLEAN DEFAULT false,
    company_logo TEXT,
    metro_station_0 VARCHAR(200),
    metro_station_1 VARCHAR(200),
    metro_station_2 VARCHAR(200),
    metro_station_3 VARCHAR(200),
    work_experience VARCHAR(100),
    work_schedule VARCHAR(200),
    compensation_frequency VARCHAR(50),
    employer_hh_rating DECIMAL(3,2),
    employer_it_accreditation BOOLEAN DEFAULT false,
    hrbrand VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для быстрого поиска
CREATE INDEX idx_vacancies_city ON vacancies(city);
CREATE INDEX idx_vacancies_company_name ON vacancies(company_name);
CREATE INDEX idx_vacancies_work_experience ON vacancies(work_experience);
CREATE INDEX idx_vacancies_online ON vacancies(online);
CREATE INDEX idx_vacancies_created_at ON vacancies(created_at DESC);

-- Комментарии к таблице
COMMENT ON TABLE vacancies IS 'Таблица вакансий, импортированных из внешних источников (HH.ru и др.)';
COMMENT ON COLUMN vacancies.gross IS 'Зарплата указана до вычета налогов';
COMMENT ON COLUMN vacancies.online IS 'Возможность удаленной работы';
COMMENT ON COLUMN vacancies.without_resume IS 'Можно откликнуться без резюме';
COMMENT ON COLUMN vacancies.compensation_frequency IS 'Периодичность выплаты: monthly, hourly и т.д.';