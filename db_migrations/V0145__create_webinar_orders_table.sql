-- Создание таблицы для заявок на автовебинары
CREATE TABLE IF NOT EXISTS t_p46047379_doc_dialog_ecosystem.webinar_orders (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    school_name VARCHAR(500) NOT NULL,
    webinar_topic TEXT NOT NULL,
    webinar_goal TEXT NOT NULL,
    package_type VARCHAR(50) NOT NULL CHECK (package_type IN ('setup', 'four', 'eight')),
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,
    additional_info TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание индекса для быстрого поиска по user_id
CREATE INDEX IF NOT EXISTS idx_webinar_orders_user_id ON t_p46047379_doc_dialog_ecosystem.webinar_orders(user_id);

-- Создание индекса для фильтрации по статусу
CREATE INDEX IF NOT EXISTS idx_webinar_orders_status ON t_p46047379_doc_dialog_ecosystem.webinar_orders(status);

-- Комментарии к таблице и полям
COMMENT ON TABLE t_p46047379_doc_dialog_ecosystem.webinar_orders IS 'Заявки школ на размещение автовебинаров';
COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.webinar_orders.package_type IS 'Тип тарифа: setup (5000 руб), four (5000 руб/мес за 4 трансляции), eight (8000 руб/мес за 8 трансляций)';
COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.webinar_orders.status IS 'Статус заявки: pending - в обработке, processing - в работе, completed - готово, cancelled - отменено';
