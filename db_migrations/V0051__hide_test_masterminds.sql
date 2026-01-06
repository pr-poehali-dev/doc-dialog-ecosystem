-- Скрываем тестовые мастермайнды, меняя статус на rejected
UPDATE t_p46047379_doc_dialog_ecosystem.masterminds 
SET status = 'rejected',
    moderation_comment = 'Тестовые данные - скрыты'
WHERE title = 'Test Mastermind' AND description = 'Test description';