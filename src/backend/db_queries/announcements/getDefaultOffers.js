/**
 * Fonction qui renvoie les commandes SQL et les parametres adéquats pour 
 * obtenir les offres affichables pour un compte particulier
 * @param {*} data - Données envoyées par l'application
 * @returns [listQueries, listParams] -  
 *      - listQueries est une liste de String qui sont les commandes SQL à exécuter par la base de données
 *      - listParams est une liste de liste où chaque sous liste d'indice i est l'ensemble des paramètres nécessaire
 *        à la bonne exécution de la commande SQL d'indice i de listQueries
 */
function getDefaultOffers(data) {
    return [
        [`
            SELECT
                o.id,
                o.departure,
                o.arrival, o.date,
                o.price,
                o.nb_seat,
                o.comment,
                a.user as user,
                o.author AS author
            FROM offer AS o
            JOIN  account AS a ON a.id = o.author
            WHERE
                o.nb_seat > 0
                AND author != ?
                AND TIMESTAMPDIFF(MINUTE, NOW(), o.date) > 0
                AND ? NOT IN
                (
                SELECT candidate AS user FROM apply_offer
                WHERE id_offer = o.id
                UNION
                SELECT client AS user FROM offer_client
                WHERE id_offer = o.id
                )
            ORDER BY o.date
            LIMIT 20 OFFSET ?;
            `
        ],
        [
            [data.id, data.id, 20*data.parameters[4]]
        ]
    ]
}

exports.getDefaultOffers = getDefaultOffers;