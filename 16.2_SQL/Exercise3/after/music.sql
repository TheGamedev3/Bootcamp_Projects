-- from the terminal run:
-- psql < music.sql

DROP DATABASE IF EXISTS music;

CREATE DATABASE music;

\c music

CREATE TABLE songs
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  duration_in_seconds INTEGER NOT NULL,
  release_date DATE NOT NULL,
  album TEXT NOT NULL
);

CREATE TABLE entities
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE contributions
(
  id SERIAL PRIMARY KEY,
  relation TEXT NOT NULL,
  entity_id INTEGER REFERENCES entities(id),
  song_id INTEGER REFERENCES songs(id)
);

INSERT INTO songs (title, duration_in_seconds, release_date, album)
VALUES
  ('MMMBop', 238, '1997-04-15', 'Middle of Nowhere'),
  ('Bohemian Rhapsody', 355, '1975-10-31', 'A Night at the Opera'),
  ('One Sweet Day', 282, '1995-11-14', 'Daydream'),
  ('Shallow', 216, '2018-09-27', 'A Star Is Born'),
  ('How You Remind Me', 223, '2001-08-21', 'Silver Side Up'),
  ('New York State of Mind', 276, '2009-10-20', 'The Blueprint 3'),
  ('Dark Horse', 215, '2013-12-17', 'Prism'),
  ('Moves Like Jagger', 201, '2011-06-21', 'Hands All Over'),
  ('Complicated', 244, '2002-05-14', 'Let Go'),
  ('Say My Name', 240, '1999-11-07', 'The Writing''s on the Wall');


CREATE TEMP TABLE peoples (
  title TEXT,
  song_title TEXT
);

-- ARTISTS
INSERT INTO peoples (title, song_title)
VALUES
  ('Hanson', 'MMMBop'),
  ('Queen', 'Bohemian Rhapsody'),
  ('Mariah Carey', 'One Sweet Day'),
  ('Boyz II Men', 'One Sweet Day'),
  ('Lady Gaga', 'Shallow'),
  ('Bradley Cooper', 'Shallow'),
  ('Nickelback', 'How You Remind Me'),
  ('Jay Z', 'New York State of Mind'),
  ('Alicia Keys', 'New York State of Mind'),
  ('Katy Perry', 'Dark Horse'),
  ('Juicy J', 'Dark Horse'),
  ('Maroon 5', 'Moves Like Jagger'),
  ('Christina Aguilera', 'Moves Like Jagger'),
  ('Avril Lavigne', 'Complicated'),
  ('Destiny''s Child', 'Say My Name');

INSERT INTO entities (name)
  SELECT title FROM peoples;

INSERT INTO contributions (relation, entity_id, song_id)
  SELECT 
    'artist',
    (SELECT id FROM entities WHERE name = title LIMIT 1),
    (SELECT id FROM songs WHERE title = song_title LIMIT 1)
  FROM peoples;
TRUNCATE peoples;


-- PRODUCERS
INSERT INTO peoples (title, song_title)
VALUES
  ('Dust Brothers', 'MMMBop'),
  ('Stephen Lironi', 'MMMBop'),
  ('Roy Thomas Baker', 'Bohemian Rhapsody'),
  ('Walter Afanasieff', 'One Sweet Day'),
  ('Benjamin Rice', 'Shallow'),
  ('Rick Parashar', 'How You Remind Me'),
  ('Al Shux', 'New York State of Mind'),
  ('Max Martin', 'Dark Horse'),
  ('Cirkut', 'Dark Horse'),
  ('Shellback', 'Moves Like Jagger'),
  ('Benny Blanco', 'Moves Like Jagger'),
  ('The Matrix', 'Complicated'),
  ('Darkchild', 'Say My Name');

INSERT INTO entities (name)
  SELECT title FROM peoples;

INSERT INTO contributions (relation, entity_id, song_id)
  SELECT
    'producer',
    (SELECT id FROM entities WHERE name = title LIMIT 1),
    (SELECT id FROM songs WHERE title = song_title LIMIT 1)
  FROM peoples;
TRUNCATE peoples;


DROP TABLE peoples;