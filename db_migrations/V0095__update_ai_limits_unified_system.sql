-- Обновление системы лимитов: единый счётчик для диалогов и инструментов
-- Бесплатный тариф: 5 использований в месяц

-- Увеличиваем дефолтный лимит с 3 до 5
ALTER TABLE specialists ALTER COLUMN ai_dialogs_limit SET DEFAULT 5;

-- Добавляем колонку для счётчика использования инструментов
ALTER TABLE specialists ADD COLUMN IF NOT EXISTS ai_tools_used INTEGER DEFAULT 0;

-- Обновляем всех существующих пользователей: ставим лимит 5
UPDATE specialists SET ai_dialogs_limit = 5 WHERE ai_dialogs_limit = 3;

-- Добавляем комментарии для ясности
COMMENT ON COLUMN specialists.ai_dialogs_limit IS 'Общий лимит AI-операций в месяц (диалоги + инструменты)';
COMMENT ON COLUMN specialists.ai_dialogs_used IS 'Использовано AI-диалогов в месяц';
COMMENT ON COLUMN specialists.ai_tools_used IS 'Использовано AI-инструментов в месяц';