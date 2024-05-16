const { connection } = require('./../config/connection');

/**
 * Gère les requêtes entrantes pour le chemin '/query'. Cette fonction lit le corps de la requête,
 * détermine le type d'action requise, exécute une requête SQL correspondante et renvoie le résultat.
 * 
 * @param {http.IncomingMessage} req - L'objet de requête provenant du serveur HTTP.
 * @param {http.ServerResponse} res - L'objet de réponse à envoyer au client.
 */
exports.handleRequest = (req, res) => {

    if (req.method === 'POST') {

        let body = '';

        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });

        req.on('end', () => {

            try {

                const data = JSON.parse(body);
                processQuery(data, res);

            } catch (e) {

                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));

            }

        });

    } else {

        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method not allowed' }));

    }
};


/**
 * Exécute la requête SQL basée sur l'objet de données fourni et envoie une réponse au client.
 * 
 * @param {Object} data - L'objet contenant les données de la requête client.
 * @param {http.ServerResponse} res - L'objet de réponse à envoyer au client.
 */
function processQuery(data, res) {

    const query = "SELECT * FROM some_table WHERE id = ?"; // Exemple de requête SQL
    const values = [data.id]; // Les valeurs pour la requête préparée

    connection.query(query, values, (error, results) => {
    
        if (error) {
    
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Database error' }));
    
        } else {
    
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
    
        }
    
    });
}