/**
 * Fonction qui renvoie les commandes SQL et les parametres adéquats pour 
 * obtenir les notifiactions d'un compte
 * @param {*} data - Données envoyées par l'application
 * @returns [listQueries, listParams] -  
 *      - listQueries est une liste de String qui sont les commandes SQL à exécuter par la base de données
 *      - listParams est une liste de liste où chaque sous liste d'indice i est l'ensemble des paramètres nécessaire
 *        à la bonne exécution de la commande SQL d'indice i de listQueries
 */
function getNotifications(data) {
    return [
        [`
            SELECT 
                n.id,
                n.message,
                n.seen,
                n.date
            FROM 
                notification AS n
            WHERE id_account = ?
            ORDER BY n.date DESC;
        `], 
        [
            [data.id]
        ]
    ]
} 

exports.getNotifications = getNotifications;