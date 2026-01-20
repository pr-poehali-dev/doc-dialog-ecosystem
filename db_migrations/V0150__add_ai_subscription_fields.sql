-- Добавляем поля для AI-подписки
ALTER TABLE t_p46047379_doc_dialog_ecosystem.users
ADD COLUMN IF NOT EXISTS ai_dialogs_limit INTEGER NOT NULL DEFAULT 5,
ADD COLUMN IF NOT EXISTS subscription_tier VARCHAR(50) DEFAULT 'free',
ADD COLUMN IF NOT EXISTS subscription_expires TIMESTAMP;

-- Обновляем текущих пользователей
UPDATE t_p46047379_doc_dialog_ecosystem.users
SET ai_dialogs_limit = 5, subscription_tier = 'free'
WHERE ai_dialogs_limit IS NULL OR subscription_tier IS NULL;
