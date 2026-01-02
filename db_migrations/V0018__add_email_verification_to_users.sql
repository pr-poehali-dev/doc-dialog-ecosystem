-- Добавление полей для подтверждения email

ALTER TABLE t_p46047379_doc_dialog_ecosystem.users
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE;

ALTER TABLE t_p46047379_doc_dialog_ecosystem.users
ADD COLUMN IF NOT EXISTS verification_token VARCHAR(255);

ALTER TABLE t_p46047379_doc_dialog_ecosystem.users
ADD COLUMN IF NOT EXISTS verification_token_expires TIMESTAMP;

COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.users.email_verified IS 'Подтверждён ли email пользователя';
COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.users.verification_token IS 'Токен для подтверждения email';
COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.users.verification_token_expires IS 'Срок действия токена подтверждения';
