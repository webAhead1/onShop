BEGIN;

DROP TABLE IF EXISTS shop_users, products, cart CASCADE;

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
    product_name VARCHAR(50) NOT NULL,
    userid INTEGER
);

INSERT INTO products(product_name, price,quantity) VALUES ('Laptop', 800,5),
('Jacket',100,7),
('Shoes',60,17),
('Window',200,120),
('iphone',1100,52),
('Car',12000,3),
('Airplane',3,2),
('Ship',14,3);

COMMIT;