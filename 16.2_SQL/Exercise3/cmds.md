


# Part 1: creating new schemas

psql -U postgres -f "./designing/P1_medical.sql"
psql -U postgres -d medical
\i ./designing/P1_printAll.sql



psql -U postgres -f "./designing/P2_craigslist.sql"
psql -U postgres -d craig
\i ./designing/P2_printAll.sql



psql -U postgres -f "./designing/P3_tournament.sql"
psql -U postgres -d soccer
\i ./designing/P3_printAll.sql





# Part 2: redesigning old schemas

# ⚠️ I dynamically assemble the new tables/relationships in the examples, rather than manually typing out the ids and moving strings each time


-- run scripts


# PART 1: OUTER_SPACE

psql -U postgres -f "./before/outer_space.sql"
psql -U postgres -d outer_space
SELECT * FROM planets;

psql -U postgres -f "./after/outer_space.sql"
psql -U postgres -d outer_space
SELECT * FROM celestials;


# PART 3: MUSIC

psql -U postgres -f "./before/music.sql"
psql -U postgres -d music
SELECT * FROM songs;

psql -U postgres -f "./after/music.sql"
psql -U postgres -d music
SELECT * FROM songs;
SELECT * FROM entities;
SELECT * FROM contributions;


# PART 2: AIR_TRAFFIC

psql -U postgres -f "./before/air_traffic.sql"
psql -U postgres -d air_traffic
SELECT * FROM tickets;

psql -U postgres -f "./after/air_traffic.sql"
psql -U postgres -d air_traffic
\i ./after/printAllTraffic.sql

