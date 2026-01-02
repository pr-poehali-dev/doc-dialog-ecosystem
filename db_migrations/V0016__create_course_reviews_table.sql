-- Создание таблицы для отзывов к курсам и мастермайндам

CREATE TABLE t_p46047379_doc_dialog_ecosystem.course_reviews (
    id SERIAL PRIMARY KEY,
    entity_type VARCHAR(50) NOT NULL,
    entity_id INTEGER NOT NULL,
    user_id INTEGER,
    user_email VARCHAR(255),
    user_name VARCHAR(255),
    rating INTEGER NOT NULL,
    comment TEXT NOT NULL,
    is_auto_generated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE t_p46047379_doc_dialog_ecosystem.course_reviews ADD CONSTRAINT chk_course_reviews_entity_type CHECK (entity_type IN ('course', 'mastermind'));
ALTER TABLE t_p46047379_doc_dialog_ecosystem.course_reviews ADD CONSTRAINT chk_course_reviews_rating CHECK (rating >= 1 AND rating <= 5);

CREATE INDEX idx_course_reviews_entity ON t_p46047379_doc_dialog_ecosystem.course_reviews(entity_type, entity_id);
CREATE INDEX idx_course_reviews_user ON t_p46047379_doc_dialog_ecosystem.course_reviews(user_id);