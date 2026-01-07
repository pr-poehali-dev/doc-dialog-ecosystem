-- Удаляем внешний ключ на school_id, чтобы позволить массажистам иметь транзакции с любыми значениями
ALTER TABLE t_p46047379_doc_dialog_ecosystem.balance_transactions 
DROP CONSTRAINT IF EXISTS balance_transactions_school_id_fkey;