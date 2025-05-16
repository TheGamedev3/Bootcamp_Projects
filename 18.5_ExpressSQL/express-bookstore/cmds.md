


in git bash:

✅ psql -U postgres -f "./data.sql"





Aughhh get rid of the windows enter psql user password thing in pg_hba.conf:


# "local" is for Unix domain socket connections only
local   all             all                                     trust
# IPv4 local connections:
host    all             all             127.0.0.1/32            trust
# IPv6 local connections:
host    all             all             ::1/128                 trust




CREATE TABLE books (
  isbn TEXT PRIMARY KEY,
  amazon_url TEXT,
  author TEXT,
  language TEXT, 
  pages INTEGER,
  publisher TEXT,
  title TEXT, 
  year INTEGER
);



html body header:

POST http://localhost:3000/books
{
    "isbn": "123sbn",
    "amazon_url": "http://amazon_forest",
    "author": "Stanely",
    "language": "english-US",
    "pages": 304,
    "publisher": "Franklin",
    "title": "Stan and Frank",
    "year": 2007
}
{
    "pages": 60,
    "publisher": "Franklin N",
    "year": 2006
}


GET http://localhost:3000/books


npm install --save-dev cross-env

"scripts": {
  "test": "cross-env NODE_ENV=test jest --runInBand"
}
