CREATE TABLE order_products(
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL FOREIGN KEY REFERENCES orders(id),
    product_id INTEGER NOT NULL FOREIGN KEY REFERENCES products(id),
    quantity INTEGER NOT NULL
);