-- Add discount price fields to courses table
ALTER TABLE t_p46047379_doc_dialog_ecosystem.courses
ADD COLUMN IF NOT EXISTS original_price NUMERIC(10, 2),
ADD COLUMN IF NOT EXISTS discount_price NUMERIC(10, 2);

COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.courses.original_price IS 'Original price before discount (crossed out)';
COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.courses.discount_price IS 'Discounted price (shown in red)';