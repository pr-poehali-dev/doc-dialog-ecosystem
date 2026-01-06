-- Добавляем поля для поддержки заявок на запись в таблицу messages
ALTER TABLE messages ADD COLUMN IF NOT EXISTS message_type VARCHAR(50) DEFAULT 'text';
ALTER TABLE messages ADD COLUMN IF NOT EXISTS booking_data JSONB;

-- Создаем индекс для фильтрации заявок
CREATE INDEX IF NOT EXISTS idx_messages_type ON messages(message_type);
CREATE INDEX IF NOT EXISTS idx_messages_booking_pending ON messages(message_type, receiver_id) 
    WHERE message_type = 'booking_request';