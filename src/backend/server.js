const http = require('http');
const port = 3000;
require("dotenv").config();
const {interpreter} = require("./db_queries/mainInterpreter.js")
const {connexion, queryAsPromise} = require("./config/dbConSetup.js")

/**
 * Creates the HTTP server that listens on the specified port (const).
 * @param {IncomingMessage} req - The incoming request object.
 * @param {ServerResponse} res - The outgoing response object.
 */
const server = http.createServer((req, res) => {
    
    console.log(req.method, req.url, req.headers);  

    let body = '';
    
    // Accumulate data chunks from the request body.
    req.on('data', (chunk) => {
        body += chunk;
    });

    // When request data has been fully received.
    req.on('end', () => {
        let data;
        try {
            data = JSON.parse(body);
        } catch (err) {
            res.statusCode = 400;
            res.end('Invalid JSON');
            return;
        }

        let getQueries = interpreter[data.command];
        console.log(interpreter);

        let [sql_commands, queries_parameters] = getQueries ? getQueries(data) : [[], []];

        // Handle case where there are no SQL commands.
        sql_commands.length === 0 ? res.end('No SQL request') : console.log(data.command, data.parameters);

        // Execute SQL commands as promises.
        Promise.all(sql_commands.map((sql, index) => queryAsPromise(sql, queries_parameters[index])))
            .then(results => {
                console.log('All queries completed successfully');
                console.log(results);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(results)); // Send all query results
            })
            .catch(err => {
                console.error('Error executing SQL queries:', err);
                res.statusCode = 500;
                res.end('Server Error');
            });
    });
});


/**
 * Start the server and listen on the specified port.
 * @param {number} port - The port on which the server listens.
 * @param {function} callback - The callback function to execute once the server starts listening.
 */
server.listen(port, function (error) {
    error ? console.log('Error starting server') : console.log('Listening on port ' + port);
});
