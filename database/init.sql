BEGIN;

DROP TABLE IF EXISTS shop_users, products CASCADE;

CREATE TABLE shop_users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(20) NOT NULL
);

CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(30) NOT NULL,
    price INTEGER,
    quantity INTEGER
);

CREATE TABLE cart(
    id SERIAL PRIMARY KEY,
    product_Id INTEGER,
    quantity INTEGER,
    userId INTEGER
);

COMMIT;