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

function getSQLcommand(data) {
    switch (data.command, data.type) {
        case ("get", "default_offers") :
            return 'SELECT o.id, o.departure, o.arrival, o.date, o.price, o.nb_seat, o.comment, a.user AS author FROM offer AS o JOIN account AS a ON a.id = o.author WHERE o.nb_seat > 0 ORDER BY o.date'
       
        case ("get", "default_requests") : 
            return 'SELECT r.id, r.departure, r.arrival, r.date, r.price, r.comment, a.user as author FROM request as r JOIN account as a ON a.id = r.author ORDER BY r.date'
        
        case ("get", "filter_requests") : 
            if (data.parameters == ['','','','9999']) {
                return 'SELECT r.id, r.departure, r.arrival, r.date, r.price, r.comment, a.user as author FROM request as r JOIN account as a ON a.id = r.author ORDER BY r.date'
            }            
            return "SELECT r.id, r.departure, r.arrival, r.date, r.price, r.comment, a.user AS author, IF(r.conductor IS NOT NULL, c.user, NULL) AS conductor FROM request AS r JOIN account AS a ON a.id = r.author LEFT JOIN account AS c ON c.id = r.conductor WHERE r.departure LIKE ? AND r.arrival LIKE ? AND r.date LIKE ? AND r.price <= ? ORDER BY r.date";

        case ("get", "filter_offers") : 
            if (data.parameters == ['','','','9999']) {
                return 'SELECT o.id, o.departure, o.arrival, o.date, o.price, o.nb_seat, o.comment, a.user AS author FROM offer AS o JOIN account AS a ON a.id = o.author WHERE o.nb_seat > 0 ORDER BY o.date'
            }            
            return "SELECT o.id, o.departure, o.arrival, o.date, o.price, o.nb_seat, o.comment, a.user AS author FROM offer AS o JOIN account AS a ON a.id = o.author WHERE o.nb_seat > 0 AND o.departure LIKE ? AND o.arrival LIKE ? AND o.date LIKE ? AND o.price <= ? ORDER BY o.date";
        
        case ("signIn", null):
            return "SELECT CASE WHEN EXISTS (SELECT * FROM account WHERE user = ? AND password = ?) THEN 'TRUE' ELSE 'FALSE' END AS answer"

        default : 
            return '';
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
        let sql_command = getSQLcommand(data);
        if (sql_command == '') {
            res.end('No SQL request');
            return;
        }
        console.log(data.command, data.type, data.parameters);
        if (data.command == "signIn") {
            // Exécuter une requête SQL pour récupérer un élément de la base de données
            connection.query(sql_command, [data.parameters[0], data.parameters[1]], (err, results) => {
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête SQL :', err);
                    res.statusCode = 500;
                    res.end('Erreur de serveur');
                    return;
                }
                console.log(results, )
                // Renvoyer le résultat de la requête au client HTTP
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(results));
            });
        }
        else {
            // Exécuter une requête SQL pour récupérer un élément de la base de données
            connection.query(sql_command, [`%${data.parameters[0]}%`, `%${data.parameters[1]}%`, `%${data.parameters[2]}%`, data.parameters[3]], (err, results) => {
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
        }
        
    })
})

server.listen(port, function(error) {
    if (error) {
        console.log("ERREUR")
    } else {
        console.log("Ecoute sur port " + port)
    }
})