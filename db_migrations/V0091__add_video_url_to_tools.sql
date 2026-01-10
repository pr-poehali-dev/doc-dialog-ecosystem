-- Добавляем поле для видео из Кинескопа
ALTER TABLE tools ADD COLUMN IF NOT EXISTS video_url TEXT;