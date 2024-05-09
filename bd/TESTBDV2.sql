USE atlanticar;
DROP TABLE IF EXISTS offer_client;
DROP TABLE IF EXISTS apply_offer;
DROP TABLE IF EXISTS apply_request;
DROP TABLE IF EXISTS offer;
DROP TABLE IF EXISTS request;
DROP TABLE IF EXISTS notification;
DROP TABLE IF EXISTS account;

CREATE TABLE account
(   
    id     			INT auto_increment,
    user 			varchar(30),
    password		varchar(30) NOT NULL,
    phone_number   	TEXT NOT NULL,
    primary key (id)
);

CREATE TABLE offer
(   
    id              INT primary key auto_increment,
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
    id              INT primary key auto_increment,
    departure     	TEXT,
    arrival		    TEXT,
    date            datetime,
    price           float,
    comment     	varchar(200),
    author          INT,
    conductor		INT,
    FOREIGN KEY (author) REFERENCES account(id)
);

create table apply_offer
(	
    candidate 		INT,
    id_offer 		INT,
    author 			INT,
    date			datetime,
    FOREIGN KEY (candidate) REFERENCES account(id),
    FOREIGN KEY (id_offer) REFERENCES offer(id),
    FOREIGN KEY (author) REFERENCES account(id),
    primary key (candidate, id_offer, author)
);

create table apply_request
(	
    candidate 		INT,
    id_request 		INT,
    author 			INT,
    date			datetime,
    FOREIGN KEY (candidate) REFERENCES account(id),
    FOREIGN KEY (id_request) REFERENCES request(id),
    FOREIGN KEY (author) REFERENCES account(id),
    primary key (candidate,id_request,author)
);

create table offer_client
(
	client			INT,
    id_offer 		INT,
    Foreign Key (client) REFERENCES account(id),
    Foreign Key (id_offer) REFERENCES offer(id),
    Primary Key (client, id_offer)
);

create table notification
(
	id serial,
	id_account int,
    message TEXT, 
    seen bool,
    date DATETIME,
    PRIMARY KEY (id),
    FOREIGN KEY (id_account) references account(id)
);


insert into account values (default,'JC','1234','06 12 34 56 78');
insert into account values (default,'Jean-Eude','1234','06 00 00 00 00');
insert into account values (default,'Eugène','1234','06 11 11 11 11');
insert into account values (default,'Jean Michel IV', '2146','06 69 96 69 96');

insert into request values (DEFAULT, 'IMT Atlantique Brest','Carrefour Plouzané','2024-08-01 10:30:00',0,'ne se prononce pas',1,null);
insert into request values (DEFAULT, 'IMT Atlantique Brest', 'Carrefour Plouzané', '2024-09-01 11:30:00',0,'ne se prononce pas',1,null);
insert into request values (DEFAULT, 'IMT Atlantique Brest', 'Carrefour Plouzané', '2024-10-01 10:30:00',0,'salut',2,null);
insert into request values (DEFAULT, 'IMT Atlantique Brest', 'Brest', '2024-11-01 10:30:00',0,'ne se prononce pas',2,null);
insert into request values (DEFAULT, 'IMT Atlantique Brest', 'Brest', '2024-11-01 12:00:00',0,'ne se prononce pas',3,null);
insert into request values (DEFAULT, 'IMT Atlantique Brest', 'Brest', '2024-11-01 10:30:00',10,'ne se prononce pas',2,null);
insert into request values (DEFAULT, 'IMT Atlantique Brest', 'Aéroport Brest', '2024-11-01 12:00:00',10,'ne se prononce pas',3,null);
insert into request values (DEFAULT, 'Brest', 'Carrefour', '2024-11-01 10:30:00',35,'ne se prononce pas',2,null);
insert into request values (DEFAULT, 'Aéroport', 'IMT Atlantique Brest', '2024-11-01 12:00:00',50,'ne se prononce pas',3,null);
 
insert into apply_request values (2,1,1,'2024-05-05 16:23:54');
insert into notification values (default, 1, "Jean-Eude a candidaté à une de vos requêtes", false, NOW());

insert into apply_request values (3,2,1,'2024-05-05 18:43:14');
insert into notification values (default, 1, "Eugène a candidaté à une de vos requêtes", false, NOW());

#les annonces de JC
SELECT * FROM request as r JOIN account as c ON c.id = r.author WHERE c.user = 'JC'; 

#Les annonces (requête) acceptés par des gens
SELECT c1.user as candidate,r.departure,r.arrival,r.date,c2.user as author From apply_request as cr 
JOIN account as c1 ON c1.id = cr.candidate JOIN account as c2 ON c2.id = cr.author JOIN request as r on r.id = cr.id_request;


#ajoutons des annonces auquel on est inscrit
insert into offer values (DEFAULT,'Brest','IMT Atlantique Brest','2024-09-11 12:00:00',3,1,'J ai un gros coffre',4);
insert into offer values (DEFAULT,'Gare Brest','IMT Atlantique Brest','2024-09-21 12:30:00',8,2,'peu de place',4);

#JC postule aux annonces :
insert into apply_offer values (1,1,4,'2024-05-05 16:23:54');
insert into notification values (default, 4, "JC a candidaté à une de vos offres", false, NOW());

insert into apply_offer values (1,2,4,'2024-05-06 16:23:54');
insert into notification values (default, 4, "JC a candidaté à une de vos offres", false, NOW());