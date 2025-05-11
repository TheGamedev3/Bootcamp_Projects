

-- WITHIN GIT BASH

-- run script
-- psql -U postgres -f "./sql-joins/data.sql"
-- psql -U postgres -d joins_exercise


-- write your queries here


-- 1. Join the two tables so that every column and record appears, regardless of if there is not an owner_id.

SELECT * FROM owners;
SELECT * FROM vehicles;

SELECT * FROM owners
    FULL JOIN vehicles ON owners.id = vehicles.owner_id;


-- 2. Count the number of cars for each owner. Display the owners first_name, last_name and count of vehicles. The first_name should be ordered in ascending order.

SELECT first_name, last_name, COUNT(vehicles.id) as cars FROM owners
    FULL JOIN vehicles ON owners.id = vehicles.owner_id
    GROUP BY owners.id
    ORDER BY first_name ASC;


-- 3. Count the number of cars for each owner and display the average price for each of the cars as integers.
--    Display the owners first_name, last_name, average price and count of vehicles.
--    The first_name should be ordered in descending order.
--    Only display results with more than one vehicle and an average price greater than 10000.

SELECT first_name, last_name, COUNT(vehicles.id) as cars, ROUND(AVG(vehicles.price)) as avg_price FROM owners
    FULL JOIN vehicles ON owners.id = vehicles.owner_id
    GROUP BY owners.id
    HAVING COUNT(vehicles.id) > 1 AND ROUND(AVG(vehicles.price)) > 10000
    ORDER BY first_name DESC;

