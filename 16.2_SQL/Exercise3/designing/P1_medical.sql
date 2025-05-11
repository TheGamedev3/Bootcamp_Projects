


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


