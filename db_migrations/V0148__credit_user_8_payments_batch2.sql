-- Зачисление последних платежей пользователю 8
-- Теперь бонус первой покупки уже использован, поэтому без удвоения

UPDATE t_p46047379_doc_dialog_ecosystem.users 
SET extra_requests = COALESCE(extra_requests, 0) + 10
WHERE id = 8;

-- Обновляем статусы платежей
UPDATE t_p46047379_doc_dialog_ecosystem.payment_logs
SET status = 'succeeded',
    updated_at = NOW()
WHERE payment_id IN ('310166f8-000f-5000-b000-137a83544140', '310166ee-000f-5001-8000-10d1ea04c1b9');
