-- Run this from psql connected to the 'postgres' database

-- Step 1: Drop & create both databases while not connected to them
DROP DATABASE IF EXISTS books;
DROP DATABASE IF EXISTS books_test;

CREATE DATABASE books;
CREATE DATABASE books_test;

-- Step 2: Now connect to books and create the table
\c books

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

-- Step 3: Connect to books_test and create the same table
\c books_test

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
