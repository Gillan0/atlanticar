const http = require('http');
const port = 3000;

// Ps1d4f9x28Clq5TbN6X810z
const mysql = require('mysql');

// Configuration de la connexion à la base de données MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306, // Port de la base de données MySQL
    user: 'root',
    password: 'Ps1d4f9x28Clq5TbN6X810z',
    database: 'atlanticar'
}
);

connection.connect((err) => {
    if (err) {
      console.error('Erreur de connexion à la base de données :', err);
      return;
    }
    console.log('Connecté à la base de données MySQL');
});

function interpret(data) {
    switch (data.command, data.type) {
        case ("get", "default_offers") :
            return ['SELECT o.id, o.departure, o.arrival, o.date, o.price, o.nb_seat, o.comment, a.user AS author FROM offer AS o JOIN account AS a ON a.id = o.author WHERE o.nb_seat > 0 AND author != (SELECT account.id FROM account WHERE account.user = ?) ORDER BY o.date',
                [data.username]]
       
        case ("get", "default_requests") : 
            return ['SELECT r.id, r.departure, r.arrival, r.date, r.price, r.comment, a.user as author FROM request as r JOIN account as a ON a.id = r.author WHERE author != (SELECT account.id FROM account WHERE account.user = ?) ORDER BY r.date',
                [data.username]]
        
        case ("get", "filter_requests") : 
            if (data.parameters == ['','','','9999']) {
                return ['SELECT r.id, r.departure, r.arrival, r.date, r.price, r.comment, a.user as author FROM request as r JOIN account as a ON a.id = r.author WHERE author != (SELECT account.id FROM account WHERE account.user = ?) ORDER BY r.date',
                    [data.username]]
            }            
            return ["SELECT r.id, r.departure, r.arrival, r.date, r.price, r.comment, a.user AS author, IF(r.conductor IS NOT NULL, c.user, NULL) AS conductor FROM request AS r JOIN account AS a ON a.id = r.author LEFT JOIN account AS c ON c.id = r.conductor WHERE r.departure LIKE ? AND r.arrival LIKE ? AND r.date LIKE ? AND r.price <= ? AND author != (SELECT account.id FROM account WHERE account.user = ?) ORDER BY r.date",
                [`%${data.parameters[0]}%`, `%${data.parameters[1]}%`, `%${data.parameters[2]}%`, data.parameters[3], data.username]]

        case ("get", "filter_offers") : 
            if (data.parameters == ['','','','9999']) {
                return ['SELECT o.id, o.departure, o.arrival, o.date, o.price, o.nb_seat, o.comment, a.user AS author FROM offer AS o JOIN account AS a ON a.id = o.author WHERE o.nb_seat > 0 AND author != (SELECT account.id FROM account WHERE account.user = ?) ORDER BY o.date',
                    [data.username]]
            }            
            return ["SELECT o.id, o.departure, o.arrival, o.date, o.price, o.nb_seat, o.comment, a.user AS author FROM offer AS o JOIN account AS a ON a.id = o.author WHERE o.nb_seat > 0 AND o.departure LIKE ? AND o.arrival LIKE ? AND o.date LIKE ? AND o.price <= ? AND author != (SELECT account.id FROM account WHERE account.user = ?) ORDER BY o.date",
                [`%${data.parameters[0]}%`, `%${data.parameters[1]}%`, `%${data.parameters[2]}%`, data.parameters[3], data.username]]
        
        case ("signIn", null):
            return ["SELECT CASE WHEN EXISTS (SELECT * FROM account WHERE user = ? AND password = ?) THEN 'TRUE' ELSE 'FALSE' END AS answer;",
                [data.parameters[0], data.parameters[1]]]

        case ("get","announcements") : 
            return ["SELECT 'REQUETE' AS type, a.user AS candidat, r.id, r.departure, r.arrival, r.date, ar.date AS date_de_candidature FROM apply_request AS ar JOIN request AS r ON r.id = ar.id_request JOIN account AS a ON a.id = ar.candidate WHERE ar.author = (SELECT account.id FROM account WHERE account.user = ?) GROUP BY ar.date, a.user, r.id, r.departure, r.arrival, r.date UNION SELECT 'OFFRE' AS type, a.user AS candidat, o.id, o.departure, o.arrival, o.date, ao.date AS date_de_candidature FROM apply_offer AS ao JOIN offer AS o ON o.id = ao.id_offer JOIN account AS a ON a.id = ao.candidate WHERE ao.author = (SELECT account.id FROM account WHERE account.user = ?) GROUP BY ao.date, a.user, o.id, o.departure, o.arrival, o.date;",
                [data.username, data.username]] 

        default : 
            return ['', []];
    }
}

const server = http.createServer( (req,res) => {
    console.log(req.method, req.url, req.headers);   
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        let data = JSON.parse(body);
        let [sql_command, query_parameters] = interpret(data);
        if (sql_command == '') {
            res.end('No SQL request');
            return;
        }
        console.log(data.command, data.type, data.parameters);
            // Exécuter une requête SQL pour récupérer un élément de la base de données
        connection.query(sql_command, query_parameters, (err, results) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête SQL :', err);
                res.statusCode = 500;
                res.end('Erreur de serveur');
                return;
            }
            console.log(results)
            // Renvoyer le résultat de la requête au client HTTP
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(results));
            });
    })
})

server.listen(port, function(error) {
    if (error) {
        console.log("ERREUR")
    } else {
        console.log("Ecoute sur port " + port)
    }
})