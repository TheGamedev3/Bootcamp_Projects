


-- PART 1: PRODUCTS

-- to start up, use git bash:

-- psql -U postgres -f "./sql-querying/seed_products.sql"
-- psql -U postgres -d products_db

-- quit
-- \q


-- see all tables
-- \dt



-- Comments in SQL Start with dash-dash --



--1. Add a product to the table with the name of “chair”, price of 44.00, and can_be_returned of false.
--2. Add a product to the table with the name of “stool”, price of 25.99, and can_be_returned of true.
--3. Add a product to the table with the name of “table”, price of 124.00, and can_be_returned of false.


-- check all

SELECT * FROM products;

-- check before

SELECT * FROM products
    WHERE name IN ('chair', 'stool', 'table');

-- add all 3 in at once with VALUES

INSERT INTO products (id, name, price, can_be_returned)
    VALUES
    (778, 'chair', 44.00, false),
    (779, 'stool', 25.99, true),
    (780, 'table', 124.00, false);

-- check after

SELECT * FROM products
    WHERE name IN ('chair', 'stool', 'table');



-- 4. Display all of the rows and columns in the table.
-- 5. Display all of the names of the products.
-- 6. Display all of the names and prices of the products.

SELECT * FROM products;

SELECT name FROM products;

SELECT name, price FROM products;


-- 7. Add a new product - make up whatever you would like!

INSERT INTO products (id, name, price, can_be_returned)
    VALUES
    (781, 'Smart-Phone-Ultra', 999.00, true);

SELECT * FROM products
    WHERE name = 'Smart-Phone-Ultra'
    LIMIT 1;



-- 8. Display only the products that ***can_be_returned***
-- 9. Display only the products that have a price less than 44.00.
-- 10. Display only the products that have a price in between 22.50 and 99.99.

SELECT * FROM products
    WHERE can_be_returned = true;

SELECT * FROM products
    WHERE price < 44.00;

SELECT * FROM products
    WHERE price BETWEEN 22.50 AND 99.99;




-- 11. There’s a sale going on: Everything is $20 off! Update the database accordingly.
-- 12. Because of the sale, everything that costs less than $25 has sold out. Remove all products whose price meets this criteria.
-- 13. And now the sale is over. For the remaining products, increase their price by $20.

SELECT * FROM products;

UPDATE products
    SET price = price-20;

SELECT * FROM products;

DELETE FROM products
    WHERE price < 25;

SELECT * FROM products;

UPDATE products
    SET price = price+20;

SELECT * FROM products;


-- 14. There is a new company policy: everything is returnable. Update the database accordingly.

UPDATE products
    SET can_be_returned = true;

SELECT * FROM products;

