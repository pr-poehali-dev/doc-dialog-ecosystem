-- Добавляем колонку для количества оплаченных слотов вакансий
ALTER TABLE t_p46047379_doc_dialog_ecosystem.salons 
ADD COLUMN IF NOT EXISTS paid_vacancy_slots INTEGER DEFAULT 0;

-- Создаем таблицу для хранения платежей за вакансии
CREATE TABLE IF NOT EXISTS t_p46047379_doc_dialog_ecosystem.vacancy_payments (
    id SERIAL PRIMARY KEY,
    payment_id VARCHAR(255) UNIQUE NOT NULL,
    user_id INTEGER NOT NULL REFERENCES t_p46047379_doc_dialog_ecosystem.users(id),
    salon_id INTEGER NOT NULL REFERENCES t_p46047379_doc_dialog_ecosystem.salons(id),
    amount NUMERIC(10, 2) NOT NULL,
    vacancy_count INTEGER NOT NULL DEFAULT 1,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW(),
    paid_at TIMESTAMP NULL
);

-- Создаем индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_vacancy_payments_user ON t_p46047379_doc_dialog_ecosystem.vacancy_payments(user_id);
CREATE INDEX IF NOT EXISTS idx_vacancy_payments_salon ON t_p46047379_doc_dialog_ecosystem.vacancy_payments(salon_id);
CREATE INDEX IF NOT EXISTS idx_vacancy_payments_status ON t_p46047379_doc_dialog_ecosystem.vacancy_payments(status);
