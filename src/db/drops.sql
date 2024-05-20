-- Connect to the MySQL server
USE atlanticar;

-- If the above command is successful, it will continue to drop the tables
DROP TABLE IF EXISTS notification;
DROP TABLE IF EXISTS offer_client;
DROP TABLE IF EXISTS apply_offer;
DROP TABLE IF EXISTS apply_request;
DROP TABLE IF EXISTS offer;
DROP TABLE IF EXISTS request;
DROP TABLE IF EXISTS account;

-- If you want to drop the database after dropping the tables
DROP DATABASE atlanticar;
