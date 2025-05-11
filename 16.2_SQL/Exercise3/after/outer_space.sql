-- from the terminal run:
-- psql < outer_space.sql

DROP DATABASE IF EXISTS outer_space;

CREATE DATABASE outer_space;

\c outer_space

CREATE TABLE celestials
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  orbital_period_in_years FLOAT,
  around INTEGER REFERENCES celestials(id),
  body_type TEXT NOT NULL
);


CREATE TEMP TABLE orbiters (
  name TEXT,
  orbital_period FLOAT
);




-- The Milk Way Galaxy
INSERT INTO celestials
  (body_type, name)
VALUES ('galaxy', 'Milky Way');

-- The Stars
INSERT INTO orbiters (name)
  VALUES
    ('The Sun'),
    ('Proxima Centauri'),
    ('Gliese 876');

INSERT INTO celestials (name, body_type, around)
SELECT 
  name,
  'star',
  (SELECT id FROM celestials WHERE name = 'Milky Way' LIMIT 1)
FROM orbiters; TRUNCATE orbiters;



-- The Solar System
INSERT INTO orbiters (name, orbital_period)
VALUES 
  ('Earth', 1.00),
  ('Mars', 1.88),
  ('Venus', 0.62),
  ('Neptune', 164.8);

INSERT INTO celestials (name, body_type, orbital_period_in_years, around)
SELECT 
  name,
  'planet',
  orbital_period,
  (SELECT id FROM celestials WHERE name = 'The Sun' LIMIT 1)
FROM orbiters; TRUNCATE orbiters;


-- a few moons and misc
INSERT INTO celestials (body_type, name, around, orbital_period_in_years)
VALUES
  ('planet', 'Proxima Centauri b', (SELECT id FROM celestials WHERE name = 'Proxima Centauri' LIMIT 1), 0.03),
  ('planet', 'Gliese 876 b', (SELECT id FROM celestials WHERE name = 'Gliese 876' LIMIT 1), 0.23),
  ('moon', 'The Moon', (SELECT id FROM celestials WHERE name = 'Earth' LIMIT 1), null),
  ('moon', 'Phobos', (SELECT id FROM celestials WHERE name = 'Mars' LIMIT 1), null),
  ('moon', 'Deimos', (SELECT id FROM celestials WHERE name = 'Mars' LIMIT 1), null);


-- The Neptune System
INSERT INTO orbiters (name)
VALUES 
  ('Naiad'), ('Thalassa'), ('Despina'), ('Galatea'), ('Larissa'),
  ('S/2004 N 1'), ('Proteus'), ('Triton'), ('Nereid'), ('Halimede'),
  ('Sao'), ('Laomedeia'), ('Psamathe'), ('Neso');

INSERT INTO celestials (name, body_type, around)
SELECT 
  name,
  'moon',
  (SELECT id FROM celestials WHERE name = 'Neptune' LIMIT 1)
FROM orbiters; TRUNCATE orbiters;






DROP TABLE orbiters;
