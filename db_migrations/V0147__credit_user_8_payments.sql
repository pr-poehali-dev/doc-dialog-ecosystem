-- Зачисление платежей пользователю 8
-- Платёж #8: 60₽ за 5 запросов (x2 = 10 запросов с бонусом первой покупки)
-- Платёж #7: 108₽ за 10 запросов (уже после использования бонуса = 10 запросов)

UPDATE t_p46047379_doc_dialog_ecosystem.users 
SET extra_requests = COALESCE(extra_requests, 0) + 20,
    first_purchase_bonus_used = true
WHERE id = 8;

-- Обновляем статусы платежей
UPDATE t_p46047379_doc_dialog_ecosystem.payment_logs
SET status = 'succeeded',
    updated_at = NOW()
WHERE payment_id IN ('310163c1-000f-5000-b000-1f24fe8855b1', '3101638b-000f-5001-8000-1e2bcd776b2a');
