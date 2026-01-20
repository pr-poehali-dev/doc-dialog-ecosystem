-- Пополнение баланса клиенту massajjjj@test.ru для тестирования
UPDATE t_p46047379_doc_dialog_ecosystem.users 
SET balance = balance + 300 
WHERE id = 8;

INSERT INTO t_p46047379_doc_dialog_ecosystem.user_balance_transactions 
(user_id, amount, type, description, created_at)
VALUES (8, 300, 'topup', 'Пополнение для тестирования инструментов', NOW());