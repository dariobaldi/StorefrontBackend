CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    status VARCHAR(255) NOT NULL,
    CONSTRAINT user_ref FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);