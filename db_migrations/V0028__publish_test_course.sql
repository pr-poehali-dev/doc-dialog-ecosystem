-- Публикуем существующий курс
UPDATE courses 
SET is_published = true
WHERE school_id = 1 AND id = 17;
