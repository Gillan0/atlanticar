const { getDefaultRequests } = require('./getDefaultRequests')

/**
 * Fonction qui renvoie les commandes SQL et les parametres adéquats pour 
 * obtenir les requêtes affichables et filtrées pour un compte particulier
 * @param {*} data - Données envoyées par l'application
 * @returns [listQueries, listParams] -  
 *      - listQueries est une liste de String qui sont les commandes SQL à exécuter par la base de données
 *      - listParams est une liste de liste où chaque sous liste d'indice i est l'ensemble des paramètres nécessaire
 *        à la bonne exécution de la commande SQL d'indice i de listQueries
 */
function getFilterRequests(data) {
    if (data.parameters == ['','','','9999']) {
        return getDefaultRequests(data);
    }
    return [
        [`
            SELECT
                r.id,
                r.departure,
                r.arrival,
                r.date,
                r.price,
                r.comment,
                a.user AS user,
                r.author,
                IF(r.conductor IS NOT NULL, c.user, NULL) AS conductor
            FROM request AS r
            JOIN account AS a ON a.id = r.author
            LEFT JOIN account AS c ON c.id = r.conductor
            WHERE
                r.departure LIKE ?
                AND r.arrival LIKE ?
                AND ABS(DATEDIFF(r.date, ?)) <= 7
                AND TIMESTAMPDIFF(MINUTE, NOW(), r.date) > 0
                AND r.price <= ?
                AND author != ?
                AND r.conductor IS NULL
            ORDER BY r.date
            LIMIT 20 OFFSET ?;
        `],
        [
            [`%${data.parameters[0]}%`, `%${data.parameters[1]}%`, data.parameters[2], data.parameters[3], data.id, 20*data.parameters[4]]
        ]
    ]
}

exports.getFilterRequests = getFilterRequests;