/**
 * Fonction qui renvoie les commandes SQL et les parametres adéquats pour 
 * obtenir les offres créées par un compte particulier
 * @param {*} data - Données envoyées par l'application
 * @returns [listQueries, listParams] -  
 *      - listQueries est une liste de String qui sont les commandes SQL à exécuter par la base de données
 *      - listParams est une liste de liste où chaque sous liste d'indice i est l'ensemble des paramètres nécessaire
 *        à la bonne exécution de la commande SQL d'indice i de listQueries
 */
function getAnnouncementsOffers(data) {
    return [
        [`
            SELECT
            o.id,
            o.departure,
            o.arrival,
            o.date,
            o.price,
            o.nb_seat,
            o.comment,
            (
                SELECT
                    GROUP_CONCAT(CONCAT(ao.candidate, ':', a.user, ':', a.phone_number) SEPARATOR ', ')
                FROM apply_offer AS ao
                JOIN account AS a ON ao.candidate = a.id
                WHERE
                    ao.id_offer = o.id
            ) AS candidates,
            (
                SELECT
                    GROUP_CONCAT(CONCAT(oc.client, ':', a.user, ':', a.phone_number) SEPARATOR ', ')
                FROM offer_client AS oc
                JOIN account AS a ON oc.client = a.id
                WHERE
                    oc.id_offer = o.id
            ) AS passengers
            FROM offer AS o
            WHERE o.author = ?
        `],
        [
            [data.id]
        ]
    ]
}

exports.getAnnouncementsOffers = getAnnouncementsOffers;