const http = require('http');
const port = 3000;
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306, // Port de la base de données MySQL
    user: 'root',
    password: 'Ps1d4f9x28Clq5TbN6X810z',
    database: 'atlanticar'
})

connection.connect((err) => {
    if (err) {
      console.error('Erreur de connexion à la base de données :', err);
      return;
    }
    console.log('Connecté à la base de données MySQL');
})

function interpret(data) {
    switch (data.command) {
        case ("get_default_offers") :
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
            `],
            [[data.id, data.id]]]
       
        case ("get_default_requests") :
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
                `],
                [[data.id]]]
       
        case ("get_filter_requests") :
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
                `],
                    [[data.id]]]
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
                `],
                [[`%${data.parameters[0]}%`, `%${data.parameters[1]}%`, data.parameters[2], data.parameters[3], data.id]]]

        case ("get_filter_offers") :
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
                `],
                    [[data.id, data.id]]]
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
                `],
                [[`%${data.parameters[0]}%`, `%${data.parameters[1]}%`, data.parameters[2], data.parameters[3], data.id, data.id]]]
       
        case ("signIn"):
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
                `],
                [[data.parameters[0], data.parameters[1],data.parameters[0], data.parameters[1]]]]
       
        case ("signUp"):
            return [[`
                INSERT INTO account (user, password, phone_number)
                SELECT ?, ?, ? FROM DUAL
                WHERE NOT EXISTS (
                    SELECT * FROM account
                    WHERE user = ? OR phone_number = ?
                );
            `],
            [
                [data.parameters[0], data.parameters[1], data.parameters[2], data.parameters[0], data.parameters[2]]
            ]];

        case ("get_announcements_requests") :
            return [[`
                SELECT
                    r.id,
                    r.departure,
                    r.arrival,
                    r.date,
                    r.price,
                    r.comment,
                    CONCAT(r.conductor, ':', acc.user) AS conductor,
                    (
                        SELECT
                            GROUP_CONCAT(CONCAT(ar.candidate, ':', a.user) SEPARATOR ', ')
                        FROM apply_request AS ar
                        JOIN account AS a ON ar.candidate = a.id
                        WHERE
                            ar.id_request = r.id
                    ) AS candidates
                FROM request AS r
                JOIN account AS acc ON r.conductor = acc.id
                WHERE r.author = ?;
                `],
                [[data.id]]]

        case ("get_announcements_offers") :
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
                        GROUP_CONCAT(CONCAT(ao.candidate, ':', a.user) SEPARATOR ', ')
                    FROM apply_offer AS ao
                    JOIN account AS a ON ao.candidate = a.id
                    WHERE
                        ao.id_offer = o.id
                ) AS candidates,
                (
                    SELECT
                        GROUP_CONCAT(CONCAT(oc.client, ':', a.user) SEPARATOR ', ')
                    FROM offer_client AS oc
                    JOIN account AS a ON oc.client = a.id
                    WHERE
                        oc.id_offer = o.id
                ) AS passengers
                FROM offer AS o
                WHERE o.author = ?
                `],
                [[data.id]]]
       
        case ("get_applications_offers") :
            return [["SELECT o.id, o.departure, o.arrival, o.date, o.price, o.nb_seat, o.comment, a.user AS author, 'False' AS state FROM offer AS o JOIN apply_offer AS ao ON ao.id_offer = o.id JOIN account AS a ON a.id = o.author WHERE ao.candidate = ? UNION SELECT o.id, o.departure, o.arrival, o.date, o.price, o.nb_seat, o.comment, a.user AS author, 'True' AS state FROM offer AS o JOIN offer_client AS oc ON oc.id_offer = o.id JOIN account AS a ON a.id = o.author WHERE oc.client = ?;"],
                [[data.id,data.id]]]
       
        case ("get_applications_requests") :
            return [["SELECT r.id, r.departure, r.arrival, r.date, r.price, r.comment, a.user AS author, 'False' AS state FROM request AS r JOIN apply_request AS ar ON ar.id_request = r.id JOIN account AS a ON a.id = r.author WHERE ar.candidate = ? UNION SELECT r.id, r.departure, r.arrival, r.date, r.price, r.comment, a.user AS author, 'True' AS state FROM request AS r JOIN account AS a ON a.id = r.author WHERE r.conductor = ?;"],
                [[data.id,data.id]]]
               
        case ("apply_to_offer"):
            return [["INSERT IGNORE INTO apply_offer (candidate, id_offer, author, date) VALUES (?, ?, ?, NOW());"]
            , [data.parameters]]

        case ("apply_to_request"):
            return [["INSERT IGNORE INTO  apply_request (candidate, id_request, author, date) VALUES (?, ?, ?, NOW());"]
            , [data.parameters]]  

        case ("accept_application_offer"):
            return [
                ["INSERT INTO offer_client (client, id_offer) VALUES (?, ?);",
                "DELETE FROM apply_offer WHERE candidate = ? AND id_offer = ? AND author = ?;",
                "UPDATE offer SET nb_seat = nb_seat - 1 WHERE id = ?;"]
               , data.parameters]

        case ("accept_application_request"):
            return  [
                ["DELETE FROM apply_request WHERE candidate = ? AND id_request = ? AND author = ?;",
                "UPDATE request SET conductor = ? WHERE id = ?;"]
               , data.parameters]

        case ("upload_offer"):
            return [["INSERT IGNORE INTO offer VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?);"]
                , [data.parameters]]  
       
        case ("upload_request"):
            return [["INSERT IGNORE INTO request VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, NULL);"]
                , [data.parameters]]  

        default :
            return [[""], [[]]];
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
        if (sql_commands == [""]) {
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
        console.log("ERREUR")
    } else {
        console.log("Ecoute sur port " + port)
    }
})
