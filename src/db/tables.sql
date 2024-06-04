-- Use the database atlanticar
CREATE DATABASE IF NOT EXISTS atlanticar ;
USE atlanticar;


-- Table: account
-- Description: Stores user information, including usernames, passwords, phone numbers, and email addresses.
-- Fields:
--     id - Unique identifier for each user (integer, auto-incremented, primary key).
--     user - Username of the user (string, up to 30 characters).
--     password - Password for user account security (string, up to 30 characters, not nullable).
--     phone_number - Contact phone number of the user (text, not nullable).
--     email - Email address of the user (string, up to 30 characters, not nullable).
--
CREATE TABLE account
(   
    id     			 INT             PRIMARY KEY     AUTO_INCREMENT,
    user 			 VARCHAR(30),
    password		 VARCHAR(30)     NOT NULL,
    phone_number   	 TEXT            NOT NULL,
    email            VARCHAR(50)     NOT NULL,
);


-- Table: offer
-- Description: Details the offers created by drivers. Includes departure and arrival locations, travel date, price, number of seats, and comments.
-- Fields:
--     id - Unique identifier for each offer (integer, auto-incremented, primary key).
--     author - User ID of the offer's creator, linking to the 'account' table (integer, not nullable, foreign key).
--     departure - Text description of the departure location (text, not nullable).
--     arrival - Text description of the arrival location (text, not nullable).
--     date - Date and time of the offer (datetime).
--     price - Price of the ride per seat (float).
--     nb_seat - Number of seats available in the offer (integer).
--     comment - Additional comments about the offer (string, up to 200 characters).
--
CREATE TABLE offer
(   
    id              INT         PRIMARY KEY     AUTO_INCREMENT,
    departure	  	TEXT        NOT NULL,
    arrival		    TEXT        NOT NULL,
    date            DATETIME,
    price          	FLOAT       NOT NULL,
    nb_seat	        INT         NOT NULL,
    comment		    VARCHAR(200),
    author          INT         NOT NULL,
    FOREIGN KEY (author) REFERENCES account(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- Table: request
-- Description: Stores requests from users, awaiting acceptance from a conductor/driver.
-- Fields:
--     id - Unique identifier for each request (integer, auto-incremented, primary key).
--     author - User ID of the person who posted the request, linking to the 'account' table (integer, not nullable, foreign key).
--     conductor - User ID of the conductor who accepts the request (integer, nullable).
--     departure - Departure location of the requested ride (text, not nullable).
--     arrival - Arrival destination of the requested ride (text, not nullable).
--     date - Date and time of the requested ride (datetime).
--     price - Proposed price for the ride (float).
--     comment - Additional comments about the request (string, up to 200 characters).
--
CREATE TABLE request
(   
    id              INT         PRIMARY KEY     AUTO_INCREMENT,
    conductor		INT,
    departure     	TEXT        NOT NULL,
    arrival		    TEXT        NOT NULL,
    date            DATETIME,
    price           FLOAT       NOT NULL,
    comment     	VARCHAR(200),
    author          INT         NOT NULL,
    FOREIGN KEY (author) REFERENCES account(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- Table: apply_offer
-- Description: Tracks applications from users (candidates) to offers.
-- Fields:
--     candidate - User ID of the candidate applying for the offer (integer, not nullable).
--     id_offer - Offer ID to which the application is made (integer, not nullable).
--     author - User ID of the author of the offer (integer, not nullable).
--     date - Date of the application (datetime, not nullable).
--
CREATE TABLE apply_offer
(	
    candidate 		INT         NOT NULL,
    id_offer 		INT         NOT NULL,
    author 			INT         NOT NULL,
    date			datetime    NOT NULL,
    FOREIGN KEY (candidate) REFERENCES account(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_offer) REFERENCES offer(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (author) REFERENCES account(id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (candidate, id_offer, author)
);


-- Table: apply_request
-- Description: Tracks applications from drivers (candidates) to requests, linking candidates to the requests they wish to fulfill.
-- Fields:
--     candidate - User ID of the candidate applying to fulfill the request (integer, not nullable).
--     id_request - Request ID to which the application is made (integer, not nullable).
--     author - User ID of the author of the request (integer, not nullable).
--     date - Date of the application (datetime, not nullable).
--
CREATE TABLE apply_request
(	
    candidate 		INT,
    id_request 		INT,
    author 			INT,
    date			DATETIME,
    FOREIGN KEY (candidate) REFERENCES account(id),
    FOREIGN KEY (id_request) REFERENCES request(id),
    FOREIGN KEY (author) REFERENCES account(id),
    PRIMARY KEY (candidate,id_request,author)
);


-- Table: offer_client
-- Description: Associates clients with offers they are participating in.
-- Fields:
--     client - User ID of the client participating in the offer (integer, not nullable).
--     id_offer - Offer ID in which the client is participating (integer, not nullable).
--
CREATE TABLE offer_client
(
	client			INT     NOT NULL,
    id_offer 		INT     NOT NULL,
    FOREIGN KEY (client) REFERENCES account(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_offer) REFERENCES offer(id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (client, id_offer)
);


-- Table: notification
-- Description: Stores notifications to be sent to users about various events or actions.
-- Fields:
--     id - Unique identifier for each notification (integer, auto-incremented, primary key).
--     id_account - User ID to whom the notification is addressed (integer, not nullable).
--     message - Text content of the notification (text).
--     seen - Boolean flag indicating whether the notification has been seen (boolean).
--     date - Date and time the notification was created or sent (datetime).
--
CREATE TABLE notification
(
	id              INT         PRIMARY KEY     AUTO_INCREMENT,
	id_account      INT         NOT NULL,
    message         TEXT, 
    seen            BOOLEAN     DEFAULT FALSE   NOT NULL,
    date            DATETIME,
    FOREIGN KEY (id_account) REFERENCES account(id) ON DELETE CASCADE ON UPDATE CASCADE
);