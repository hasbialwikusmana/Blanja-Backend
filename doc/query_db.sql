
CREATE TABLE users(
    id VARCHAR PRIMARY KEY,
    name VARCHAR,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    phone VARCHAR,
    store_name VARCHAR,
    photo VARCHAR,
    role VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);


CREATE TABLE products(
    id VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL,
    stock INT NOT NULL,
    price INT NOT NULL,
    photo VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    id_category VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);


CREATE TABLE category(
    id VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL,
    photo VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE order_list (
    id_order VARCHAR PRIMARY KEY,
    size VARCHAR,
    quantity_order INT,
    date_order TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_products VARCHAR,
    id_users VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE address (
    id VARCHAR PRIMARY KEY,
    name VARCHAR(50), 
    users_id VARCHAR,
    address_as VARCHAR(250), 
    address VARCHAR(250), 
    phone VARCHAR(20), 
    postal_code VARCHAR(10), 
    city VARCHAR(50) ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

