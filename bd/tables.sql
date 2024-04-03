    CREATE TABLE account
    (   
        id                  SERIAL PRIMARY KEY,
        user                TEXT NOT NULL,
        password            TEXT NOT NULL,
        telephone           INT NOT NULL,
        date                DATE NOT NULL,
        created_offer_id    INT,
        created_request_id  INT
    );

    CREATE TABLE offer
    (   
        id              SERIAL PRIMARY KEY,
        author_id       INT NOT NULL,
        departure_place TEXT NOT NULL,
        arrival_place   TEXT NOT NULL,
        date            DATE NOT NULL,
        time            TIME NOT NULL,
        price           DECIMAL NOT NULL,
        available_seats INT NOT NULL,
        comment         TEXT,
        FOREIGN KEY (author_id) REFERENCES account(id) ON DELETE CASCADE ON UPDATE CASCADE
    );

    CREATE TABLE request
    (   
        id              SERIAL PRIMARY KEY,
        author_id       INT NOT NULL,
        departure_place TEXT NOT NULL,
        arrival_place   TEXT NOT NULL,
        date            DATE NOT NULL,
        time            TIME NOT NULL,
        price           INT NOT NULL,
        comment         TEXT,
        FOREIGN KEY (author_id) REFERENCES account(id) ON DELETE CASCADE ON UPDATE CASCADE
    );