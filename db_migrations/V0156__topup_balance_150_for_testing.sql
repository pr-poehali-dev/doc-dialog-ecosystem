-- Пополнение баланса на 150₽ для тестирования
UPDATE t_p46047379_doc_dialog_ecosystem.users 
SET balance = balance + 150 
WHERE id = 223;