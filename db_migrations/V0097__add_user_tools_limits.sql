-- Добавление полей для ИИ-инструментов пользователей
ALTER TABLE t_p46047379_doc_dialog_ecosystem.users
ADD COLUMN IF NOT EXISTS tools_limit INTEGER NOT NULL DEFAULT 10,
ADD COLUMN IF NOT EXISTS tools_used INTEGER NOT NULL DEFAULT 0;

-- Комментарии к полям
COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.users.tools_limit IS 'Лимит использования ИИ-инструментов для пользователя';
COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.users.tools_used IS 'Количество использованных ИИ-инструментов за текущий период';
