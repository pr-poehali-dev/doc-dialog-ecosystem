-- Увеличиваем базовый лимит AI-инструментов с 5 до 10 для всех пользователей
ALTER TABLE t_p46047379_doc_dialog_ecosystem.users 
ALTER COLUMN tools_limit SET DEFAULT 10;

-- Обновляем лимит для существующих пользователей, у которых стоит старый лимит 5
UPDATE t_p46047379_doc_dialog_ecosystem.users 
SET tools_limit = 10 
WHERE tools_limit = 5;