-- Добавляем поле для отслеживания первой покупки запросов
ALTER TABLE t_p46047379_doc_dialog_ecosystem.users 
ADD COLUMN first_purchase_bonus_used BOOLEAN NOT NULL DEFAULT false;

COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.users.first_purchase_bonus_used 
IS 'Использован ли бонус за первую покупку запросов (удвоение количества)';