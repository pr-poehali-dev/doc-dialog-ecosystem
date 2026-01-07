CREATE TABLE IF NOT EXISTS t_p46047379_doc_dialog_ecosystem.favorites (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    masseur_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, masseur_id)
);

CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON t_p46047379_doc_dialog_ecosystem.favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_masseur_id ON t_p46047379_doc_dialog_ecosystem.favorites(masseur_id);