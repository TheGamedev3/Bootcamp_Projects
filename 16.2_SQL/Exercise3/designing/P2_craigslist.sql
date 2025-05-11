
--   # Part Two: Craigslist

-- - The region of the craigslist post (San Francisco, Atlanta, Seattle, etc)
-- - Users and preferred region
-- - Posts: contains title, text, the user who has posted, the location of the posting, the region of the posting
-- - Categories that each post belongs to


CREATE TABLE Regions(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    preferred_region INTEGER REFERENCES Regions(id)
);

CREATE TABLE Categories(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE Posts(
    id SERIAL PRIMARY KEY,

    title TEXT NOT NULL,
    text TEXT NOT NULL,
    posted_by INTEGER REFERENCES Users(id),

    coordinates TEXT NOT NULL,
    in_region INTEGER REFERENCES regions(id)
);

CREATE TABLE Belongs(
    id SERIAL PRIMARY KEY,
    post INTEGER REFERENCES Posts(id),
    of_category INTEGER REFERENCES Categories(id)
);



