const http = require('http');
const port = 3000;
require("dotenv").config();
const {interpreter} = require("./db_queries/mainInterpreter.js")
const {connexion, queryAsPromise} = require("./config/dbConSetup.js")

const server = http.createServer((req,res) => {
    console.log(req.method, req.url, req.headers);  
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        let data = JSON.parse(body);
        let getQueries = interpreter[data.command]
        console.log(interpreter)
        let [sql_commands, queries_parameters] = getQueries(data);
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