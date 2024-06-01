/**
 * Fonction qui renvoie les commandes SQL et les parametres adéquats pour 
 * publie une offre créée par un compte particulier
 * @param {*} data - Données envoyées par l'application
 * @returns [listQueries, listParams] -  
 *      - listQueries est une liste de String qui sont les commandes SQL à exécuter par la base de données
 *      - listParams est une liste de liste où chaque sous liste d'indice i est l'ensemble des paramètres nécessaire
 *        à la bonne exécution de la commande SQL d'indice i de listQueries
 */
function uploadOffer(data) {
    return [
        [
            'INSERT IGNORE INTO offer VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?);'
        ], 
        [data.parameters]
    ]  
}

exports.uploadOffer = uploadOffer