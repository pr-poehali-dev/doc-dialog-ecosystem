-- Таблица для хранения предупреждений пользователям
CREATE TABLE IF NOT EXISTS t_p46047379_doc_dialog_ecosystem.content_warnings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES t_p46047379_doc_dialog_ecosystem.users(id),
    violation_category VARCHAR(50) NOT NULL,
    message_text TEXT NOT NULL,
    matched_patterns TEXT[] NOT NULL,
    warning_count INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Индекс для быстрого поиска нарушений пользователя
CREATE INDEX IF NOT EXISTS idx_content_warnings_user_id ON t_p46047379_doc_dialog_ecosystem.content_warnings(user_id);

-- Добавляем поле для отслеживания блокировок за контент
ALTER TABLE t_p46047379_doc_dialog_ecosystem.users 
ADD COLUMN IF NOT EXISTS content_violation_count INTEGER DEFAULT 0;

ALTER TABLE t_p46047379_doc_dialog_ecosystem.users 
ADD COLUMN IF NOT EXISTS is_content_blocked BOOLEAN DEFAULT FALSE;

ALTER TABLE t_p46047379_doc_dialog_ecosystem.users 
ADD COLUMN IF NOT EXISTS content_block_reason TEXT;