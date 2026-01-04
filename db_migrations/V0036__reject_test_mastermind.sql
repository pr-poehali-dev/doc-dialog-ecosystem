-- Отклонение тестового мастермайнда
UPDATE t_p46047379_doc_dialog_ecosystem.masterminds 
SET status = 'rejected', moderation_comment = 'Тестовая запись - удалена автоматически'
WHERE id = 26 AND title = 'Test Mastermind' AND slug = 'test-mastermind-9' AND status = 'pending';