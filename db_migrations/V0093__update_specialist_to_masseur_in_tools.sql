-- Временно удаляем constraint
ALTER TABLE t_p46047379_doc_dialog_ecosystem.tools DROP CONSTRAINT IF EXISTS tools_target_role_check;

-- Обновляем specialist на masseur
UPDATE t_p46047379_doc_dialog_ecosystem.tools SET target_role = 'masseur' WHERE target_role = 'specialist';

-- Добавляем правильный constraint
ALTER TABLE t_p46047379_doc_dialog_ecosystem.tools 
ADD CONSTRAINT tools_target_role_check 
CHECK (target_role IN ('school', 'salon', 'masseur'));