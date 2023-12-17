
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
    id_product VARCHAR,
    id_user VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);


CREATE TABLE address (
    id VARCHAR PRIMARY KEY,
    name VARCHAR, 
    users_id VARCHAR,
    address_as VARCHAR, 
    address VARCHAR,
    phone VARCHAR, 
    postal_code VARCHAR, 
    city VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);



-- 
-- CREATE TABLE payment (
--     id VARCHAR PRIMARY KEY,
--     id_order VARCHAR,
--     id_user VARCHAR,
--     total INT,
--     status VARCHAR,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP
-- );

-- CREATE TABLE order_detail(
--     id VARCHAR PRIMARY KEY,
--     id_order VARCHAR,
--     id_product VARCHAR,
--     quantity_order INT,
--     price INT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP
-- );

-- CREATE TABLE order_history(
--     id VARCHAR PRIMARY KEY,
--     id_order VARCHAR,
--     id_product VARCHAR,
--     quantity_order INT,
--     price INT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP
-- );

-- CREATE TABLE order_status(
--     id VARCHAR PRIMARY KEY,
--     id_order VARCHAR,
--     status VARCHAR,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP
-- );

-- CREATE TABLE wishlist(
--     id VARCHAR PRIMARY KEY,
--     id_user VARCHAR,
--     id_product VARCHAR,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP
-- );

-- CREATE TABLE review(
--     id VARCHAR PRIMARY KEY,
--     id_product VARCHAR,
--     id_user VARCHAR,
--     rating INT,
--     review VARCHAR,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP
-- );

-- CREATE TABLE cart(
--     id VARCHAR PRIMARY KEY,
--     id_user VARCHAR,
--     id_product VARCHAR,
--     quantity INT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP
-- );

-- CREATE TABLE cart_history(
--     id VARCHAR PRIMARY KEY,
--     id_user VARCHAR,
--     id_product VARCHAR,
--     quantity INT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP
-- );

-- CREATE TABLE product_history(
--     id VARCHAR PRIMARY KEY,
--     name VARCHAR,
--     stock INT,
--     price INT,
--     photo VARCHAR,
--     description VARCHAR,
--     id_category VARCHAR,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP
-- );

-- CREATE TABLE address_history(
--     id VARCHAR PRIMARY KEY,
--     name VARCHAR, 
--     users_id VARCHAR,
--     address_as VARCHAR, 
--     address VARCHAR,
--     phone VARCHAR, 
--     postal_code VARCHAR, 
--     city VARCHAR,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP
-- );

-- CREATE TABLE product_category(
--     id VARCHAR PRIMARY KEY,
--     id_product VARCHAR,
--     id_category VARCHAR,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP
-- );

-- CREATE TABLE product_photo(
--     id VARCHAR PRIMARY KEY,
--     id_product VARCHAR,
--     photo VARCHAR,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP
-- );


-- CREATE TABLE payment (
--     id VARCHAR PRIMARY KEY,
--     id_order VARCHAR,
--     users_id VARCHAR,
--     total INT,
--     payment_method VARCHAR,
--     status VARCHAR,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP
-- );

-- CREATE TABLE order_details (
--     id VARCHAR PRIMARY KEY,
--     id_order VARCHAR,
--     id_product VARCHAR,
--     size VARCHAR,
--     quantity_order INT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP
-- );

-- CREATE TABLE wishlist (
--     id VARCHAR PRIMARY KEY,
--     id_product VARCHAR,
--     id_user VARCHAR,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP
-- );

-- CREATE TABLE review (
--     id VARCHAR PRIMARY KEY,
--     id_product VARCHAR,
--     id_user VARCHAR,
--     review VARCHAR,
--     rating INT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP
-- );

-- CREATE TABLE transaction (
--     id VARCHAR PRIMARY KEY,
--     id_order VARCHAR,
--     id_user VARCHAR,
--     total INT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP
-- );