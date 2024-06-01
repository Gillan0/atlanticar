/**
 * Fonction qui renvoie les commandes SQL et les parametres adéquats pour 
 * supprimer une candidature validée à une requête 
 * @param {*} data - Données envoyées par l'application
 * @returns [listQueries, listParams] -  
 *      - listQueries est une liste de String qui sont les commandes SQL à exécuter par la base de données
 *      - listParams est une liste de liste où chaque sous liste d'indice i est l'ensemble des paramètres nécessaire
 *        à la bonne exécution de la commande SQL d'indice i de listQueries
 */
function deleteConfirmedApplicationRequest(data) {
    return [
        [
            'UPDATE request SET conductor = NULL WHERE conductor = ? AND id = ?;',
            `INSERT INTO notification VALUES (DEFAULT, (SELECT a.id FROM account AS a WHERE a.user = ?), CONCAT( ?, ' a annulé sa candidature à une de vos requêtes'), false, NOW());`
        ],
            data.parameters
    ]
}

exports.deleteConfirmedApplicationRequest = deleteConfirmedApplicationRequest;