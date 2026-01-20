-- Обрабатываем все pending платежи за AI-подписки
-- Для каждого пользователя берём только последний платёж

WITH latest_payments AS (
  SELECT DISTINCT ON (user_id)
    id,
    user_id,
    payment_id,
    metadata
  FROM t_p46047379_doc_dialog_ecosystem.payment_logs
  WHERE type = 'ai_subscription'
    AND status = 'pending'
    AND created_at > NOW() - INTERVAL '24 hours'
  ORDER BY user_id, created_at DESC
)
UPDATE t_p46047379_doc_dialog_ecosystem.users u
SET 
  ai_dialogs_limit = (lp.metadata->>'operations')::INTEGER,
  subscription_tier = lp.metadata->>'plan',
  subscription_expires = NOW() + INTERVAL '30 days'
FROM latest_payments lp
WHERE u.id = lp.user_id;

-- Обновляем статус всех pending платежей на succeeded
UPDATE t_p46047379_doc_dialog_ecosystem.payment_logs
SET status = 'succeeded', updated_at = NOW()
WHERE type = 'ai_subscription'
  AND status = 'pending'
  AND created_at > NOW() - INTERVAL '24 hours';
