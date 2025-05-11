


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




