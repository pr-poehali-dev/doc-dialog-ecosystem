-- Создаём таблицу для запросов промокодов
CREATE TABLE IF NOT EXISTS t_p46047379_doc_dialog_ecosystem.promo_requests (
    id SERIAL PRIMARY KEY,
    masseur_id INTEGER NOT NULL,
    masseur_email VARCHAR(255) NOT NULL,
    masseur_name VARCHAR(255) NOT NULL,
    school_id INTEGER NOT NULL,
    school_email VARCHAR(255) NOT NULL,
    course_id INTEGER NOT NULL,
    course_title VARCHAR(500) NOT NULL,
    entity_type VARCHAR(50) NOT NULL CHECK (entity_type IN ('course', 'mastermind', 'offline_training')),
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'expired')),
    promo_code VARCHAR(100) NULL,
    purchase_url TEXT NULL,
    discount_percentage INTEGER NULL,
    expires_at TIMESTAMP NULL,
    opened_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    responded_at TIMESTAMP NULL
);

-- Индексы для быстрого поиска
CREATE INDEX idx_promo_requests_masseur ON t_p46047379_doc_dialog_ecosystem.promo_requests(masseur_id);
CREATE INDEX idx_promo_requests_school ON t_p46047379_doc_dialog_ecosystem.promo_requests(school_id);
CREATE INDEX idx_promo_requests_status ON t_p46047379_doc_dialog_ecosystem.promo_requests(status);
CREATE INDEX idx_promo_requests_expires ON t_p46047379_doc_dialog_ecosystem.promo_requests(expires_at);
