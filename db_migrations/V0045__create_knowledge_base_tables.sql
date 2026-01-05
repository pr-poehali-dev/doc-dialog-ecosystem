-- Таблица для хранения FAQ по типам пользователей
CREATE TABLE IF NOT EXISTS knowledge_base (
    id SERIAL PRIMARY KEY,
    target_type VARCHAR(20) NOT NULL CHECK (target_type IN ('masseur', 'salon', 'school', 'user')),
    category VARCHAR(100) NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица для настроек баз знаний (ссылки на Telegram и т.д.)
CREATE TABLE IF NOT EXISTS knowledge_base_settings (
    id SERIAL PRIMARY KEY,
    target_type VARCHAR(20) NOT NULL UNIQUE CHECK (target_type IN ('masseur', 'salon', 'school', 'user')),
    telegram_support_url TEXT DEFAULT 'https://t.me/+QgiLIa1gFRY4Y2Iy',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_kb_target_type ON knowledge_base(target_type);
CREATE INDEX IF NOT EXISTS idx_kb_category ON knowledge_base(category);
CREATE INDEX IF NOT EXISTS idx_kb_order ON knowledge_base(target_type, order_index);

-- Начальные настройки для всех типов
INSERT INTO knowledge_base_settings (target_type, telegram_support_url)
VALUES 
    ('masseur', 'https://t.me/+QgiLIa1gFRY4Y2Iy'),
    ('salon', 'https://t.me/+QgiLIa1gFRY4Y2Iy'),
    ('school', 'https://t.me/+QgiLIa1gFRY4Y2Iy'),
    ('user', 'https://t.me/+QgiLIa1gFRY4Y2Iy')
ON CONFLICT (target_type) DO NOTHING;

COMMENT ON TABLE knowledge_base IS 'База знаний (FAQ) для разных типов пользователей';
COMMENT ON TABLE knowledge_base_settings IS 'Настройки баз знаний (ссылки на поддержку и т.д.)';
