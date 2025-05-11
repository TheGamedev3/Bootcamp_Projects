-- from the terminal run:
-- psql < air_traffic.sql

DROP DATABASE IF EXISTS air_traffic;

CREATE DATABASE air_traffic;

\c air_traffic

CREATE TEMP TABLE BigBlob
(
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  seat TEXT NOT NULL,
  departure TIMESTAMP NOT NULL,
  arrival TIMESTAMP NOT NULL,
  airline TEXT NOT NULL,
  from_city TEXT NOT NULL,
  from_country TEXT NOT NULL,
  to_city TEXT NOT NULL,
  to_country TEXT NOT NULL
);

INSERT INTO BigBlob
  (first_name, last_name, seat, departure, arrival, airline, from_city, from_country, to_city, to_country)
VALUES
  ('Jennifer', 'Finch', '33B', '2018-04-08 09:00:00', '2018-04-08 12:00:00', 'United', 'Washington DC', 'United States', 'Seattle', 'United States'),
  ('Thadeus', 'Gathercoal', '8A', '2018-12-19 12:45:00', '2018-12-19 16:15:00', 'British Airways', 'Tokyo', 'Japan', 'London', 'United Kingdom'),
  ('Sonja', 'Pauley', '12F', '2018-01-02 07:00:00', '2018-01-02 08:03:00', 'Delta', 'Los Angeles', 'United States', 'Las Vegas', 'United States'),
  ('Jennifer', 'Finch', '20A', '2018-04-15 16:50:00', '2018-04-15 21:00:00', 'Delta', 'Seattle', 'United States', 'Mexico City', 'Mexico'),
  ('Waneta', 'Skeleton', '23D', '2018-08-01 18:30:00', '2018-08-01 21:50:00', 'TUI Fly Belgium', 'Paris', 'France', 'Casablanca', 'Morocco'),
  ('Thadeus', 'Gathercoal', '18C', '2018-10-31 01:15:00', '2018-10-31 12:55:00', 'Air China', 'Dubai', 'UAE', 'Beijing', 'China'),
  ('Berkie', 'Wycliff', '9E', '2019-02-06 06:00:00', '2019-02-06 07:47:00', 'United', 'New York', 'United States', 'Charlotte', 'United States'),
  ('Alvin', 'Leathes', '1A', '2018-12-22 14:42:00', '2018-12-22 15:56:00', 'American Airlines', 'Cedar Rapids', 'United States', 'Chicago', 'United States'),
  ('Berkie', 'Wycliff', '32B', '2019-02-06 16:28:00', '2019-02-06 19:18:00', 'American Airlines', 'Charlotte', 'United States', 'New Orleans', 'United States'),
  ('Cory', 'Squibbes', '10D', '2019-01-20 19:30:00', '2019-01-20 22:45:00', 'Avianca Brasil', 'Sao Paolo', 'Brazil', 'Santiago', 'Chile');


-- PLACES
    CREATE TABLE Countries(
      id SERIAL PRIMARY KEY,
      country TEXT NOT NULL
    );

    -- gets all the unique country names from the from_country and to_country
    INSERT INTO Countries (country)
      SELECT from_country FROM BigBlob
      UNION
      SELECT to_country FROM BigBlob;


    CREATE TABLE Cities(
      id SERIAL PRIMARY KEY,
      city TEXT NOT NULL,
      country_id INTEGER REFERENCES Countries(id)
    );

    -- get all the unique city names and join them to their country_ids
    INSERT INTO Cities (city, country_id)
      SELECT DISTINCT b.from_city, c.id
        FROM BigBlob b
        JOIN Countries c ON b.from_country = c.country
      UNION
      SELECT DISTINCT b.to_city, c.id
        FROM BigBlob b
        JOIN Countries c ON b.to_country = c.country;



-- AIRLINES
    CREATE TABLE Airlines(
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL
    );
    -- gets all the unique airlines
    INSERT INTO Airlines (name)
      SELECT DISTINCT airline FROM BigBlob;


-- SCHEDULES
    CREATE TABLE Flights(
      id SERIAL PRIMARY KEY,
      departure TIMESTAMP NOT NULL,
      arrival TIMESTAMP NOT NULL,
      from_place INTEGER REFERENCES Cities(id),
      to_place INTEGER REFERENCES Cities(id),
      airline_id INTEGER REFERENCES Airlines(id)
    );
    INSERT INTO Flights (departure, arrival, from_place, to_place, airline_id)
      SELECT
        b.departure, b.arrival,
        from_city.id, to_city.id,
        flying.id
      FROM BigBlob b
        LEFT JOIN Cities from_city ON from_city.city = b.from_city
        LEFT JOIN Cities to_city ON to_city.city = b.to_city
        LEFT JOIN Airlines flying ON flying.name = b.airline;


    CREATE TABLE Person(
      id SERIAL PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL
    );
    INSERT INTO Person (first_name, last_name)
      SELECT DISTINCT first_name, last_name FROM BigBlob;

    CREATE TABLE Ticket(
      id SERIAL PRIMARY KEY,
      seat TEXT NOT NULL,
      passenger INTEGER REFERENCES Person(id),
      flight_id INTEGER REFERENCES Flights(id)
    );
    INSERT INTO Ticket (seat, passenger, flight_id)
    SELECT DISTINCT
      b.seat,
      p.id,
      f.id
    FROM BigBlob b
    LEFT JOIN Person p
      ON p.first_name = b.first_name AND p.last_name = b.last_name
    LEFT JOIN Airlines a
      ON a.name = b.airline
    LEFT JOIN Cities from_c
      ON from_c.city = b.from_city
    LEFT JOIN Cities to_c
      ON to_c.city = b.to_city
    LEFT JOIN Flights f
      ON f.departure = b.departure
        AND f.arrival = b.arrival
        AND f.from_place = from_c.id
        AND f.to_place = to_c.id
        AND f.airline_id = a.id;



DROP TABLE BigBlob;