/**
 * Fonction qui renvoie les commandes SQL et les parametres adéquats pour 
 * qu'un utilisateur puisse candidater à une requête.
 * @param {*} data - Données envoyées par l'application
 * @returns [listQueries, listParams] -  
 *      - listQueries est une liste de String qui sont les commandes SQL à exécuter par la base de données
 *      - listParams est une liste de liste où chaque sous liste d'indice i est l'ensemble des paramètres nécessaire
 *        à la bonne exécution de la commande SQL d'indice i de listQueries
 */
function applyToRequest(data) {
    return [
        [
            'INSERT IGNORE INTO  apply_request (candidate, id_request, author, date) VALUES (?, ?, ?, NOW());',
            `INSERT INTO notification VALUES (DEFAULT, ?, CONCAT( ?, ' a candidaté à une de vos requêtes'), false, NOW());`
        ], 
        data.parameters
    ]
}

exports.applyToRequest = applyToRequest;