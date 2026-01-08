-- Добавляем поле coins для хранения баланса монет пользователей
ALTER TABLE t_p46047379_doc_dialog_ecosystem.users 
ADD COLUMN IF NOT EXISTS coins INTEGER DEFAULT 0 NOT NULL;

-- Создаём таблицу для транзакций с монетами
CREATE TABLE IF NOT EXISTS t_p46047379_doc_dialog_ecosystem.coin_transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES t_p46047379_doc_dialog_ecosystem.users(id),
    amount INTEGER NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('deposit', 'withdrawal')),
    action VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Индекс для быстрого поиска транзакций пользователя
CREATE INDEX IF NOT EXISTS idx_coin_transactions_user_id 
ON t_p46047379_doc_dialog_ecosystem.coin_transactions(user_id);

-- Индекс для сортировки по дате
CREATE INDEX IF NOT EXISTS idx_coin_transactions_created_at 
ON t_p46047379_doc_dialog_ecosystem.coin_transactions(created_at DESC);

-- Даём начальный баланс существующим пользователям (1000 монет для тестирования)
UPDATE t_p46047379_doc_dialog_ecosystem.users 
SET coins = 1000 
WHERE coins = 0;