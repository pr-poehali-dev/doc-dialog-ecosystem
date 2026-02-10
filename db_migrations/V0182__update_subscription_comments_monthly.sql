-- Обновление комментариев для ежемесячных подписок
COMMENT ON TABLE t_p46047379_doc_dialog_ecosystem.landing_template_subscriptions IS 'Ежемесячные подписки на платные шаблоны лендингов (Premium 300₽/мес, Super Premium 500₽/мес)';
COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.landing_template_subscriptions.expires_at IS 'Дата окончания подписки (30 дней от started_at)';