-- Таблица балансов школ
CREATE TABLE IF NOT EXISTS school_balance (
    id SERIAL PRIMARY KEY,
    school_id INTEGER NOT NULL UNIQUE REFERENCES schools(id),
    balance DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'RUB',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица транзакций баланса
CREATE TABLE IF NOT EXISTS balance_transactions (
    id SERIAL PRIMARY KEY,
    school_id INTEGER NOT NULL REFERENCES schools(id),
    amount DECIMAL(10, 2) NOT NULL,
    type VARCHAR(20) NOT NULL,
    description TEXT,
    related_entity_type VARCHAR(50),
    related_entity_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_transaction_type CHECK (type IN ('deposit', 'withdrawal', 'refund'))
);

-- Таблица промо-позиций курсов
CREATE TABLE IF NOT EXISTS course_promotions (
    id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL REFERENCES courses(id),
    school_id INTEGER NOT NULL REFERENCES schools(id),
    promotion_type VARCHAR(20) NOT NULL,
    category VARCHAR(100),
    price_paid DECIMAL(10, 2) NOT NULL,
    promoted_until TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_promotion_type CHECK (promotion_type IN ('all_categories', 'own_category'))
);

-- Индексы для оптимизации
CREATE INDEX IF NOT EXISTS idx_course_promotions_course_id ON course_promotions(course_id);
CREATE INDEX IF NOT EXISTS idx_course_promotions_promoted_until ON course_promotions(promoted_until);
CREATE INDEX IF NOT EXISTS idx_balance_transactions_school_id ON balance_transactions(school_id);