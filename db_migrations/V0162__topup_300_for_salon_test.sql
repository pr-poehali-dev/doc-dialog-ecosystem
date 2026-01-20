-- Пополнение 300₽ для тестового салона salon@test.ru (user_id=9)
UPDATE t_p46047379_doc_dialog_ecosystem.users 
SET balance = balance + 300.00 
WHERE id = 9;

INSERT INTO t_p46047379_doc_dialog_ecosystem.user_balance_transactions 
(user_id, amount, type, description, created_at)
VALUES (9, 300.00, 'topup', 'Пополнение для тестирования AI-инструментов салона', NOW());