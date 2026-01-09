-- Add updated_at column to salons table
ALTER TABLE t_p46047379_doc_dialog_ecosystem.salons 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Set initial value for existing rows
UPDATE t_p46047379_doc_dialog_ecosystem.salons 
SET updated_at = created_at 
WHERE updated_at IS NULL;