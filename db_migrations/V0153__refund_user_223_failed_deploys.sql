-- Возврат средств пользователю 223 (списались зря из-за ошибки деплоя)
UPDATE t_p46047379_doc_dialog_ecosystem.users 
SET balance = balance + 45 
WHERE id = 223;