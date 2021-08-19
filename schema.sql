CREATE DATABASE products;

CREATE TABLE product_inventory (
  id INTEGER PRIMARY KEY,
  name VARCHAR (64) NOT NULL,
  slogan VARCHAR (128) NOT NULL,
  description VARCHAR (512) NOT NULL,
  category VARCHAR (64) NOT NULL,
  default_price INTEGER NOT NULL
);

CREATE TABLE related_products (
  id INTEGER PRIMARY KEY,
  current_product_id INTEGER REFERENCES product_inventory(id),
  related_product_id INTEGER
);

CREATE TABLE product_features (
  id INTEGER PRIMARY KEY,
  product_id INTEGER REFERENCES product_inventory(id) ON DELETE CASCADE,
  feature VARCHAR (32) NOT NULL,
  value VARCHAR (64)
);

CREATE TABLE product_styles (
  style_id INTEGER PRIMARY KEY,
  product_id INTEGER REFERENCES product_inventory(id) ON DELETE CASCADE,
  name VARCHAR (64) NOT NULL,
  sale_price INTEGER,
  original_price INTEGER NOT NULL,
  "default?" BOOLEAN NOT NULL
);

CREATE TABLE product_photos (
  id INTEGER PRIMARY KEY,
  style_id INTEGER REFERENCES product_styles(style_id),
  thumbnail_url TEXT,
  url TEXT
);

CREATE TABLE skus (
  id INTEGER PRIMARY KEY,
  style_id INTEGER REFERENCES product_styles(style_id),
  size VARCHAR (8) NOT NULL,
  quantity INTEGER NOT NULL
);