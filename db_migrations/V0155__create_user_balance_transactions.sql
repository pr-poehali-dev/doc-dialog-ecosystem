-- Создание таблицы для пользовательских балансовых транзакций
CREATE TABLE IF NOT EXISTS t_p46047379_doc_dialog_ecosystem.user_balance_transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES t_p46047379_doc_dialog_ecosystem.users(id),
    amount NUMERIC(10,2) NOT NULL,
    type VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);