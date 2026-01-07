-- Добавляем order_id в таблицу reviews для связи отзыва с конкретным заказом
ALTER TABLE t_p46047379_doc_dialog_ecosystem.reviews
ADD COLUMN order_id INTEGER REFERENCES t_p46047379_doc_dialog_ecosystem.service_orders(id);

-- Создаём индекс для быстрого поиска отзывов по заказу
CREATE INDEX idx_reviews_order_id ON t_p46047379_doc_dialog_ecosystem.reviews(order_id);