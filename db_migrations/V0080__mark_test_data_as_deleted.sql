-- Помечаем тестовые мастермайнды как rejected (чтобы они не показывались в каталоге)
UPDATE t_p46047379_doc_dialog_ecosystem.masterminds 
SET status = 'rejected' 
WHERE status = 'approved';

-- Помечаем очные обучения как rejected
UPDATE t_p46047379_doc_dialog_ecosystem.offline_training 
SET status = 'rejected' 
WHERE status = 'approved';