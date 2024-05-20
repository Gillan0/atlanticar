const http = require('http');
const port = 3000;
const mysql = require('mysql');
const nodemailer = require("nodemailer");
require("dotenv").config();
const path = require("path");
const new_password = Math.random().toString(36).substr(2, 12);

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306, // Port de la base de données MySQL
    user: 'root',
    password: 'Ps1d4f9x28Clq5TbN6X810z',
    database: 'atlanticar'
})

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "atlanticarservices@gmail.com",
      pass: "nlkeyzfikaigmlkz",
    },
  })

const mailOptions = {
    from: {
            name: "AtlantiCar Services", 
            address: "atlanticarservices@gmail.com"
    },
    to: [],
    subject: "Mot de passe oublié",
    text: "Voici votre nouveau mot de passe: " + new_password,
    html: "<b>Voici votre nouveau mot de passe: " + new_password + "</b>",
}


const sendMail = async (transporter, mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email has been sent !");
    }  catch (error) {
        console.error(error);
    }
}


connection.connect((err) => {
    if (err) {
      console.error('Erreur de connexion à la base de données :', err);
      return;
    }
    console.log('Connecté à la base de données MySQL');
})

function interpret(data) {

    let queries;
    let parameters;
    let id_author;
    let author;
    let id_offer;
    let candidates= [];
    let passengers = [];
    let id_request;
    let conductor;
    
    switch (data.command) {
        case ('get_default_offers') :
            return [[`
            SELECT
                o.id,
                o.departure,
                o.arrival, o.date,
                o.price,
                o.nb_seat,
                o.comment,
                a.user as user,
                o.author AS author
            FROM offer AS o
            JOIN  account AS a ON a.id = o.author
            WHERE
                o.nb_seat > 0
                AND author != ?
                AND ? NOT IN
                (
                SELECT candidate AS user FROM apply_offer
                WHERE id_offer = o.id
                UNION
                SELECT client AS user FROM offer_client
                WHERE id_offer = o.id
                )
            ORDER BY o.date
            LIMIT 20 OFFSET ?;
            `],
            [[data.id, data.id, 20*data.parameters[4]]]]
       
        case ('get_default_requests') :
            return [[`
                SELECT
                    r.id,
                    r.departure,
                    r.arrival,
                    r.date,
                    r.price,
                    r.comment,
                    a.user as user,
                    r.author
                FROM request as r
                JOIN account as a ON a.id = r.author
                WHERE
                    author != ?
                    AND r.conductor IS NULL
                ORDER BY r.date
                LIMIT 20 OFFSET ?;
                `],
                [[data.id, 20*data.parameters[4]]]]
       
        case ('get_filter_requests') :
            if (data.parameters == ['','','','9999']) {
                return [[`
                SELECT
                    r.id,
                    r.departure,
                    r.arrival,
                    r.date,
                    r.price,
                    r.comment,
                    a.user as user,
                    r.author
                FROM request as r
                JOIN account as a ON a.id = r.author
                WHERE
                    author != ?
                    AND r.conductor IS NULL
                ORDER BY r.date
                LIMIT 20 OFFSET ?;
                `],
                    [[data.id, 20*data.parameters[4]]]]
            }            
            return [[`
                SELECT
                    r.id,
                    r.departure,
                    r.arrival,
                    r.date,
                    r.price,
                    r.comment,
                    a.user AS user,
                    r.author,
                    IF(r.conductor IS NOT NULL, c.user, NULL) AS conductor
                FROM request AS r
                JOIN account AS a ON a.id = r.author
                LEFT JOIN account AS c ON c.id = r.conductor
                WHERE
                    r.departure LIKE ?
                    AND r.arrival LIKE ?
                    AND ABS(DATEDIFF(r.date, ?)) <= 7
                    AND r.price <= ?
                    AND author != ?
                    AND r.conductor IS NULL
                ORDER BY r.date
                LIMIT 20 OFFSET ?;
                `],
                [[`%${data.parameters[0]}%`, `%${data.parameters[1]}%`, data.parameters[2], data.parameters[3], data.id, 20*data.parameters[4]]]]

        case ('get_filter_offers') :
            if (data.parameters == ['','','','9999']) {
                return [[`
                SELECT
                    o.id,
                    o.departure,
                    o.arrival, o.date,
                    o.price,
                    o.nb_seat,
                    o.comment,
                    a.user as user,
                    o.author AS author
                FROM offer AS o
                JOIN  account AS a ON a.id = o.author
                WHERE
                    o.nb_seat > 0
                    AND author != ?
                    AND ? NOT IN
                    (
                    SELECT candidate AS user FROM apply_offer
                    WHERE id_offer = o.id
                    UNION
                    SELECT client AS user FROM offer_client
                    WHERE id_offer = o.id
                    )
                ORDER BY o.date;
                LIMIT 20 OFFSET ?;
                `],
                    [[data.id, data.id, 20*data.parameters[4]]]]
            }            
            return [[`
                SELECT
                    o.id,
                    o.departure,
                    o.arrival,
                    o.date,
                    o.price,
                    o.nb_seat,
                    o.comment,
                    a.user AS user,
                    o.author
                FROM offer AS o
                JOIN account AS a ON a.id = o.author
                WHERE
                    o.nb_seat > 0
                    AND o.departure LIKE ?
                    AND o.arrival LIKE ?
                    AND ABS(DATEDIFF(o.date, ?)) <= 7
                    AND o.price <= ?
                    AND author != ?
                    AND ? NOT IN
                    (
                    SELECT candidate AS user FROM apply_offer
                    WHERE id_offer = o.id
                    UNION
                    SELECT client AS user FROM offer_client
                    WHERE id_offer = o.id
                ORDER BY o.date;
                LIMIT 20 OFFSET ?;
                `],
                [[`%${data.parameters[0]}%`, `%${data.parameters[1]}%`, data.parameters[2], data.parameters[3], data.id, data.id, 20*data.parameters[4]]]]
       
        case ('signIn'):
            return [[`
                SELECT
                    (CASE
                        WHEN EXISTS (SELECT * FROM account WHERE user = ? AND password = ?)
                            THEN 'TRUE'
                        ELSE
                            'FALSE'
                    END) AS answer,
                    id
                FROM account
                WHERE
                    user = ?
                    AND password = ?;
                `,`SELECT phone_number, email FROM account WHERE user = ? AND password = ?;`],
                [[data.parameters[0], data.parameters[1],data.parameters[0], data.parameters[1]], [data.parameters[0], data.parameters[1]]]]
        
        case  ('modify_password'):
            return [[`UPDATE account 
                      SET password = ? 
                      WHERE id = ? AND password = ? ;`],
            [[data.parameters[0], data.id, data.password]]]
        
        case ('modify_phone_number'):
            return [[
                `UPDATE account
                SET phone_number = ?
                WHERE id = ? AND password = ?;`],
            [[data.parameters[0], data.id, data.password]]]
        
        case ('modify_email'):
            return [[
                `UPDATE account
                SET email = ?
                WHERE id = ? AND password = ?;`],
            [[data.parameters[0], data.id, data.password]]]
        
        case ('mot_de_passe_oublie'):
            const user = data.parameters[0];
            const email = data.parameters[1];
            mailOptions.to = [email];
            sendMail(transporter, mailOptions);
            return [[`
                    UPDATE account
                    SET password = ?
                    WHERE user = ?;
            `],
            [[new_password, data.parameters[0]]]];


        case ('signUp'):
            return [[`
                INSERT INTO account (user, password, phone_number, email)
                SELECT ?, ?, ?, ? FROM DUAL
                WHERE NOT EXISTS (
                    SELECT * FROM account
                    WHERE user = ? OR phone_number = ?
                );
            `],
            [
                [data.parameters[0], data.parameters[1], data.parameters[2], data.parameters[3], data.parameters[0], data.parameters[2]]
            ]];


        case ('get_announcements_requests') :
            return [[`
            SELECT
                r.id,
                r.departure,
                r.arrival,
                r.date,
                r.price,
                r.comment,
                CONCAT(r.conductor, ':', acc.user, ':', acc.phone_number) AS conductor,
                (
                    SELECT
                        GROUP_CONCAT(CONCAT(ar.candidate, ':', a.user, ':', a.phone_number) SEPARATOR ', ')
                    FROM apply_request AS ar
                    JOIN account AS a ON ar.candidate = a.id
                    WHERE
                        ar.id_request = r.id
                ) AS candidates
            FROM request AS r
            LEFT JOIN account AS acc ON r.conductor = acc.id 
            WHERE r.author = ?;
                `],
                [[data.id]]]

        case ('get_announcements_offers') :
            return [[`
                SELECT
                o.id,
                o.departure,
                o.arrival,
                o.date,
                o.price,
                o.nb_seat,
                o.comment,
                (
                    SELECT
                        GROUP_CONCAT(CONCAT(ao.candidate, ':', a.user, ':', a.phone_number) SEPARATOR ', ')
                    FROM apply_offer AS ao
                    JOIN account AS a ON ao.candidate = a.id
                    WHERE
                        ao.id_offer = o.id
                ) AS candidates,
                (
                    SELECT
                        GROUP_CONCAT(CONCAT(oc.client, ':', a.user, ':', a.phone_number) SEPARATOR ', ')
                    FROM offer_client AS oc
                    JOIN account AS a ON oc.client = a.id
                    WHERE
                        oc.id_offer = o.id
                ) AS passengers
                FROM offer AS o
                WHERE o.author = ?
                `],
                [[data.id]]]
       
        case ('get_applications_offers') :
            return [[`
                SELECT 
                    o.id,
                    o.departure, 
                    o.arrival, 
                    o.date, 
                    o.price, 
                    o.nb_seat, 
                    o.comment, 
                    a.user AS author, 
                    'False' AS state ,
                    null AS phone
                FROM offer AS o 
                JOIN apply_offer AS ao ON ao.id_offer = o.id 
                JOIN account AS a ON a.id = o.author 
                WHERE 
                    ao.candidate = ? 
                UNION 
                SELECT 
                    o.id, 
                    o.departure, 
                    o.arrival, 
                    o.date, 
                    o.price, 
                    o.nb_seat, 
                    o.comment, 
                    a.user AS author, 
                    'True' AS state ,
                    a.phone_number AS phone
                FROM offer AS o 
                JOIN offer_client AS oc ON oc.id_offer = o.id 
                JOIN account AS a ON a.id = o.author 
                WHERE 
                    oc.client = ?;`],
                [[data.id,data.id]]]
       
        case ('get_applications_requests') :
            return [[`
                SELECT 
                    r.id, 
                    r.departure, 
                    r.arrival, 
                    r.date, 
                    r.price, 
                    r.comment, 
                    a.user AS author, 
                    'False' AS state ,
                    null AS phone
                FROM request AS r 
                JOIN apply_request AS ar ON ar.id_request = r.id 
                JOIN account AS a ON a.id = r.author 
                WHERE 
                    ar.candidate = ? 
                UNION 
                SELECT 
                    r.id, 
                    r.departure, 
                    r.arrival, 
                    r.date, 
                    r.price, 
                    r.comment, 
                    a.user AS author, 
                    'True' AS state ,
                    a.phone_number AS phone
                FROM request AS r 
                JOIN account AS a ON a.id = r.author 
                WHERE 
                    r.conductor = ?;`
                ],
                [[data.id,data.id]]]
               
        case ('apply_to_offer'):
            return [['INSERT IGNORE INTO apply_offer (candidate, id_offer, author, date) VALUES (?, ?, ?, NOW());',
            `INSERT INTO notification VALUES (DEFAULT, ?, CONCAT( ?, ' a candidaté à une de vos offres'), false, NOW());`]
            , data.parameters]

        case ('apply_to_request'):
            return [['INSERT IGNORE INTO  apply_request (candidate, id_request, author, date) VALUES (?, ?, ?, NOW());',
            `INSERT INTO notification VALUES (DEFAULT, ?, CONCAT( ?, ' a candidaté à une de vos requêtes'), false, NOW());`]
            , data.parameters]  

        case ('accept_application_offer'):
            return [
                ['INSERT INTO offer_client (client, id_offer) VALUES (?, ?);',
                'DELETE FROM apply_offer WHERE candidate = ? AND id_offer = ? AND author = ?;',
                'UPDATE offer SET nb_seat = nb_seat - 1 WHERE id = ?;',
                `INSERT INTO notification VALUES (DEFAULT, ?, CONCAT( ?, ' a accepté votre candidature à son offre'), false, NOW());`]
               , data.parameters]

        case ('accept_application_request'):
            return  [
                ['DELETE FROM apply_request WHERE candidate = ? AND id_request = ? AND author = ?;',
                'UPDATE request SET conductor = ? WHERE id = ?;',
                `INSERT INTO notification VALUES (DEFAULT, ?, CONCAT( ?, ' a accepté votre candidature à sa requête'), false, NOW());`]
               , data.parameters]

        case ('refuse_application_offer'):
            return [
                ['DELETE FROM apply_offer WHERE candidate = ? AND id_offer = ? AND author = ?;',
                'UPDATE offer SET nb_seat = nb_seat + 1 WHERE id = ?;',
                `INSERT INTO notification VALUES (DEFAULT, ?, CONCAT( ?, ' a refusé votre candidature à son offre'), false, NOW());`]
               , data.parameters]

        case ('refuse_application_request'):
            return  [
                ['DELETE FROM apply_request WHERE candidate = ? AND id_request = ? AND author = ?;',
                `INSERT INTO notification VALUES (DEFAULT, ?, CONCAT( ?, ' a refusé votre candidature à sa requête'), false, NOW());`]
               , data.parameters]

       case ('cancel_passenger'):
            return  [
                ['DELETE FROM offer_client WHERE id_offer = ? AND client = ?;',
                'UPDATE offer SET nb_seat = nb_seat + 1 WHERE id = ?;',
                `INSERT INTO notification VALUES (DEFAULT, ?, CONCAT( ?, ' a annulé votre trajet en tant que passager'), false, NOW());`
                ]
                , data.parameters]
        
        case ('cancel_conductor'):
            return  [
                ['UPDATE request SET conductor = NULL WHERE id = ?;',
                `INSERT INTO notification VALUES (DEFAULT, ?, CONCAT( ?, ' a annulé votre trajet en tant que conducteur'), false, NOW());`]
                , data.parameters]

        case ('upload_offer'):
            return [['INSERT IGNORE INTO offer VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?);']
                , [data.parameters]]  
       
        case ('upload_request'):
            return [['INSERT IGNORE INTO request VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, NULL);']
                , [data.parameters]]  

        case ('modify_offer'):
            [queries, parameters] = [[],[]];
            param1 = data.parameters[0];
            candidates = data.parameters[1];
            passengers = data.parameters[2];
            author = data.parameters[3];
            console.log(data.parameters)
            queries.push(`
                            UPDATE 
                                offer 
                            SET 
                                departure = ?,
                                arrival = ?,
                                date = ?,
                                price =  ?,
                                nb_seat = ?, 
                                comment = ?
                            WHERE id = ? AND author = ? and ? = (SELECT a.password FROM account AS a WHERE a.id = ?);`);
            parameters.push(param1);
            candidates.map((value) => {
                if (value) { 
                    let id_candidate = parseInt(value.split(':')[0]);
                    queries.push(`INSERT INTO notification VALUES (DEFAULT, ?, CONCAT( ? , ' a modifié son offre'), false, NOW());`)
                    parameters.push([id_candidate, author])
                }   
            })
            passengers.map((value) => {
                if (value) { 
                    let id_passenger = parseInt(value.split(':')[0]);
                    queries.push(`INSERT INTO notification VALUES (DEFAULT, ?, CONCAT( ? , ' a modifié son offre'), false, NOW());`)
                    parameters.push([id_passenger, author])
                }   
            })

            return [queries, parameters]  
       
        case ('modify_request'):
            [queries, parameters] = [[],[]];
            [param1, candidates, conductor, author] = data.parameters;
            queries.push(`
                            UPDATE 
                                request 
                            SET 
                                departure = ?,
                                arrival = ?,
                                date = ?,
                                price =  ?,
                                comment = ?
                            WHERE id = ? AND author = ? and ? = (SELECT a.password FROM account AS a WHERE a.id = ?);`);
            parameters.push(param1);

            candidates.map((value) => {
                if (value) { 
                    let id_candidate = parseInt(value.split(':')[0]);
                    queries.push(`INSERT INTO notification VALUES (DEFAULT, ?, CONCAT( ? , ' a modifié sa requête'), false, NOW());`)
                    parameters.push([id_candidate, author])
                }   
            })
            if (conductor) { 
                let id_conductor = parseInt(conductor.split(':')[0]);
                queries.push(`INSERT INTO notification VALUES (DEFAULT, ?, CONCAT( ? , ' a modifié sa requête'), false, NOW());`)
                parameters.push([id_conductor, author])
            }   
            

            return [queries, parameters]   

        case ('get_notifications'):
            return[[`
                SELECT 
                    n.id,
                    n.message,
                    n.seen,
                    n.date
                FROM 
                    notification AS n
                WHERE id_account = ?
                ORDER BY n.date DESC;
            `]
                , [[data.id]]]

        case ('delete_application_offer'):
            return [
                ['DELETE FROM apply_offer WHERE candidate = ? AND id_offer = ? AND author = (SELECT a.id FROM account AS a WHERE a.user = ?)',
                `INSERT INTO notification VALUES (DEFAULT, (SELECT a.id FROM account AS a WHERE a.user = ?), CONCAT( ?, ' a annulé sa candidature à une de vos offres'), false, NOW());`],
                data.parameters]

        case ('delete_application_request'):
            return [
                ['DELETE FROM apply_request WHERE candidate = ? AND id_offer = ? AND author = (SELECT a.id FROM account AS a WHERE a.user = ?)',
                `INSERT INTO notification VALUES (DEFAULT, (SELECT a.id FROM account AS a WHERE a.user = ?), CONCAT( ?, ' a annulé sa candidature à une de vos requêtes'), false, NOW());`],
                data.parameters]

        case ('delete_offer'):
            [queries, parameters] = [[],[]];
            [id_author, author, id_offer, candidates, passengers] = data.parameters;

            candidates.map((value) => {
                if (value) { 
                    let id_candidate = parseInt(value.split(':')[0]);
                    queries.push(`INSERT INTO notification VALUES (DEFAULT, ?, CONCAT( ? , ' a annulé son offre'), false, NOW());`)
                    parameters.push([id_candidate, author])
                    queries.push(`DELETE FROM apply_offer WHERE candidate = ? AND id_offer = ? and author = ?`)
                    parameters.push([id_candidate, id_offer, id_author])
                }   
            })
            passengers.map((value) => {
                if (value) { 
                    let id_passenger = parseInt(value.split(':')[0]);
                    queries.push(`INSERT INTO notification VALUES (DEFAULT, ?, CONCAT( ? , ' a annulé son offre'), false, NOW());`)
                    parameters.push([id_passenger, author])
                    queries.push(`DELETE FROM offer_client WHERE client = ? AND id_offer = ?`)
                    parameters.push([id_passenger, id_offer])
                }   
            })
            queries.push(`DELETE FROM offer WHERE id = ?`)
            parameters.push([id_offer]);

            return [queries, parameters]

        case ('delete_request'):
            [queries, parameters] = [[],[]];
            [id_author, author, id_request, candidates, conductor] = data.parameters;

            candidates.map((value) => {
                if (value) { 
                    let id_candidate = parseInt(value.split(':')[0]);
                    queries.push(`INSERT INTO notification VALUES (DEFAULT, ?, CONCAT( ? , ' a annulé sa requête'), false, NOW());`)
                    parameters.push([id_candidate, author])
                    queries.push(`DELETE FROM apply_request WHERE candidate = ? AND id_request = ? and author = ?`)
                    parameters.push([id_candidate, id_request, id_author])
                }   
            })
            if (conductor) { 
                let id_conductor = parseInt(conductor.split(':')[0]);
                queries.push(`INSERT INTO notification VALUES (DEFAULT, ?, CONCAT( ? , ' a annulé sa requête'), false, NOW());`)
                parameters.push([id_conductor, author])
            }   
            queries.push(`DELETE FROM request WHERE id = ?`)
            parameters.push([id_request]);

            return [queries, parameters]


        default :
            return [[''], [[]]];
    }
}

const queryAsPromise = (sql, params) => {
    console.log(sql, params)
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results);
            }
        })
    });
};


const server = http.createServer((req,res) => {
    console.log(req.method, req.url, req.headers);  
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        let data = JSON.parse(body);
        let [sql_commands, queries_parameters] = interpret(data);
        if (sql_commands == ['']) {
            res.end('No SQL request');
            return;
        }
        console.log(data.command, data.parameters);

        final = []
        Promise.all(sql_commands.map((sql, index) => queryAsPromise(sql, queries_parameters[index])))
            .then(results => {
                console.log('All queries completed successfully');
                console.log(results)
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(results)); // Tous les résultats des requêtes
            })
            .catch(err => {
                console.error('Error executing SQL queries:', err);
            });
    })
}
)

server.listen(port, function(error) {
    if (error) {
        console.log('ERREUR')
    } else {
        console.log('Ecoute sur port ' + port)
    }
})
