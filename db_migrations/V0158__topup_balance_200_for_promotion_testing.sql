-- Пополнение баланса для тестирования продвижения массажистов
UPDATE t_p46047379_doc_dialog_ecosystem.users 
SET balance = balance + 200 
WHERE id = 2;

-- Записываем транзакцию пополнения
INSERT INTO t_p46047379_doc_dialog_ecosystem.user_balance_transactions 
(user_id, amount, type, description, created_at)
VALUES (2, 200, 'topup', 'Пополнение для тестирования продвижения', NOW());
