-- Добавляем значение 'client' в ENUM user_role
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'client';