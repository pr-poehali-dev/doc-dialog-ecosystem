-- Add missing columns to courses table for simple form submission
ALTER TABLE t_p46047379_doc_dialog_ecosystem.courses 
ADD COLUMN IF NOT EXISTS start_date TIMESTAMP,
ADD COLUMN IF NOT EXISTS end_date TIMESTAMP,
ADD COLUMN IF NOT EXISTS format VARCHAR(100);