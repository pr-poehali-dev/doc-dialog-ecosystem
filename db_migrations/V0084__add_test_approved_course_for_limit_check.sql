-- Создаём тестовый approved курс для проверки лимитов
INSERT INTO t_p46047379_doc_dialog_ecosystem.courses 
(school_id, title, description, category, course_type, external_url, slug, status, created_at) 
VALUES 
(5, 'Тестовый активный курс', 'Для проверки лимитов тарифного плана', 'Классический массаж', 'online', 'https://test.com', 'test-course-active-limit', 'approved', NOW());