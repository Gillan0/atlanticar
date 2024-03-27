DROP TABLE IF EXISTS offre CASCADE;
DROP TABLE IF EXISTS requete CASCADE;
DROP TABLE IF EXISTS compte CASCADE;

CREATE TABLE offre
(   
    id              serial primary key,
    lieu_depart     TEXT,
    lieu_arrive     TEXT,
    date            DATE,
    heure           TIME
    prix            DECIMAL,
    nb_place        INT,
    commentaire     TEXT,
    auteur          REFERENCES compte (identifiant)
);

CREATE TABLE requete
(   
    id              serial primary key,
    lieu_depart     TEXT,
    lieu_arrive     TEXT,
    date            DATE,
    heure           TIME,
    prix            INT,
    commentaire     TEXT,
    auteur          REFERENCES compte (identifiant)
);

CREATE TABLE compte
(   
    identifiant     primary key,
    mot_de_passe    TEXT,
    telephone       INT,
    date            DATE,
    id_offre_cree   NULL,
    id_requête_cree NULL
);

insert into requete values (DEFAULT, 'IMT Atlantique Brest', 'Carrefour Plouzané', '2024-08-01','10h30',0,'ne se prononce pas','JC')
--bonjour--