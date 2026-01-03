-- Добавляем image_url и улучшенное описание для тестового курса
UPDATE t_p46047379_doc_dialog_ecosystem.courses 
SET image_url = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
    description = 'Научитесь делать профессиональный массаж всего тела за 3 месяца. Освойте классические техники, изучите анатомию и начните практику с первых занятий.'
WHERE id = 18;