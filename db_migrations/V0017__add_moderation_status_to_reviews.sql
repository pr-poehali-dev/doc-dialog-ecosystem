-- Добавление системы модерации для отзывов

ALTER TABLE t_p46047379_doc_dialog_ecosystem.course_reviews
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'pending';

ALTER TABLE t_p46047379_doc_dialog_ecosystem.course_reviews
ADD CONSTRAINT chk_course_reviews_status CHECK (status IN ('pending', 'approved', 'rejected'));

-- Автоматически одобряем все существующие отзывы (включая автоматические)
UPDATE t_p46047379_doc_dialog_ecosystem.course_reviews
SET status = 'approved'
WHERE status = 'pending';

-- Создаём индекс для быстрой выборки по статусу
CREATE INDEX IF NOT EXISTS idx_course_reviews_status ON t_p46047379_doc_dialog_ecosystem.course_reviews(status);

COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.course_reviews.status IS 'Статус модерации отзыва: pending (на модерации), approved (одобрен), rejected (отклонён)';