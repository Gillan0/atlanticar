/**
 * Fonction qui renvoie les commandes SQL et les parametres adéquats pour 
 * obtenir les candidatures aux offres d'un utilisateur
 * @param {*} data - Données envoyées par l'application
 * @returns [listQueries, listParams] -  
 *      - listQueries est une liste de String qui sont les commandes SQL à exécuter par la base de données
 *      - listParams est une liste de liste où chaque sous liste d'indice i est l'ensemble des paramètres nécessaire
 *        à la bonne exécution de la commande SQL d'indice i de listQueries
 */
function getApplicationsOffers(data) {
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
                    a.user AS author, 
                    'False' AS state ,
                    null AS phone
                FROM offer AS o 
                JOIN apply_offer AS ao ON ao.id_offer = o.id 
                JOIN account AS a ON a.id = o.author 
                WHERE 
                    ao.candidate = ? 
                UNION 
                SELECT 
                    o.id, 
                    o.departure, 
                    o.arrival, 
                    o.date, 
                    o.price, 
                    o.nb_seat, 
                    o.comment, 
                    a.user AS author, 
                    'True' AS state ,
                    a.phone_number AS phone
                FROM offer AS o 
                JOIN offer_client AS oc ON oc.id_offer = o.id 
                JOIN account AS a ON a.id = o.author 
                WHERE 
                    oc.client = ?;`
        ],
        [
            [data.id,data.id]
        ]
    ]
}

exports.getApplicationsOffers = getApplicationsOffers;