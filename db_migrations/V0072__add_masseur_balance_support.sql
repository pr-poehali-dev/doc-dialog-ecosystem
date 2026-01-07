-- Добавляем поддержку баланса для массажистов

-- Добавляем колонку balance в masseur_profiles
ALTER TABLE t_p46047379_doc_dialog_ecosystem.masseur_profiles 
ADD COLUMN IF NOT EXISTS balance NUMERIC(10, 2) DEFAULT 0 NOT NULL;

-- Добавляем колонку masseur_id в balance_transactions
ALTER TABLE t_p46047379_doc_dialog_ecosystem.balance_transactions 
ADD COLUMN IF NOT EXISTS masseur_id INTEGER REFERENCES t_p46047379_doc_dialog_ecosystem.masseur_profiles(id);

-- Создаем индекс для быстрого поиска транзакций массажиста
CREATE INDEX IF NOT EXISTS idx_balance_transactions_masseur_id 
ON t_p46047379_doc_dialog_ecosystem.balance_transactions(masseur_id);