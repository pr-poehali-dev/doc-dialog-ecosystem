-- Создание таблицы для токенов восстановления пароля
CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    token VARCHAR(255) NOT NULL UNIQUE,
    code VARCHAR(6) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_token ON password_reset_tokens(token);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_code ON password_reset_tokens(code);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_expires_at ON password_reset_tokens(expires_at);

-- Комментарии
COMMENT ON TABLE password_reset_tokens IS 'Токены для восстановления пароля пользователей';
COMMENT ON COLUMN password_reset_tokens.user_id IS 'ID пользователя';
COMMENT ON COLUMN password_reset_tokens.token IS 'Уникальный токен для восстановления (используется в ссылке)';
COMMENT ON COLUMN password_reset_tokens.code IS '6-значный код для восстановления';
COMMENT ON COLUMN password_reset_tokens.expires_at IS 'Время истечения токена (обычно +1 час от создания)';
