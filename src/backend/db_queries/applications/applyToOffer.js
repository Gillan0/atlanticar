/**
 * Fonction qui renvoie les commandes SQL et les parametres adéquats pour 
 * qu'un utilisateur puisse candidater à une offre.
 * @param {*} data - Données envoyées par l'application
 * @returns [listQueries, listParams] -  
 *      - listQueries est une liste de String qui sont les commandes SQL à exécuter par la base de données
 *      - listParams est une liste de liste où chaque sous liste d'indice i est l'ensemble des paramètres nécessaire
 *        à la bonne exécution de la commande SQL d'indice i de listQueries
 */
function applyToOffer(data) {
    return [
        [
            'INSERT IGNORE INTO apply_offer (candidate, id_offer, author, date) VALUES (?, ?, ?, NOW());',
            `INSERT INTO notification VALUES (DEFAULT, ?, CONCAT( ?, ' a candidaté à une de vos offres'), false, NOW());`
        ], 
        data.parameters
    ]
}

exports.applyToOffer = applyToOffer