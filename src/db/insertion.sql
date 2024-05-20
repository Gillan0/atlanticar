-- users insert
-- Inserting individual records into the `account` table with DEFAULT for the auto-increment ID
INSERT INTO account VALUES (DEFAULT, 'JC', '1234', '06 12 34 56 78', 'jc.jean@gmail.com');
INSERT INTO account VALUES (DEFAULT, 'Jean-Eude', '1234', '06 00 00 00 00', 'je.jeude@gmail.com');
INSERT INTO account VALUES (DEFAULT, 'Eugène', '1234', '06 11 11 11 11', 'eugene.gene@gmail.com');
INSERT INTO account VALUES (DEFAULT, 'Jean Michel IV', '2146', '06 69 96 69 96', 'jeanmi.chel@gmail.com');
INSERT INTO account VALUES (DEFAULT, 'Albert', 'alibaba', '06 69 96 69 96', 'ali.baba@gmail.com');
INSERT INTO account VALUES (DEFAULT, 'Tanya', 'Evil', '06 66 66 66 66', 'ta.nya@gmail.com');
INSERT INTO account VALUES (DEFAULT, 'Don Carlos', '12345', '07 66 66 66 86', 'charly.martin-avila@imt-atlantique.net');


-- Inserting data into the request table
INSERT INTO request VALUES (DEFAULT, 1, NULL, 'IMT Atlantique Brest', 'Carrefour Plouzané', '2024-08-01 10:30:00', 0, '');
INSERT INTO request VALUES (DEFAULT, 1, NULL, 'IMT Atlantique Brest', 'Carrefour Plouzané', '2024-09-01 11:30:00', 0, '');
INSERT INTO request VALUES (DEFAULT, 2, NULL, 'IMT Atlantique Brest', 'Carrefour Plouzané', '2024-10-01 10:30:00', 0, 'salut');
INSERT INTO request VALUES (DEFAULT, 2, NULL, 'IMT Atlantique Brest', 'Decathlon Brest', '2024-11-01 10:30:00', 0, '');
INSERT INTO request VALUES (DEFAULT, 3, NULL, 'IMT Atlantique Brest', 'Brest', '2024-11-01 12:00:00', 0, '');
INSERT INTO request VALUES (DEFAULT, 2, NULL, 'IMT Atlantique Brest', 'Brest', '2024-11-01 10:30:00', 10, '');
INSERT INTO request VALUES (DEFAULT, 3, NULL, 'IMT Atlantique Brest', 'Aéroport Brest', '2024-11-01 12:00:00', 10, '');
INSERT INTO request VALUES (DEFAULT, 2, NULL, 'Brest', 'Carrefour', '2024-11-01 10:30:00', 35, '');
INSERT INTO request VALUES (DEFAULT, 3, NULL, 'Aéroport', 'IMT Atlantique Brest', '2024-11-01 12:00:00', 50, '');
INSERT INTO request VALUES (DEFAULT, 1, NULL, 'Decathlon Brest', 'Carrefour Plouzané', '2024-09-18 10:30:00', 0, '');
INSERT INTO request VALUES (DEFAULT, 1, NULL, 'Locmaria-Plouzané', 'IMT Atlantique Brest', '2024-11-01 11:30:00', 0, '');
INSERT INTO request VALUES (DEFAULT, 2, NULL, 'Lidl Plouzané', 'Brest', '2024-10-11 10:30:00', 0, 'salut');
INSERT INTO request VALUES (DEFAULT, 2, NULL, 'Lidl Plouzané', 'Brest', '2024-11-21 10:30:00', 0, '');
INSERT INTO request VALUES (DEFAULT, 3, NULL, 'Lidl Plouzané', 'Brest', '2024-11-13 12:00:00', 0, '');
INSERT INTO request VALUES (DEFAULT, 2, NULL, 'Locmaria-Plouzané', 'Aéroport', '2024-10-15 10:30:00', 10, '');
INSERT INTO request VALUES (DEFAULT, 3, NULL, 'IMT Atlantique Brest', 'Locmaria-Plouzané', '2024-10-29 12:00:00', 10, '');
INSERT INTO request VALUES (DEFAULT, 2, NULL, 'Brest', 'Aéroport', '2024-11-01 15:30:00', 35, 'Je me présente, je m appelle Henry');
INSERT INTO request VALUES (DEFAULT, 3, NULL, 'Aéroport', 'IMT Atlantique Brest', '2024-11-01 08:00:00', 50, '');
INSERT INTO request VALUES (DEFAULT, 4, NULL, 'IMT Atlantique Brest', 'Aéroport Brest', '2024-10-09 12:30:00', 10, 'alors, on attend pas Patrique !?');
INSERT INTO request VALUES (DEFAULT, 1, NULL, 'IMT Atlantique Brest', 'Brest', '2024-08-08 14:30:00', 60, '60m² avec vu sur le parc');
INSERT INTO request VALUES (DEFAULT, 2, NULL, 'IMT Atlantique Brest', 'Brest', '2024-08-07 16:30:00', 90, 'j ai avec moi beaucoup de matériel');
INSERT INTO request VALUES (DEFAULT, 3, NULL, 'Brest', 'Carrefour', '2024-08-06 18:30:00', 35, '');
INSERT INTO request VALUES (DEFAULT, 4, NULL, 'Aéroport', 'IMT Atlantique Brest', '2024-08-05 20:30:00', 50, 'damn');
INSERT INTO request VALUES (DEFAULT, 2, NULL, 'IMT Atlantique Brest', 'Decathlon Brest', '2024-12-01 10:30:00', 0, '');
INSERT INTO request VALUES (DEFAULT, 3, NULL, 'IMT Atlantique Brest', 'Brest', '2024-12-01 12:00:00', 0, '');
INSERT INTO request VALUES (DEFAULT, 2, NULL, 'IMT Atlantique Brest', 'Brest', '2024-12-01 10:30:00', 10, '');
INSERT INTO request VALUES (DEFAULT, 3, NULL, 'IMT Atlantique Brest', 'Aéroport Brest', '2024-12-01 12:00:00', 10, '');
INSERT INTO request VALUES (DEFAULT, 2, NULL, 'Brest', 'Carrefour', '2024-12-01 10:30:00', 35, '');
INSERT INTO request VALUES (DEFAULT, 3, NULL, 'Aéroport', 'IMT Atlantique Brest', '2024-12-01 12:00:00', 50, '');
INSERT INTO request VALUES (DEFAULT, 1, NULL, 'Decathlon Brest', 'Carrefour Plouzané', '2024-12-18 10:30:00', 0, '');
INSERT INTO request VALUES (DEFAULT, 1, NULL, 'Locmaria-Plouzané', 'IMT Atlantique Brest', '2025-01-01 11:30:00', 0, '');
INSERT INTO request VALUES (DEFAULT, 2, NULL, 'Lidl Plouzané', 'Brest', '2025-01-11 10:30:00', 0, 'salut');
INSERT INTO request VALUES (DEFAULT, 2, NULL, 'Lidl Plouzané', 'Brest', '2025-01-21 10:30:00', 0, '');
INSERT INTO request VALUES (DEFAULT, 3, NULL, 'Lidl Plouzané', 'Brest', '2025-01-13 12:00:00', 0, '');
INSERT INTO request VALUES (DEFAULT, 2, NULL, 'Locmaria-Plouzané', 'Aéroport', '2025-01-15 10:30:00', 10, '');
INSERT INTO request VALUES (DEFAULT, 3, NULL, 'IMT Atlantique Brest', 'Locmaria-Plouzané', '2025-01-29 12:00:00', 10, '');
INSERT INTO request VALUES (DEFAULT, 2, NULL, 'Brest', 'Aéroport', '2025-01-01 15:30:00', 35, 'Je me présente, je m appelle Henry');
INSERT INTO request VALUES (DEFAULT, 3, NULL, 'Aéroport', 'IMT Atlantique Brest', '2025-01-01 08:00:00', 50, '');
INSERT INTO request VALUES (DEFAULT, 4, NULL, 'IMT Atlantique Brest', 'Aéroport Brest', '2025-01-09 12:30:00', 10, 'alors, on attend pas Patrique !?');
INSERT INTO request VALUES (DEFAULT, 1, NULL, 'IMT Atlantique Brest', 'Brest', '2025-01-08 14:30:00', 60, '60m² avec vu sur le parc');
INSERT INTO request VALUES (DEFAULT, 1, NULL, 'IMT Atlantique Brest', 'Brest', '2025-02-01 16:00:01', 60, '100m² avec vu sur la plage');


