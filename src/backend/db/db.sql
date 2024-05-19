-- db.sql: Master file to execute other SQL scripts.

-- Dropping existing tables if needed (e.g., from drop.sql)
SOURCE drops.sql;

-- Creating tables
SOURCE tables.sql;

-- Inserting data into tables
SOURCE insertion.sql;

-- Running (test) queries
SOURCE query.sql;
