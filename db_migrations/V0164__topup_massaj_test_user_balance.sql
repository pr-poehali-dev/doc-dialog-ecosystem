-- Пополнение баланса пользователю massaj@test.ru на 5000 рублей
UPDATE users SET balance = balance + 5000 WHERE email = 'massaj@test.ru';