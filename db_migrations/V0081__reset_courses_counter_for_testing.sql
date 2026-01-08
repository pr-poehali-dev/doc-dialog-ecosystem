-- Сброс счетчика курсов для тестирования тарифной системы
UPDATE t_p46047379_doc_dialog_ecosystem.schools 
SET courses_published_this_month = 0 
WHERE id = 6;