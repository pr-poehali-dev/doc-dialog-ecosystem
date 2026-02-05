-- Переносим курсы к школе webmanager5@yandex.ru (school.id = 7)
UPDATE t_p46047379_doc_dialog_ecosystem.courses
SET school_id = 7
WHERE school_id IN (SELECT id FROM t_p46047379_doc_dialog_ecosystem.schools WHERE user_id = 7);

-- Обновляем запросы на скидку
UPDATE t_p46047379_doc_dialog_ecosystem.promo_requests
SET school_id = 221
WHERE school_id = 7;