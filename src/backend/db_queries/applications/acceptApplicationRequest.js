/**
 * Fonction qui renvoie les commandes SQL et les parametres adéquats pour 
 * que l'auteur d'une offre puisse accepter une candidature à sa requête
 * @param {*} data - Données envoyées par l'application
 * @returns [listQueries, listParams] -  
 *      - listQueries est une liste de String qui sont les commandes SQL à exécuter par la base de données
 *      - listParams est une liste de liste où chaque sous liste d'indice i est l'ensemble des paramètres nécessaire
 *        à la bonne exécution de la commande SQL d'indice i de listQueries
 */
function acceptApplicationRequest(data) {
    return  [
        [
            'DELETE FROM apply_request WHERE candidate = ? AND id_request = ? AND author = ?;',
            'UPDATE request SET conductor = ? WHERE id = ?;',
            `INSERT INTO notification VALUES (DEFAULT, ?, CONCAT( ?, ' a accepté votre candidature à sa requête'), false, NOW());`
        ], 
        data.parameters
    ]
}

exports.acceptApplicationRequest = acceptApplicationRequest;