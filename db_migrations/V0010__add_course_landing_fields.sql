-- Add fields for course landing page
ALTER TABLE t_p46047379_doc_dialog_ecosystem.courses
ADD COLUMN IF NOT EXISTS author_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS author_photo TEXT,
ADD COLUMN IF NOT EXISTS course_content TEXT;

COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.courses.author_name IS 'Name of course author/instructor';
COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.courses.author_photo IS 'URL to author photo';
COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.courses.course_content IS 'Detailed course content/curriculum';