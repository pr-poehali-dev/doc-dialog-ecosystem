-- Таблица для хранения настроек платёжных систем
CREATE TABLE IF NOT EXISTS payment_settings (
    id SERIAL PRIMARY KEY,
    yoomoney_shop_id TEXT DEFAULT '',
    yoomoney_secret_key TEXT DEFAULT '',
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Вставляем начальную запись
INSERT INTO payment_settings (yoomoney_shop_id, yoomoney_secret_key)
VALUES ('', '')
ON CONFLICT DO NOTHING;
