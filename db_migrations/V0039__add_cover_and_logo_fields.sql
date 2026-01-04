ALTER TABLE t_p46047379_doc_dialog_ecosystem.offline_training 
ADD COLUMN IF NOT EXISTS cover_url TEXT,
ADD COLUMN IF NOT EXISTS school_logo_url TEXT;

ALTER TABLE t_p46047379_doc_dialog_ecosystem.masterminds 
ADD COLUMN IF NOT EXISTS cover_url TEXT,
ADD COLUMN IF NOT EXISTS school_logo_url TEXT;

ALTER TABLE t_p46047379_doc_dialog_ecosystem.courses 
ADD COLUMN IF NOT EXISTS cover_url TEXT,
ADD COLUMN IF NOT EXISTS school_logo_url TEXT;