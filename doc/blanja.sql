-- Tabel users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel customer
CREATE TABLE customers(
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(255),
  gender VARCHAR(255),
  date_of_birth DATE,
  photo VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP 
);

-- Tabel seller
CREATE TABLE sellers(
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  store_name VARCHAR(255) NOT NULL,
  store_description TEXT,
  photo VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP
);

--Tabel category
CREATE TABLE category(
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  photo VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP 
);

-- Table products
CREATE TABLE products (
  id UUID PRIMARY KEY,
  category_id UUID REFERENCES category(id) ON DELETE CASCADE,
  seller_id UUID REFERENCES sellers(id) ON DELETE CASCADE,
  product_name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER NOT NULL,
  description TEXT,
  photo VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP
);

-- Table orders
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  seller_id UUID REFERENCES sellers(id) ON DELETE CASCADE,
  total_price NUMERIC(10, 2) NOT NULL,
  status VARCHAR(255) NOT NULL,
  payment_method VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP
);


-- Table order_items
CREATE TABLE order_items (
  id UUID PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP
);



-- Table ratings
CREATE TABLE ratings (
  id UUID PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL,
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP 
);

-- Table address
CREATE TABLE address (
  id UUID PRIMARY KEY,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  address_as VARCHAR(255) NOT NULL,
  recipient_name VARCHAR(255) NOT NULL,
  recipient_phone VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  postal_code VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  primary_address BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP 
);

-- Table sliders
CREATE TABLE sliders (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  photo VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP 
);

