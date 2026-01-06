-- Создаем таблицу для профилей клиентов (не массажистов)
CREATE TABLE IF NOT EXISTS client_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    full_name VARCHAR(255),
    phone VARCHAR(50),
    city VARCHAR(100),
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

-- Индекс для быстрого поиска по user_id
CREATE INDEX idx_client_profiles_user_id ON client_profiles(user_id);