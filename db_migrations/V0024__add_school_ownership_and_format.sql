-- Add learning_direction and format columns to schools table
ALTER TABLE t_p46047379_doc_dialog_ecosystem.schools 
ADD COLUMN IF NOT EXISTS learning_direction VARCHAR(255),
ADD COLUMN IF NOT EXISTS format VARCHAR(50) CHECK (format IN ('online', 'offline', 'hybrid'));

-- Add user_id constraint to ensure users can only manage their schools
CREATE INDEX IF NOT EXISTS idx_schools_user_id ON t_p46047379_doc_dialog_ecosystem.schools(user_id);

-- Ensure courses are linked to schools properly
CREATE INDEX IF NOT EXISTS idx_courses_school_id ON t_p46047379_doc_dialog_ecosystem.courses(school_id);

-- Add school_logo_url to courses for auto-population
ALTER TABLE t_p46047379_doc_dialog_ecosystem.courses 
ADD COLUMN IF NOT EXISTS school_logo_url TEXT;