-- Таблица для подписок на платные шаблоны лендингов
CREATE TABLE IF NOT EXISTS t_p46047379_doc_dialog_ecosystem.landing_template_subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    template_type VARCHAR(50) NOT NULL, -- 'premium', 'luxury'
    started_at TIMESTAMP NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    payment_amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_template_subscriptions_user ON t_p46047379_doc_dialog_ecosystem.landing_template_subscriptions(user_id);
CREATE INDEX idx_template_subscriptions_active ON t_p46047379_doc_dialog_ecosystem.landing_template_subscriptions(user_id, is_active, expires_at);

COMMENT ON TABLE t_p46047379_doc_dialog_ecosystem.landing_template_subscriptions IS 'Подписки на платные шаблоны лендингов (3 месяца)';
COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.landing_template_subscriptions.template_type IS 'Тип шаблона: premium, luxury';
COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.landing_template_subscriptions.expires_at IS 'Дата окончания подписки (3 месяца от started_at)';
COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.landing_template_subscriptions.is_active IS 'Активна ли подписка (автоматически false после expires_at)';