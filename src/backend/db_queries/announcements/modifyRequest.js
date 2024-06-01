/**
 * Fonction qui renvoie les commandes SQL et les parametres adéquats pour 
 * modifie une requête créée par un compte particulier
 * @param {*} data - Données envoyées par l'application
 * @returns [listQueries, listParams] -  
 *      - listQueries est une liste de String qui sont les commandes SQL à exécuter par la base de données
 *      - listParams est une liste de liste où chaque sous liste d'indice i est l'ensemble des paramètres nécessaire
 *        à la bonne exécution de la commande SQL d'indice i de listQueries
 */
function modifyRequest(data) {
    // Initialize variables
    var [queries, parameters] = [[],[]];
    const [param1, candidates, conductor, author] = data.parameters;

    // Updates the request
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

    // Sends a notification to each candidate that the request was changed
    candidates.map((value) => {
        if (value) { 
            let id_candidate = parseInt(value.split(':')[0]);
            queries.push(`INSERT INTO notification VALUES (DEFAULT, ?, CONCAT( ? , ' a modifié sa requête'), false, NOW());`)
            parameters.push([id_candidate, author])
        }   
    })

    // Sends a notification to the appointed conductor that the request was changed
    if (conductor) { 
        let id_conductor = parseInt(conductor.split(':')[0]);
        queries.push(`INSERT INTO notification VALUES (DEFAULT, ?, CONCAT( ? , ' a modifié sa requête'), false, NOW());`)
        parameters.push([id_conductor, author])
    }   
    

    return [queries, parameters]
}

exports.modifyRequest = modifyRequest;