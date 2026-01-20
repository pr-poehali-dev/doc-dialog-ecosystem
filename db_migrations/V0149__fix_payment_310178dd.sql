-- Обновляем статус платежа на succeeded
UPDATE t_p46047379_doc_dialog_ecosystem.payment_logs 
SET status = 'succeeded', 
    updated_at = NOW()
WHERE payment_id = '310178dd-000f-5001-8000-1737ec2fa89b';

-- Начисляем 5 дополнительных запросов пользователю
UPDATE t_p46047379_doc_dialog_ecosystem.users
SET extra_requests = COALESCE(extra_requests, 0) + 5
WHERE id = 8;