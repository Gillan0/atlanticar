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
            return 'SELECT r.id, r.departure, r.arrival, r.date, r.price, r.comment, a.user as author FROM request as r JOIN account as a ON a.id = r.author'
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
        console.log(data.command, data.type);
        // Exécuter une requête SQL pour récupérer un élément de la base de données
        connection.query(sql_command, (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête SQL :', err);
            res.statusCode = 500;
            res.end('Erreur de serveur');
            return;
        }

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