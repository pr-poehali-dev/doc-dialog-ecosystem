CREATE TABLE IF NOT EXISTS t_p46047379_doc_dialog_ecosystem.payment_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES t_p46047379_doc_dialog_ecosystem.users(id),
    payment_id VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    type VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_payment_logs_user_id ON t_p46047379_doc_dialog_ecosystem.payment_logs(user_id);
CREATE INDEX idx_payment_logs_payment_id ON t_p46047379_doc_dialog_ecosystem.payment_logs(payment_id);
CREATE INDEX idx_payment_logs_status ON t_p46047379_doc_dialog_ecosystem.payment_logs(status);