-- Убираем возможность отправлять сообщения на базовом тарифе
UPDATE t_p46047379_doc_dialog_ecosystem.subscription_plans 
SET messages_limit_per_day = 0, 
    top_promotions_limit = 0
WHERE name = 'Базовый';