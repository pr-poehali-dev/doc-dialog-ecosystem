-- Добавляем поддержку offline_training в отзывы
ALTER TABLE t_p46047379_doc_dialog_ecosystem.course_reviews 
DROP CONSTRAINT IF EXISTS chk_course_reviews_entity_type;

ALTER TABLE t_p46047379_doc_dialog_ecosystem.course_reviews 
ADD CONSTRAINT chk_course_reviews_entity_type 
CHECK (entity_type IN ('course', 'mastermind', 'offline_training'));
