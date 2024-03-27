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