-- Подтверждение email для администратора
UPDATE users 
SET email_verified = TRUE, 
    verification_token = NULL, 
    verification_token_expires = NULL 
WHERE email = 'svodopianoff@yandex.ru';