-- Удаляем NOT NULL constraint для school_id

ALTER TABLE t_p46047379_doc_dialog_ecosystem.balance_transactions 
DROP CONSTRAINT IF EXISTS "409817_415982_2_not_null";