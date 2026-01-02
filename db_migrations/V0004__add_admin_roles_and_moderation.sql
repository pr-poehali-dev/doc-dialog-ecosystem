-- Add admin role to users table
ALTER TABLE t_p46047379_doc_dialog_ecosystem.users 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS is_moderator BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW();

-- Create moderation_logs table for tracking all user actions
CREATE TABLE IF NOT EXISTS t_p46047379_doc_dialog_ecosystem.moderation_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES t_p46047379_doc_dialog_ecosystem.users(id),
    action_type VARCHAR(50) NOT NULL, -- 'profile_update', 'appointment_create', 'review_create', etc
    entity_type VARCHAR(50) NOT NULL, -- 'profile', 'appointment', 'review', etc
    entity_id INTEGER,
    old_data JSONB,
    new_data JSONB,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    moderator_id INTEGER REFERENCES t_p46047379_doc_dialog_ecosystem.users(id),
    moderation_comment TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    moderated_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_moderation_logs_status ON t_p46047379_doc_dialog_ecosystem.moderation_logs(status);
CREATE INDEX IF NOT EXISTS idx_moderation_logs_user_id ON t_p46047379_doc_dialog_ecosystem.moderation_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_moderation_logs_created_at ON t_p46047379_doc_dialog_ecosystem.moderation_logs(created_at DESC);

-- Add moderation status to appointments
ALTER TABLE t_p46047379_doc_dialog_ecosystem.appointments
ADD COLUMN IF NOT EXISTS moderation_status VARCHAR(20) DEFAULT 'approved';

-- Add moderation status to reviews
ALTER TABLE t_p46047379_doc_dialog_ecosystem.reviews
ADD COLUMN IF NOT EXISTS moderation_status VARCHAR(20) DEFAULT 'pending';