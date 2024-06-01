/**
 * Fonction qui renvoie les commandes SQL et les parametres adéquats pour 
 * supprimer une candidature à une offre qui est en attente de confirmation
 * @param {*} data - Données envoyées par l'application
 * @returns [listQueries, listParams] -  
 *      - listQueries est une liste de String qui sont les commandes SQL à exécuter par la base de données
 *      - listParams est une liste de liste où chaque sous liste d'indice i est l'ensemble des paramètres nécessaire
 *        à la bonne exécution de la commande SQL d'indice i de listQueries
 */
function deletePendingApplicationOffer(data) {
    return [
        [
            'DELETE FROM apply_offer WHERE candidate = ? AND id_offer = ? AND author = (SELECT a.id FROM account AS a WHERE a.user = ?)',
            `INSERT INTO notification VALUES (DEFAULT, (SELECT a.id FROM account AS a WHERE a.user = ?), CONCAT( ?, ' a annulé sa candidature à une de vos offres'), false, NOW());`
        ],
        data.parameters
    ]
}

exports.deletePendingApplicationOffer = deletePendingApplicationOffer;