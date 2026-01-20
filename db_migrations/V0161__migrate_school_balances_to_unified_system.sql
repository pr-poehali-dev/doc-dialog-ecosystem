-- Перенос старых балансов школ на новый унифицированный баланс

-- Школа norma9114@yandex.ru (user_id=6): 5,483,200₽
UPDATE t_p46047379_doc_dialog_ecosystem.users 
SET balance = 5483200.00 
WHERE id = 6;

INSERT INTO t_p46047379_doc_dialog_ecosystem.user_balance_transactions 
(user_id, amount, type, description, created_at)
VALUES (6, 5483200.00, 'topup', 'Перенос баланса со старой системы school_balance', NOW());

-- Школа svodopianoff@yandex.ru (user_id=2): 5,000₽ (уже есть 700₽, добавим 5000₽)
UPDATE t_p46047379_doc_dialog_ecosystem.users 
SET balance = balance + 5000.00 
WHERE id = 2;

INSERT INTO t_p46047379_doc_dialog_ecosystem.user_balance_transactions 
(user_id, amount, type, description, created_at)
VALUES (2, 5000.00, 'topup', 'Перенос баланса со старой системы school_balance', NOW());

-- Школа webmanager5@yandex.ru (user_id=221): 2,010,000₽
UPDATE t_p46047379_doc_dialog_ecosystem.users 
SET balance = 2010000.00 
WHERE id = 221;

INSERT INTO t_p46047379_doc_dialog_ecosystem.user_balance_transactions 
(user_id, amount, type, description, created_at)
VALUES (221, 2010000.00, 'topup', 'Перенос баланса со старой системы school_balance', NOW());