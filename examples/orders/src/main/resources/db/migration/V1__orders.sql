CREATE TABLE members (username varchar(50) PRIMARY KEY);
INSERT INTO members VALUES ('alice'), ('bob'), ('admin');
CREATE TABLE products (
    id bigint PRIMARY KEY,
    name varchar(100) NOT NULL,
    price bigint NOT NULL CHECK (price >= 0),
    stock integer NOT NULL CHECK (stock >= 0),
    version bigint NOT NULL DEFAULT 0
);
INSERT INTO products (id, name, price, stock) VALUES (1, 'JVM 노트', 12000, 10);
CREATE TABLE customer_orders (
    id uuid PRIMARY KEY,
    owner varchar(50) NOT NULL REFERENCES members(username),
    request_key varchar(64) NOT NULL,
    product_id bigint NOT NULL REFERENCES products(id),
    quantity integer NOT NULL CHECK (quantity > 0),
    total bigint NOT NULL CHECK (total >= 0),
    state varchar(20) NOT NULL CHECK (state IN ('PLACED', 'CANCELLED')),
    created_at timestamptz NOT NULL,
    CONSTRAINT uq_order_request UNIQUE (owner, request_key)
);
CREATE INDEX ix_orders_owner_created ON customer_orders(owner, created_at DESC);
