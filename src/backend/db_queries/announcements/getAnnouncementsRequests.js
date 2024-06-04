/**
 * Fonction qui renvoie les commandes SQL et les parametres adéquats pour 
 * obtenir les requêtes créées par un compte particulier
 * @param {*} data - Données envoyées par l'application
 * @returns [listQueries, listParams] -  
 *      - listQueries est une liste de String qui sont les commandes SQL à exécuter par la base de données
 *      - listParams est une liste de liste où chaque sous liste d'indice i est l'ensemble des paramètres nécessaire
 *        à la bonne exécution de la commande SQL d'indice i de listQueries
 */
function getAnnouncementsRequests(data) {
    return [
        [`
            SELECT
                r.id,
                r.departure,
                r.arrival,
                r.date,
                r.price,
                r.comment,
                CONCAT(r.conductor, ':', acc.user, ':', acc.phone_number) AS conductor,
                (
                    SELECT
                        GROUP_CONCAT(CONCAT(ar.candidate, ':', a.user, ':', a.phone_number) SEPARATOR ', ')
                    FROM apply_request AS ar
                    JOIN account AS a ON ar.candidate = a.id
                    WHERE
                        ar.id_request = r.id
                ) AS candidates
            FROM request AS r
            LEFT JOIN account AS acc ON r.conductor = acc.id 
            WHERE r.author = ?
            LIMIT 5 OFFSET ?;
        `],
        [
            [data.id, data.parameters[0]]
        ]
    ]
}

exports.getAnnouncementsRequests = getAnnouncementsRequests;