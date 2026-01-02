-- Add view counter to courses and masterminds
ALTER TABLE t_p46047379_doc_dialog_ecosystem.courses
ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

ALTER TABLE t_p46047379_doc_dialog_ecosystem.masterminds
ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.courses.view_count IS 'Number of times course landing page was viewed';
COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.masterminds.view_count IS 'Number of times mastermind landing page was viewed';