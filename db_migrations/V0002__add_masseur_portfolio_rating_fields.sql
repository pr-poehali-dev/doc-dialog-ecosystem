-- Добавляем поля для сертификатов, портфолио и рейтинга массажистов
ALTER TABLE t_p46047379_doc_dialog_ecosystem.masseur_profiles
ADD COLUMN certificates TEXT[], -- Массив ссылок на сертификаты
ADD COLUMN portfolio_images TEXT[], -- Массив ссылок на фото работ
ADD COLUMN rating DECIMAL(3,2) DEFAULT 0.00, -- Средний рейтинг (0.00 - 5.00)
ADD COLUMN reviews_count INTEGER DEFAULT 0, -- Количество отзывов
ADD COLUMN education TEXT, -- Образование
ADD COLUMN languages VARCHAR(255)[]; -- Языки общения

-- Индекс для быстрого поиска по рейтингу
CREATE INDEX idx_masseur_rating ON t_p46047379_doc_dialog_ecosystem.masseur_profiles(rating DESC);