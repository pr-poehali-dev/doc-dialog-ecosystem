-- Пополнение баланса для massaj@test.ru на 100000 рублей для тестирования платных шаблонов
UPDATE t_p46047379_doc_dialog_ecosystem.users 
SET balance = balance + 100000 
WHERE email = 'massaj@test.ru';