-- Делаем school_id nullable для поддержки транзакций массажистов

ALTER TABLE t_p46047379_doc_dialog_ecosystem.balance_transactions 
ALTER COLUMN school_id SET DEFAULT NULL;

ALTER TABLE t_p46047379_doc_dialog_ecosystem.balance_transactions 
ALTER COLUMN school_id TYPE INTEGER USING school_id;