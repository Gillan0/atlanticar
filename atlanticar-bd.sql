DROP TABLE IF EXISTS offre CASCADE;
DROP TABLE IF EXISTS requete CASCADE;
DROP TABLE IF EXISTS compte CASCADE;

CREATE TABLE offre
(   
    id              SERIAL PRIMARY KEY NULL,
    auteur          INTEGER NOT NULL,
    lieu_depart     TEXT,
    lieu_arrive     TEXT,
    date            DATE,
    heure           TIME
    prix            DECIMAL,
    nb_place        INT,
    commentaire     TEXT,
    FOREIGN KEY (auteur) REFERENCES compte(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE requete
(   
    id              SERIAL PRIMARY KEY NOT NULL,
    auteur          INTEGER NOT NULL,
    lieu_depart     TEXT,
    lieu_arrive     TEXT,
    date            DATE,
    heure           TIME,
    prix            INT,
    commentaire     TEXT,
    FOREIGN KEY (auteur) REFERENCES compte(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE compte
(   
    identifiant     SERIAL PRIMARY KEY NOT NULL,
    mot_de_passe    TEXT,
    telephone       INT,
    date            DATE,
    id_offre_cree   NULL,
    id_requête_cree NULL
);

insert into requete values (DEFAULT, 'IMT Atlantique Brest', 'Carrefour Plouzané', '2024-08-01','10h30',0,'ne se prononce pas','JC')
