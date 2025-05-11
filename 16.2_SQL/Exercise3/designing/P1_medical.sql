

DROP DATABASE IF EXISTS medical;

CREATE DATABASE medical;

\c medical

--   # Part One: Medical Center

-- - A medical center employs several doctors
-- - A doctors can see many patients
-- - A patient can be seen by many doctors
-- - During a visit, a patient may be diagnosed to have one or more diseases.

CREATE TABLE medical_centers(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);
INSERT INTO medical_centers (name)
VALUES ('Healthy Place'),    -- id = 1
       ('Heart Hospital');   -- id = 2


CREATE TABLE doctor(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    works_at INTEGER REFERENCES medical_centers(id)
);
INSERT INTO doctor (name, works_at)
VALUES ('Dr. G', 1),         -- id = 1
       ('Dr. A', 2);         -- id = 2


CREATE TABLE patient(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);
INSERT INTO patient (name)
VALUES ('Steve'),            -- id = 1
       ('Frank'),            -- id = 2
       ('Mike');             -- id = 3
    

CREATE TABLE disease(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);
INSERT INTO disease (name)
VALUES ('Ebola40');          -- id = 1


CREATE TABLE visit(
    id SERIAL PRIMARY KEY,
    visit_date DATE NOT NULL,
    doctor INTEGER REFERENCES doctor(id),
    patient INTEGER REFERENCES patient(id)
);
INSERT INTO visit (visit_date, doctor, patient)
VALUES ('2025-05-01', 1, 1),  -- Steve visits Dr. G    → id = 1
       ('2025-05-02', 1, 2),  -- Frank visits Dr. G    → id = 2
       ('2025-05-03', 2, 3);  -- Mike visits Dr. A     → id = 3

CREATE TABLE diagnosis(
    id SERIAL PRIMARY KEY,
    from_visit INTEGER REFERENCES visit(id),
    result INTEGER REFERENCES disease(id)
);
INSERT INTO diagnosis (from_visit, result)
VALUES (1, 1),  -- Steve got Ebola40
       (3, 1);  -- Mike got Ebola40

