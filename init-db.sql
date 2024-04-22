CREATE TABLE services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    address TEXT NOT NULL,
    method TEXT NOT NULL,
    headers TEXT NOT NULL,
    response_code INTEGER NOT NULL,
    response_format TEXT NOT NULL,
    response_body TEXT NOT NULL
);

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    hashed_password TEXT NOT NULL,
    disabled INTEGER
);

INSERT INTO users(username, hashed_password, disabled)
VALUES('admin', '$2b$12$mgmwSyKmpR4c2r.y0haroeAQhfePypxz7r9VP9Iao5aPaR/4zeaD2', 0);