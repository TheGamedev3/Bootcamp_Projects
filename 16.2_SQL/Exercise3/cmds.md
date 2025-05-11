



-- run scripts

psql -U postgres -f "./before/outer_space.sql"
psql -U postgres -d outer_space
SELECT * FROM planets;

psql -U postgres -f "./after/outer_space.sql"
psql -U postgres -d outer_space
SELECT * FROM celestials;



psql -U postgres -f "./before/music.sql"
psql -U postgres -d music
SELECT * FROM songs;

psql -U postgres -f "./after/music.sql"
psql -U postgres -d music
SELECT * FROM songs;
SELECT * FROM entities;
SELECT * FROM contributions;