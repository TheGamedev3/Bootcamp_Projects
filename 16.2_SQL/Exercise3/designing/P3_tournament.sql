



DROP DATABASE IF EXISTS soccer;

CREATE DATABASE soccer;

\c soccer

--   # Part Three: Soccer League

-- - All of the teams in the league
-- - All of the goals scored by every player for each game
-- - All of the players in the league and their corresponding teams
-- - All of the referees who have been part of each game
-- - All of the matches played between teams
-- - All of the start and end dates for season that a league has
-- - The standings/rankings of each team in the league (This doesn’t have to be its own table if the data can be captured somehow).

-- can u plz seed all these in?

CREATE TABLE League(
    id SERIAL PRIMARY KEY,
    start_date DATE,
    end_date DATE
);
INSERT INTO League (start_date, end_date)
VALUES ('2025-01-01', '2025-12-31'); -- id = 1


CREATE TABLE Teams(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);
INSERT INTO Teams (name)
VALUES ('Blue Team'),  -- id = 1
       ('Red Team');   -- id = 2


CREATE TABLE Players(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    team_id INTEGER REFERENCES Teams(id)
);
-- Blue Team (team_id = 1)
INSERT INTO Players (name, team_id)
VALUES ('Steve', 1),    -- id = 1
       ('Mike', 1),     -- id = 2

-- Red Team (team_id = 2)
       ('Alexa', 2),    -- id = 3
       ('Jerry', 2);    -- id = 4



CREATE TABLE Referees(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);
INSERT INTO Referees (name)
VALUES ('Fredrick');  -- id = 1

CREATE TABLE Matches(
    id SERIAL PRIMARY KEY,
    start_date DATE,
    team1 INTEGER REFERENCES Teams(id),
    team2 INTEGER REFERENCES Teams(id),
    league_id INTEGER REFERENCES League(id)
);
INSERT INTO Matches (start_date, team1, team2, league_id)
VALUES ('2025-08-01', 1, 2, 1); -- id = 1 (Blue vs Red in The Big League)


CREATE TABLE MatchReferees (
    id SERIAL PRIMARY KEY,
    matches_id INTEGER REFERENCES Matches(id),
    referee_id INTEGER REFERENCES Referees(id)
);
INSERT INTO MatchReferees (matches_id, referee_id)
VALUES (1, 1);  -- Match 1, Ref: Fredrick


CREATE TABLE Rounds(
    id SERIAL PRIMARY KEY,
    matches_id INTEGER REFERENCES Matches(id),
    round INTEGER NOT NULL DEFAULT 0
);
INSERT INTO Rounds (matches_id, round)
VALUES (1, 1),  -- id = 1 (Round 1)
       (1, 2);  -- id = 2 (Round 2)

CREATE TABLE Score(
    id SERIAL PRIMARY KEY,
    amount INTEGER DEFAULT 0,
    by_player INTEGER REFERENCES Players(id),
    during_round INTEGER REFERENCES Rounds(id)
);
-- Round 1
INSERT INTO Score (amount, by_player, during_round)
VALUES (2, 4, 1),  -- Jerry scores 2
       (3, 3, 1),  -- Alexa scores 3

-- Round 2
       (6, 1, 2);  -- Steve scores 6



