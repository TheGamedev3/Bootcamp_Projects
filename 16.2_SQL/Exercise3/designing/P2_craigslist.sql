

DROP DATABASE IF EXISTS craig;

CREATE DATABASE craig;

\c craig

--   # Part Two: Craigslist

-- - The region of the craigslist post (San Francisco, Atlanta, Seattle, etc)
-- - Users and preferred region
-- - Posts: contains title, text, the user who has posted, the location of the posting, the region of the posting
-- - Categories that each post belongs to


CREATE TABLE Regions(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);
INSERT INTO Regions (name)
VALUES ('San Francisco'),  -- id = 1
       ('Atlanta'),        -- id = 2
       ('Seattle');        -- id = 3


CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    preferred_region INTEGER REFERENCES Regions(id)
);
INSERT INTO Users (name, preferred_region)
VALUES ('Frank Francisco', 1),  -- id = 1
       ('Alan Atlanta', 2),     -- id = 2
       ('Sebastian Seattle', 3);-- id = 3


CREATE TABLE Categories(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);
INSERT INTO Categories (name)
VALUES ('Funny'),     -- id = 1
       ('Gaming'),    -- id = 2
       ('Real life'); -- id = 3


CREATE TABLE Posts(
    id SERIAL PRIMARY KEY,

    title TEXT NOT NULL,
    text TEXT NOT NULL,
    posted_by INTEGER REFERENCES Users(id),

    coordinates TEXT NOT NULL,
    in_region INTEGER REFERENCES regions(id)
);
INSERT INTO Posts (title, text, posted_by, coordinates, in_region)
VALUES (
  'Minecraft Strategy',
  'right click to open chests!',
  2,                     -- Alan Atlanta
  '33.7490, -84.3880',   -- Atlanta lat/lon
  2                      -- Atlanta
);  -- id = 1


CREATE TABLE Belongs(
    id SERIAL PRIMARY KEY,
    post INTEGER REFERENCES Posts(id),
    of_category INTEGER REFERENCES Categories(id)
);
INSERT INTO Belongs (post, of_category)
VALUES (1, 2);  -- Post 1 belongs to Gaming
