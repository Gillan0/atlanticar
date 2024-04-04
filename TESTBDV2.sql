DROP TABLE candidature_offer;
DROP TABLE candidature_request;
DROP TABLE offer;
DROP TABLE request;

DROP TABLE account;

CREATE TABLE account
(   
    id     			INT auto_increment,
    user 			varchar(30),
    pasword			varchar(30) NOT NULL,
    phone_number   	TEXT NOT NULL,
    primary key (id)
);

CREATE TABLE offer
(   
    id              serial primary key auto_increment,
    departure	  	TEXT,
    arrival		    TEXT,
    date            datetime,
    price          	float,
    nb_seat	        integer,
    comment		    varchar(200),
    author          INT,
    FOREIGN KEY (author) REFERENCES account(id)
);

CREATE TABLE request
(   
    id              serial primary key auto_increment,
    departure     	TEXT,
    arrival		    TEXT,
    date            datetime,
    price           float,
    comment     	varchar(200),
    author          INT,
    conductor		INT,
    FOREIGN KEY (author) REFERENCES account(id)
);

create table candidature_offer
(	
    candidate 		INT,
    id_offer 		serial,
    author 			INT,
    FOREIGN KEY (candidate) REFERENCES account(id),
    FOREIGN KEY (id_offer) REFERENCES offer(id),
    FOREIGN KEY (author) REFERENCES account(id),
    primary key (candidate,id_offer,author)
);

create table candidature_request
(	
    candidate 		INT,
    id_request 		serial,
    author 			INT,
    FOREIGN KEY (candidate) REFERENCES account(id),
    FOREIGN KEY (id_request) REFERENCES request(id),
    FOREIGN KEY (author) REFERENCES account(id),
    primary key (candidate,id_request,author)
);

insert into account values (default,'JC','1234','06 12 34 56 78');
insert into account values (default,'Jean-Eude','1234','06 00 00 00 00');
insert into account values (default,'Eugène','1234','06 11 11 11 11');
insert into request values (DEFAULT, 'IMT Atlantique Brest','Carrefour Plouzané','2024-08-01 10:30:00',0,'ne se prononce pas',1,null);
insert into request values (DEFAULT, 'IMT Atlantique Brest', 'Carrefour Plouzané', '2024-09-01 11:30:00',0,'ne se prononce pas',1,null);
insert into request values (DEFAULT, 'IMT Atlantique Brest', 'Carrefour Plouzané', '2024-10-01 10:30:00',0,'salut',2,null);
insert into request values (DEFAULT, 'IMT Atlantique Brest', 'Brest', '2024-11-01 10:30:00',0,'ne se prononce pas',2,null);
insert into request values (DEFAULT, 'IMT Atlantique Brest', 'Brest', '2024-11-01 12:00:00',0,'ne se prononce pas',3,null);

UPDATE request SET conductor = 2 WHERE id = 1;
insert into candidature_request values (2,1,1);

SELECT * FROM request as r JOIN account as c ON c.id = r.author WHERE c.user = 'JC';
SELECT c1.user,r.departure,r.arrival,r.date,c2.user From candidature_request as cr 
JOIN account as c1 ON c1.id = cr.candidate JOIN account as c2 ON c2.id = cr.author JOIN request as r on r.id = cr.id_request;