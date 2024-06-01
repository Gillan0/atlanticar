/**
 * Fonction qui renvoie les commandes SQL et les parametres adéquats pour 
 * obtenir les candidatures aux offres d'un utilisateur
 * @param {*} data - Données envoyées par l'application
 * @returns [listQueries, listParams] -  
 *      - listQueries est une liste de String qui sont les commandes SQL à exécuter par la base de données
 *      - listParams est une liste de liste où chaque sous liste d'indice i est l'ensemble des paramètres nécessaire
 *        à la bonne exécution de la commande SQL d'indice i de listQueries
 */
function getApplicationsRequests(data) {
    return  [
        [`
            SELECT 
                r.id, 
                r.departure, 
                r.arrival, 
                r.date, 
                r.price, 
                r.comment, 
                a.user AS author, 
                'False' AS state ,
                null AS phone
            FROM request AS r 
            JOIN apply_request AS ar ON ar.id_request = r.id 
            JOIN account AS a ON a.id = r.author 
            WHERE 
                ar.candidate = ? 
            UNION 
            SELECT 
                r.id, 
                r.departure, 
                r.arrival, 
                r.date, 
                r.price, 
                r.comment, 
                a.user AS author, 
                'True' AS state ,
                a.phone_number AS phone
            FROM request AS r 
            JOIN account AS a ON a.id = r.author 
            WHERE 
                r.conductor = ?;`
        ],
        [
            [data.id,data.id]
        ]
    ]
}

exports.getApplicationsRequests = getApplicationsRequests;