-- Stores user information, including whether they are drivers or not.
CREATE TABLE users
(   
    id                  INT PRIMARY KEY AUTO_INCREMENT,
    user                VARCHAR(50)         NOT NULL,
    password            VARCHAR(50)         NOT NULL    CHECK (LENGTH(password) > 8),
    telephone           VARCHAR(20)         NOT NULL,
    is_driver           BOOLEAN             NOT NULL    DEFAULT FALSE,
    date_insc           DATETIME            NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(id, telephone)
);


-- Details the ride-sharing offers created by users.
CREATE TABLE offer
(   
    id_offer            INT PRIMARY KEY AUTO_INCREMENT,
    id_author           INT                                             NOT NULL,
    departure           VARCHAR(255)                                    NOT NULL,
    arrival             VARCHAR(255)                                    NOT NULL,
    date                DATETIME                                        NOT NULL,
    price               DECIMAL(5,2)                                    NOT NULL,
    nb_seats            INT                                             NOT NULL,
    status              ENUM('OPEN','FULL','COMPLETED','CANCELLED')     NOT NULL    DEFAULT 'OPEN',
    comment             VARCHAR(510),
    FOREIGN KEY (id_author) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- Requests for rides posted by users, awaiting acceptance.
CREATE TABLE request
(   
    id_request          INT                 PRIMARY KEY AUTO_INCREMENT,
    id_author           INT                 NOT NULL,
    departure           VARCHAR(255)        NOT NULL,
    arrival             VARCHAR(255)        NOT NULL,
    date                DATETIME            NOT NULL,
    price               DECIMAL(3,2)        NOT NULL,
    comment             VARCHAR(510),
    FOREIGN KEY (id_author) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- Users' applications to offers, with status indicating acceptance or rejection.
CREATE TABLE application_offer
(
    id_appli            INT PRIMARY KEY AUTO_INCREMENT,
    id_offer            INT                                     NOT NULL,
    id_candidate        INT                                     NOT NULL,
    comment             VARCHAR(510),
    status              ENUM('PENDING','ACCEPTED','REJECTED')   NOT NULL    DEFAULT 'PENDING',
    date_appli          TIMESTAMP                               NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_offer) REFERENCES offer(id_offer) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_candidate) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE (id_offer, id_candidate)
);
