


--   # Part One: Medical Center

-- - A medical center employs several doctors
-- - A doctors can see many patients
-- - A patient can be seen by many doctors
-- - During a visit, a patient may be diagnosed to have one or more diseases.

CREATE TABLE medical_centers(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE doctor(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    works_at INTEGER REFERENCES medical_centers(id)
);

CREATE TABLE patient(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE disease(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE visit(
    id SERIAL PRIMARY KEY,
    visit_date DATE NOT NULL,
    doctor INTEGER REFERENCES doctor(id),
    patient INTEGER REFERENCES patient(id)
);

CREATE TABLE diagnosis(
    id SERIAL PRIMARY KEY,
    from_visit INTEGER REFERENCES visit(id),
    result INTEGER REFERENCES disease(id)
);






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





--   # Part Three: Soccer League

-- - All of the teams in the league
-- - All of the goals scored by every player for each game
-- - All of the players in the league and their corresponding teams
-- - All of the referees who have been part of each game
-- - All of the matches played between teams
-- - All of the start and end dates for season that a league has
-- - The standings/rankings of each team in the league (This doesn’t have to be its own table if the data can be captured somehow).



CREATE TABLE League(
    id SERIAL PRIMARY KEY,
    start_date DATE,
    end_date DATE
);
CREATE TABLE Teams(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);
CREATE TABLE Players(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    team_id INTEGER REFERENCES Teams(id)
);
CREATE TABLE Referees(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);
CREATE TABLE Matches(
    id SERIAL PRIMARY KEY,
    team1 INTEGER REFERENCES Teams(id),
    team2 INTEGER REFERENCES Teams(id),
    league_id INTEGER REFERENCES League(id)
);
CREATE TABLE MatchReferees (
    id SERIAL PRIMARY KEY,
    matches_id INTEGER REFERENCES Matches(id),
    referee_id INTEGER REFERENCES Referees(id)
);
CREATE TABLE Rounds(
    id SERIAL PRIMARY KEY,
    matches_id INTEGER REFERENCES Matches(id),
    round INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE Score(
    id SERIAL PRIMARY KEY,
    amount INTEGER DEFAULT 0,
    by_player INTEGER REFERENCES Players(id),
    during_round INTEGER REFERENCES Rounds(id)
);





