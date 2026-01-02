-- Add landing page fields to masterminds
ALTER TABLE t_p46047379_doc_dialog_ecosystem.masterminds
ADD COLUMN IF NOT EXISTS original_price NUMERIC(10, 2),
ADD COLUMN IF NOT EXISTS discount_price NUMERIC(10, 2),
ADD COLUMN IF NOT EXISTS author_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS author_photo TEXT,
ADD COLUMN IF NOT EXISTS event_content TEXT;

COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.masterminds.original_price IS 'Original price before discount';
COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.masterminds.discount_price IS 'Discounted price';
COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.masterminds.author_name IS 'Name of mastermind host';
COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.masterminds.author_photo IS 'URL to host photo';
COMMENT ON COLUMN t_p46047379_doc_dialog_ecosystem.masterminds.event_content IS 'Detailed mastermind program/agenda';