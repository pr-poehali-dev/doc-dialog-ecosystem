-- Добавляем поля для лимита выводов в топ и счётчика использования
ALTER TABLE subscription_plans 
ADD COLUMN IF NOT EXISTS top_promotions_limit INTEGER NULL;

ALTER TABLE schools 
ADD COLUMN IF NOT EXISTS top_promotions_used_this_month INTEGER DEFAULT 0;

-- Обновляем тарифные планы
UPDATE subscription_plans 
SET top_promotions_limit = NULL 
WHERE id = 1;

UPDATE subscription_plans 
SET top_promotions_limit = 5 
WHERE id = 2;

UPDATE subscription_plans 
SET top_promotions_limit = 15 
WHERE id = 3;

-- Обновляем описания тарифов
UPDATE subscription_plans 
SET description = 'Для начинающих школ: 1 курс в месяц, 5 сообщений в день. Базовая поддержка без дополнительных возможностей.'
WHERE id = 1;

UPDATE subscription_plans 
SET description = 'Для растущих школ: 3 курса в месяц, 5 сообщений в день, 5 выводов курсов в топ каталога.'
WHERE id = 2;

UPDATE subscription_plans 
SET description = 'Для крупных школ: неограниченные курсы и сообщения, 15 выводов в топ, доступ к запросам скидок от массажистов.'
WHERE id = 3;