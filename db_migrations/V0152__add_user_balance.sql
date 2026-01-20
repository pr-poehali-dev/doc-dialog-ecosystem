-- Добавляем поле balance для пользователей (единый баланс для всех услуг)
ALTER TABLE t_p46047379_doc_dialog_ecosystem.users 
ADD COLUMN IF NOT EXISTS balance NUMERIC(10, 2) DEFAULT 0 NOT NULL;

-- Создаем индекс для быстрой проверки баланса
CREATE INDEX IF NOT EXISTS idx_users_balance 
ON t_p46047379_doc_dialog_ecosystem.users(balance) WHERE balance > 0;