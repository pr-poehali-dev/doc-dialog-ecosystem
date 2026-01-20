-- Пополнение баланса для тестирования инструментов клиента
UPDATE t_p46047379_doc_dialog_ecosystem.users 
SET balance = balance + 500 
WHERE id = 2;

INSERT INTO t_p46047379_doc_dialog_ecosystem.user_balance_transactions 
(user_id, amount, type, description, created_at)
VALUES (2, 500, 'topup', 'Пополнение для тестирования инструментов клиента', NOW());