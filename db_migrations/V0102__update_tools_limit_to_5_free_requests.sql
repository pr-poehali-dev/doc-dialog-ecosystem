-- Изменяем дефолтное значение tools_limit с 10 на 5 для новых пользователей
ALTER TABLE t_p46047379_doc_dialog_ecosystem.users 
ALTER COLUMN tools_limit SET DEFAULT 5;

-- Обновляем существующих пользователей, у которых tools_limit = 10 (стандартный лимит)
-- Оставляем только тем, кто ещё не использовал лимит полностью
UPDATE t_p46047379_doc_dialog_ecosystem.users 
SET tools_limit = 5 
WHERE tools_limit = 10 AND tools_used < 5;