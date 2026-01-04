-- Hide test masterminds by changing their status to rejected
UPDATE masterminds 
SET status = 'rejected', 
    moderation_comment = 'Тестовая запись - удалена автоматически'
WHERE title = 'Test Mastermind' AND status = 'pending';