-- Update courses table structure
ALTER TABLE t_p46047379_doc_dialog_ecosystem.courses 
ADD COLUMN IF NOT EXISTS category VARCHAR(100),
ADD COLUMN IF NOT EXISTS course_type VARCHAR(50),
ADD COLUMN IF NOT EXISTS currency VARCHAR(10) DEFAULT 'RUB',
ADD COLUMN IF NOT EXISTS external_url TEXT,
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS moderation_comment TEXT,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS approved_at TIMESTAMP,
ADD COLUMN IF NOT EXISTS approved_by INTEGER REFERENCES t_p46047379_doc_dialog_ecosystem.users(id);

-- Rename cover_url to image_url for consistency
ALTER TABLE t_p46047379_doc_dialog_ecosystem.courses 
RENAME COLUMN cover_url TO image_url;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_courses_school ON t_p46047379_doc_dialog_ecosystem.courses(school_id);
CREATE INDEX IF NOT EXISTS idx_courses_status ON t_p46047379_doc_dialog_ecosystem.courses(status);
CREATE INDEX IF NOT EXISTS idx_courses_category ON t_p46047379_doc_dialog_ecosystem.courses(category);

-- Create masterminds table
CREATE TABLE IF NOT EXISTS t_p46047379_doc_dialog_ecosystem.masterminds (
    id SERIAL PRIMARY KEY,
    school_id INTEGER REFERENCES t_p46047379_doc_dialog_ecosystem.users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date TIMESTAMP NOT NULL,
    location VARCHAR(255),
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    price DECIMAL(10, 2),
    currency VARCHAR(10) DEFAULT 'RUB',
    image_url TEXT,
    external_url TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    moderation_comment TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    approved_at TIMESTAMP,
    approved_by INTEGER REFERENCES t_p46047379_doc_dialog_ecosystem.users(id)
);

CREATE INDEX IF NOT EXISTS idx_masterminds_school ON t_p46047379_doc_dialog_ecosystem.masterminds(school_id);
CREATE INDEX IF NOT EXISTS idx_masterminds_status ON t_p46047379_doc_dialog_ecosystem.masterminds(status);
CREATE INDEX IF NOT EXISTS idx_masterminds_date ON t_p46047379_doc_dialog_ecosystem.masterminds(event_date);

-- Create specialist requests table
CREATE TABLE IF NOT EXISTS t_p46047379_doc_dialog_ecosystem.specialist_requests (
    id SERIAL PRIMARY KEY,
    school_id INTEGER REFERENCES t_p46047379_doc_dialog_ecosystem.users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    specialty VARCHAR(100) NOT NULL,
    budget_from DECIMAL(10, 2),
    budget_to DECIMAL(10, 2),
    currency VARCHAR(10) DEFAULT 'RUB',
    location VARCHAR(255),
    deadline_date DATE,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_specialist_requests_school ON t_p46047379_doc_dialog_ecosystem.specialist_requests(school_id);
CREATE INDEX IF NOT EXISTS idx_specialist_requests_status ON t_p46047379_doc_dialog_ecosystem.specialist_requests(status);

-- Add is_school flag to users table
ALTER TABLE t_p46047379_doc_dialog_ecosystem.users 
ADD COLUMN IF NOT EXISTS is_school BOOLEAN DEFAULT FALSE;

-- Add school_name to users table
ALTER TABLE t_p46047379_doc_dialog_ecosystem.users 
ADD COLUMN IF NOT EXISTS school_name VARCHAR(255);