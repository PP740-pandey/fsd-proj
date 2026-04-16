-- Run this in MySQL before starting the Spring Boot app

CREATE DATABASE IF NOT EXISTS ecommerce_db;
USE ecommerce_db;

-- Spring Boot will auto-create tables via JPA (ddl-auto=update)
-- But you can manually create them too:

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DOUBLE NOT NULL,
    quantity INT NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    product_id BIGINT,
    quantity INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Optional: seed some test data
INSERT INTO users (name, email, password) VALUES ('Test User', 'test@test.com', '1234');
INSERT INTO products (name, price, quantity) VALUES ('Laptop', 45000, 10);
INSERT INTO products (name, price, quantity) VALUES ('Phone', 15000, 25);
INSERT INTO products (name, price, quantity) VALUES ('Headphones', 2000, 50);