-- Inserting data into the offer table (id, author, departure, arrival, date, price, nb_seats, comment)
INSERT INTO offer VALUES (DEFAULT, 5, 'Brest', 'IMT Atlantique Brest', '2024-09-11 12:00:00', 3, 3, 'Ya');
INSERT INTO offer VALUES (DEFAULT, 6, 'Gare Brest', 'IMT Atlantique Brest', '2024-08-21 12:30:00', 8, 2, 'Vodka');
INSERT INTO offer VALUES (DEFAULT, 5, 'Brest', 'IMT Atlantique Brest', '2024-07-11 12:00:00', 3, 2, 'pas de bras, pas de chocolat');
INSERT INTO offer VALUES (DEFAULT, 6, 'Gare Brest', 'IMT Atlantique Brest', '2024-10-21 12:30:00', 8, 1, 'en avant');
INSERT INTO offer VALUES (DEFAULT, 5, 'Brest', 'IMT Atlantique Brest', '2024-11-11 12:00:00', 3, 1, '');
INSERT INTO offer VALUES (DEFAULT, 6, 'Gare Brest', 'IMT Atlantique Brest', '2024-09-22 12:30:00', 8, 2, '');
INSERT INTO offer VALUES (DEFAULT, 5, 'Brest', 'IMT Atlantique Brest', '2024-09-11 12:00:00', 3, 4, '');
INSERT INTO offer VALUES (DEFAULT, 6, 'Gare Brest', 'IMT Atlantique Brest', '2024-09-18 12:30:00', 8, 2, '');
INSERT INTO offer VALUES (DEFAULT, 5, 'Brest', 'IMT Atlantique Brest', '2024-09-15 12:00:00', 3, 1, 'J ai un gros coffre');
INSERT INTO offer VALUES (DEFAULT, 6, 'Gare Brest', 'IMT Atlantique Brest', '2024-09-01 12:30:00', 8, 3, 'peu de place');
INSERT INTO offer VALUES (DEFAULT, 5, 'Aéroport Brest', 'IMT Atlantique Brest', '2024-09-11 12:00:00', 3, 3, 'Ya');
INSERT INTO offer VALUES (DEFAULT, 6, 'Gare Brest', 'IMT Atlantique Brest', '2024-08-21 12:30:00', 8, 2, 'Vodka');
INSERT INTO offer VALUES (DEFAULT, 5, 'Brest', 'IMT Atlantique Brest', '2024-07-11 12:00:00', 3, 2, 'pas de bras, pas de chocolat');
INSERT INTO offer VALUES (DEFAULT, 6, 'Gare Brest', 'IMT Atlantique Brest', '2024-10-21 12:30:00', 8, 1, 'en avant');
INSERT INTO offer VALUES (DEFAULT, 5, 'Decathlon Brest', 'IMT Atlantique Brest', '2024-11-11 12:00:00', 3, 1, '');
INSERT INTO offer VALUES (DEFAULT, 6, 'Gare Brest', 'Aéroport Brest', '2024-09-22 12:30:00', 8, 2, '');
INSERT INTO offer VALUES (DEFAULT, 5, 'Brest', 'IMT Atlantique Brest', '2024-09-11 12:00:00', 3, 4, '');
INSERT INTO offer VALUES (DEFAULT, 6, 'Aéroport Brest', 'IMT Atlantique Brest', '2024-09-18 12:30:00', 8, 2, '');
INSERT INTO offer VALUES (DEFAULT, 5, 'Brest', 'IMT Atlantique Brest', '2024-09-15 12:00:00', 3, 1, 'J ai un gros coffre');
INSERT INTO offer VALUES (DEFAULT, 6, 'Gare Brest', 'Lidl Plouzané', '2024-09-01 12:30:00', 8, 3, 'peu de place');
INSERT INTO offer VALUES (DEFAULT, 5, 'Brest', 'Decathlon Brest', '2024-09-12 12:00:00', 3, 3, 'Ya');
INSERT INTO offer VALUES (DEFAULT, 6, 'Gare Brest', 'IMT Atlantique Brest', '2024-12-21 12:30:00', 8, 2, 'Vodka');
INSERT INTO offer VALUES (DEFAULT, 5, 'Brest', 'IMT Atlantique Brest', '2024-12-11 12:00:00', 3, 2, 'pas de bras, pas de chocolat');
INSERT INTO offer VALUES (DEFAULT, 6, 'Gare Brest', 'IMT Atlantique Brest', '2024-12-21 12:30:00', 8, 1, 'en avant');
INSERT INTO offer VALUES (DEFAULT, 5, 'Brest', 'IMT Atlantique Brest', '2024-12-01 12:00:00', 3, 1, '');
INSERT INTO offer VALUES (DEFAULT, 6, 'Gare Brest', 'IMT Atlantique Brest', '2024-12-22 12:30:00', 8, 2, '');
INSERT INTO offer VALUES (DEFAULT, 5, 'Brest', 'IMT Atlantique Brest', '2024-12-30 12:00:00', 3, 4, '');
INSERT INTO offer VALUES (DEFAULT, 6, 'Gare Brest', 'IMT Atlantique Brest', '2024-12-29 12:30:00', 8, 2, '');
INSERT INTO offer VALUES (DEFAULT, 5, 'Brest', 'IMT Atlantique Brest', '2024-12-14 12:00:00', 3, 1, 'J ai un gros coffre');
INSERT INTO offer VALUES (DEFAULT, 6, 'Gare Brest', 'IMT Atlantique Brest', '2024-12-02 12:30:00', 8, 3, 'peu de place');
INSERT INTO offer VALUES (DEFAULT, 5, 'Aéroport Brest', 'IMT Atlantique Brest', '2024-12-06 12:00:00', 3, 3, 'Ya');
INSERT INTO offer VALUES (DEFAULT, 6, 'Gare Brest', 'IMT Atlantique Brest', '2024-12-19 12:30:00', 8, 2, 'Vodka');
INSERT INTO offer VALUES (DEFAULT, 5, 'Brest', 'IMT Atlantique Brest', '2024-12-08 12:00:00', 3, 2, 'pas de bras, pas de chocolat');
INSERT INTO offer VALUES (DEFAULT, 6, 'Gare Brest', 'IMT Atlantique Brest', '2024-12-09 12:30:00', 8, 1, 'en avant');
INSERT INTO offer VALUES (DEFAULT, 5, 'Decathlon Brest', 'IMT Atlantique Brest', '2024-12-13 12:00:00', 3, 1, '');
INSERT INTO offer VALUES (DEFAULT, 6, 'Gare Brest', 'Aéroport Brest', '2024-12-22 19:30:00', 8, 2, '');
INSERT INTO offer VALUES (DEFAULT, 5, 'Brest', 'IMT Atlantique Brest', '2024-07-11 12:00:00', 3, 4, '');
INSERT INTO offer VALUES (DEFAULT, 6, 'Aéroport Brest', 'IMT Atlantique Brest', '2024-07-18 12:30:00', 8, 2, '');
INSERT INTO offer VALUES (DEFAULT, 5, 'Brest', 'IMT Atlantique Brest', '2024-06-15 12:00:00', 3, 1, 'J ai un gros coffre');
INSERT INTO offer VALUES (DEFAULT, 6, 'Gare Brest', 'Lidl Plouzané', '2024-06-01 12:30:00', 8, 3, 'peu de place');
INSERT INTO offer VALUES (DEFAULT, 5, 'Plouzané-Locmaria', 'Brest', '2025-01-11 12:00:00', 3, 4, 'ola');


-- Application for request with add of notification
-- apply_request: (candidate, id_request, author, date)
-- notification: (id, id_account, message, seen, date)
INSERT INTO apply_request VALUES (2, 1, 1, '2024-05-05 16:23:54');
INSERT INTO apply_request VALUES (3, 2, 1,'2024-05-05 18:43:14');
INSERT INTO notification VALUES (DEFAULT, 1, "Jean-Eude a candidaté à une de vos requêtes", DEFAULT, NOW());
INSERT INTO notification VALUES (DEFAULT, 1, "Eugène a candidaté à une de vos requêtes", DEFAULT, NOW());


-- Inserting applications of JC (id 1) to the apply_offer table
-- apply_offer: (candidate, id_offer, author, date)
-- notification: (id, id_account, message, seen, date)
INSERT INTO apply_offer VALUES (1, 1, 4, '2024-05-05 16:23:54');
INSERT INTO apply_offer VALUES (1, 2, 4, '2024-05-06 16:23:54');
INSERT INTO notification VALUES (DEFAULT, 4, 'JC a candidaté à une de vos offres', DEFAULT, NOW());
INSERT INTO notification VALUES (DEFAULT, 4, 'JC a candidaté à une de vos offres', DEFAULT, NOW());