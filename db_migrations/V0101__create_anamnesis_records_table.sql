CREATE TABLE IF NOT EXISTS t_p46047379_doc_dialog_ecosystem.anamnesis_records (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    client_full_name VARCHAR(255) NOT NULL,
    client_age INTEGER,
    client_gender VARCHAR(20),
    main_complaint TEXT NOT NULL,
    complaint_duration VARCHAR(255),
    pain_location VARCHAR(255),
    pain_intensity VARCHAR(10),
    pain_character VARCHAR(255),
    chronic_diseases TEXT,
    medications TEXT,
    injuries TEXT,
    surgeries TEXT,
    lifestyle VARCHAR(500),
    physical_activity TEXT,
    sleep VARCHAR(255),
    stress VARCHAR(255),
    goals TEXT,
    contraindications TEXT,
    additional_info TEXT,
    ai_analysis TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_anamnesis_user_id ON t_p46047379_doc_dialog_ecosystem.anamnesis_records(user_id);
CREATE INDEX idx_anamnesis_created_at ON t_p46047379_doc_dialog_ecosystem.anamnesis_records(created_at DESC);