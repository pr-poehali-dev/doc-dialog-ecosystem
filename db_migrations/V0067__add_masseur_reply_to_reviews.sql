-- Добавляем колонку для ответа массажиста на отзывы
ALTER TABLE t_p46047379_doc_dialog_ecosystem.reviews 
ADD COLUMN masseur_reply text NULL,
ADD COLUMN masseur_reply_at timestamp without time zone NULL;