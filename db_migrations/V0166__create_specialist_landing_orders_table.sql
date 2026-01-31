-- Создаём таблицу для заказов лендингов специалистов

CREATE TABLE IF NOT EXISTS t_p46047379_doc_dialog_ecosystem.specialist_landing_orders (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    specialization TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Индекс для быстрого поиска по пользователю
CREATE INDEX idx_specialist_landing_orders_user_id 
ON t_p46047379_doc_dialog_ecosystem.specialist_landing_orders(user_id);

-- Индекс для поиска по статусу
CREATE INDEX idx_specialist_landing_orders_status 
ON t_p46047379_doc_dialog_ecosystem.specialist_landing_orders(status);

COMMENT ON TABLE t_p46047379_doc_dialog_ecosystem.specialist_landing_orders IS 'Заказы на создание лендингов для специалистов по телу';
COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.specialist_landing_orders.status IS 'Статус заказа: pending, in_progress, completed, cancelled';
