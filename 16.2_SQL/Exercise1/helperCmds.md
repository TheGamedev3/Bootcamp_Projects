


-- run script
psql -U postgres -f "./sql-querying/{scriptname}.sql"

-- enter database
psql -U postgres -d {DATABASENAME}


-- quit
\q


-- see all tables
\dt


psql -U postgres -f "./sql-querying/seed_products.sql"
psql -U postgres -d products_db
