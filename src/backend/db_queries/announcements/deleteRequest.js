/**
 * Fonction qui renvoie les commandes SQL et les parametres adéquats pour 
 * supprimer une requête créée par un compte particulier
 * @param {*} data - Données envoyées par l'application
 * @returns [listQueries, listParams] -  
 *      - listQueries est une liste de String qui sont les commandes SQL à exécuter par la base de données
 *      - listParams est une liste de liste où chaque sous liste d'indice i est l'ensemble des paramètres nécessaire
 *        à la bonne exécution de la commande SQL d'indice i de listQueries
 */
function deleteRequest(data) {
    // Initializing variables
    var [queries, parameters] = [[],[]];
    const [id_author, author, id_request, candidates, conductor] = data.parameters;

    // Removes all applications and sends a notification to each candidate
    if (candidates) {
        candidates.map((value) => {
            if (value) { 
                let id_candidate = parseInt(value.split(':')[0]);
                queries.push(`INSERT INTO notification VALUES (DEFAULT, ?, CONCAT( ? , ' a annulé sa requête'), false, NOW());`)
                parameters.push([id_candidate, author])
                queries.push(`DELETE FROM apply_request WHERE candidate = ? AND id_request = ? and author = ?`)
                parameters.push([id_candidate, id_request, id_author])
            }   
        })
    }
    // Sends a notification to the appointed conductor
    if (conductor) { 
        let id_conductor = parseInt(conductor.split(':')[0]);
        queries.push(`INSERT INTO notification VALUES (DEFAULT, ?, CONCAT( ? , ' a annulé sa requête'), false, NOW());`)
        parameters.push([id_conductor, author])
    }   

    // Finally, removes request from database
    queries.push(`DELETE FROM request WHERE id = ?`)
    parameters.push([id_request]);

    return [queries, parameters]


}

exports.deleteRequest = deleteRequest;