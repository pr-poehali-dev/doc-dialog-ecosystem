-- Возврат 45₽ за неудачные попытки медицинского анализа
UPDATE t_p46047379_doc_dialog_ecosystem.users 
SET balance = balance + 45 
WHERE id = 223;
