/**
 * Fonction qui renvoie les commandes SQL et les parametres adéquats pour 
 * obtenir les requêtes affichables pour un compte particulier
 * @param {*} data - Données envoyées par l'application
 * @returns [listQueries, listParams] -  
 *      - listQueries est une liste de String qui sont les commandes SQL à exécuter par la base de données
 *      - listParams est une liste de liste où chaque sous liste d'indice i est l'ensemble des paramètres nécessaire
 *        à la bonne exécution de la commande SQL d'indice i de listQueries
 */
function getDefaultRequests(data) {
    return [
        [`
            SELECT
                r.id,
                r.departure,
                r.arrival,
                r.date,
                r.price,                    
                r.comment,
                a.user as user,
                r.author
            FROM request as r
            JOIN account as a ON a.id = r.author
            WHERE
                author != ?
                AND DATEDIFF(r.date, NOW()) >= 0
                AND r.conductor IS NULL
            ORDER BY r.date
            LIMIT 20 OFFSET ?;
        `],
        [
            [data.id, 20*data.parameters[4]]
        ]
    ]
}

exports.getDefaultRequests = getDefaultRequests;