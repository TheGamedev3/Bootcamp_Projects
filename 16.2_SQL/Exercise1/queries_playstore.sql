


-- PART 2: PLAYSTORE

-- to start up, use git bash:

-- CLEAN EMOJIS THAT CAUSE ERROS AND BREAK UTF8!
-- cat "./sql-querying/seed_playstore.sql" | LC_ALL=C tr -d '\000-\011\013\014\016-\037\177\200-\237' > "./sql-querying/seed_playstore_clean.sql"

-- psql -U postgres -f "./sql-querying/seed_playstore_clean.sql"
-- psql -U postgres -d playstore

-- quit
-- \q

-- see all tables
-- \dt



-- Comments in SQL Start with dash-dash --

-- 1. Find the app with an ID of ***1880***

SELECT * FROM analytics
    WHERE id = 1880;


-- 2. Find the ID and app name for all apps that were last updated on August 01, 2018.

SELECT id, app_name FROM analytics
    WHERE last_updated = '2018-08-01';


-- 3. Count the number of apps in each category, e.g. “Family | 1972”.

SELECT category, COUNT(*) AS total FROM analytics
    GROUP BY category;


-- 4. Find the top 5 most-reviewed apps and the number of reviews for each.

SELECT app_name, reviews FROM analytics
    ORDER BY reviews DESC
    LIMIT 5;


-- 5. Find the app that has the most reviews with a rating greater than equal to 4.8.

SELECT app_name, rating, reviews FROM analytics
    WHERE rating >= 4.8
    ORDER BY reviews DESC
    LIMIT 1;


-- 6. Find the average rating for each category ordered by the highest rated to lowest rated.

SELECT category, AVG(rating) AS avg_score FROM analytics
    GROUP BY category
    ORDER BY avg_score DESC;


-- 7. Find the name, price, and rating of the most expensive app with a rating that’s less than 3.

SELECT app_name, price, rating FROM analytics
    WHERE rating < 3
    ORDER BY price DESC
    LIMIT 1;


-- 8. Find all apps with a min install not exceeding 50, that have a rating. Order your results by highest rated first.

SELECT app_name, min_installs, rating FROM analytics
    WHERE min_installs <= 50 AND NOT rating IS NULL
    ORDER BY rating DESC;


-- 9. Find the names of all apps that are rated less than 3 with at least 10000 reviews.

SELECT app_name, rating, reviews FROM analytics
    WHERE rating < 3 AND reviews >= 10000
    ORDER BY rating DESC;


-- 10. Find the top 10 most-reviewed apps that cost between 10 cents and a dollar.

SELECT app_name, price, reviews FROM analytics
    WHERE price BETWEEN 0.10 AND 1.00
    ORDER BY reviews DESC
    LIMIT 10;


-- 11. Find the most out of date app. Hint: You don’t need to do it this way, but it’s possible to do with a subquery: http://www.postgresqltutorial.com/postgresql-max-function/

SELECT app_name, last_updated FROM analytics
    ORDER BY last_updated
    LIMIT 1;


-- 12. Find the most expensive app (the query is very similar to #11).

SELECT app_name, price FROM analytics
    ORDER BY price DESC
    LIMIT 1;


-- 13. Count all the reviews in the Google Play Store.

SELECT SUM(reviews) as total_reviews FROM analytics;


-- 14. Find all the categories that have more than 300 apps in them.

SELECT category, COUNT(*) AS apps FROM analytics
    GROUP BY category
    HAVING COUNT(*) > 300
    ORDER BY apps DESC;


-- 15. Find the app that has the highest proportion of min_installs to reviews, among apps that have been installed at least 100,000 times. Display the name of the app along with the number of reviews, the min_installs, and the proportion.

-- (use expanded display)
-- \x

-- the ::numeric thing is to allow for float decimals with integer division
-- and the ROUND and /2, is to only show/round to two decimal places
SELECT app_name, min_installs, reviews, ROUND(min_installs::numeric / reviews, 2) as popularity FROM analytics
    WHERE min_installs >= 100000
    ORDER BY popularity DESC;

