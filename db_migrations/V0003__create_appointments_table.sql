-- Создаем таблицу записей к массажистам
CREATE TABLE t_p46047379_doc_dialog_ecosystem.appointments (
    id SERIAL PRIMARY KEY,
    masseur_id INTEGER NOT NULL REFERENCES t_p46047379_doc_dialog_ecosystem.masseur_profiles(id),
    client_name VARCHAR(255) NOT NULL,
    client_phone VARCHAR(50) NOT NULL,
    client_email VARCHAR(255),
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    massage_type VARCHAR(100) NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    price DECIMAL(10,2),
    notes TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_appointments_masseur ON t_p46047379_doc_dialog_ecosystem.appointments(masseur_id);
CREATE INDEX idx_appointments_date ON t_p46047379_doc_dialog_ecosystem.appointments(appointment_date);
CREATE INDEX idx_appointments_status ON t_p46047379_doc_dialog_ecosystem.appointments(status);