CREATE TYPE ROLE AS ENUM ('Admin', 'User');
CREATE TYPE SIZE AS ENUM('A2', 'A3', 'A4');
-- User Table
CREATE TABLE "USER" (
"id" SERIAL PRIMARY KEY,
"emailId" VARCHAR(50) NOT NULL UNIQUE,
"password" VARCHAR(20) NOT NULL,
"address" JSON NOT NULL,
"photoURL" VARCHAR(50) DEFAULT '',
"mobile" VARCHAR(10),
"role" ROLE NOT NULL DEFAULT 'User',
"reputation" INTEGER DEFAULT 0
);
-- Category table
CREATE TABLE "CATEGORY"(
"id" SERIAL PRIMARY KEY,
"title" VARCHAR(50) DEFAULT ''
);
-- Product table
CREATE TABLE "PRODUCT"(
"id" SERIAL PRIMARY KEY,
"title" VARCHAR(50) NOT NULL,
"price" INTEGER DEFAULT 0,
"description" VARCHAR(255) DEFAULT '',
"photoURL" VARCHAR(50) DEFAULT '',
"longDescription" VARCHAR(500) DEFAULT '',
"size" SIZE,
"categoryId" INTEGER NOT NULL,

FOREIGN KEY ("categoryId") REFERENCES "CATEGORY" ("id")
);
-- Order table
CREATE TABLE "ORDER"(
"id" SERIAL PRIMARY KEY,
"userId" INTEGER NOT NULL,
"productId" INTEGER NOT NULL,
"quantity" INTEGER NOT NULL,
"date" DATE,
"isDelivered" BOOLEAN DEFAULT FALSE,
"priceBreakdown" JSON,
"userDetail" JSON,
FOREIGN KEY ("userId") REFERENCES "USER"("id"),
FOREIGN KEY ("productId") REFERENCES "PRODUCT"("id")
);
-- Cart table
CREATE TABLE "CART"(
"id" SERIAL PRIMARY KEY,
"userId" INTEGER NOT NULL,
FOREIGN KEY ("userId") REFERENCES "USER"("id")
);
-- Wishlist table
CREATE TABLE "WISHLIST"(
"id" SERIAL PRIMARY KEY,
"userId" INTEGER NOT NULL,
FOREIGN KEY ("userId") REFERENCES "USER"("id")
);
-- Review table
CREATE TABLE "REVIEW"(
"id" SERIAL PRIMARY KEY,
"title" VARCHAR(30),
"body" VARCHAR(255),
"productId" INTEGER NOT NULL,
"userId" INTEGER NOT NULL,
FOREIGN KEY ("userId") REFERENCES "USER"("id"),
FOREIGN KEY ("productId") REFERENCES "PRODUCT"("id")
);

-- Wallet table
CREATE TABLE "WALLET"(
"id" SERIAL PRIMARY KEY,
"amount" INTEGER NOT NULL,
"userId" INTEGER NOT NULL,
FOREIGN KEY ("userId") REFERENCES "USER"("id")
);
-- Transaction table
CREATE TABLE "TRANSACTION"(
"id" SERIAL PRIMARY KEY,
"type" VARCHAR(255) NOT NULL,
"time" DATE NOT NULL,
"from" INTEGER NOT NULL,
"to" INTEGER NOT NULL,
"amount" INTEGER NOT NULL,
"orderId" INTEGER NOT NULL,
FOREIGN KEY ("orderId") REFERENCES "ORDER"("id"),
FOREIGN KEY ("from") REFERENCES "WALLET"("id"),
FOREIGN KEY ("to") REFERENCES "WALLET"("id")
);
-- Table for many to many relationship with product and cart
CREATE TABLE "ProductCart"(
"productId" INTEGER NOT NULL,
"cartId" INTEGER NOT NULL,
PRIMARY KEY ("productId", "cartId"),
FOREIGN KEY ("cartId") REFERENCES "CART"("id"),
FOREIGN KEY ("productId") REFERENCES "PRODUCT"("id")
);
-- Table for many to many relationship with product and wishlist
CREATE TABLE "WishlistProduct"(
"productId" INTEGER NOT NULL,
"wishlistId" INTEGER NOT NULL,
PRIMARY KEY ("productId", "wishlistId"),
FOREIGN KEY ("wishlistId") REFERENCES "WISHLIST"("id"),
FOREIGN KEY ("productId") REFERENCES "PRODUCT"("id")
);