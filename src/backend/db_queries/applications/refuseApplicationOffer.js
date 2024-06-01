/**
 * Fonction qui renvoie les commandes SQL et les parametres adéquats pour 
 * que l'auteur d'une offre puisse refuser une candidature à son offre
 * @param {*} data - Données envoyées par l'application
 * @returns [listQueries, listParams] -  
 *      - listQueries est une liste de String qui sont les commandes SQL à exécuter par la base de données
 *      - listParams est une liste de liste où chaque sous liste d'indice i est l'ensemble des paramètres nécessaire
 *        à la bonne exécution de la commande SQL d'indice i de listQueries
 */
function refuseApplicationOffer(data) {
    return [
        [
            'DELETE FROM apply_offer WHERE candidate = ? AND id_offer = ? AND author = ?;',
            'UPDATE offer SET nb_seat = nb_seat + 1 WHERE id = ?;',
            `INSERT INTO notification VALUES (DEFAULT, ?, CONCAT( ?, ' a refusé votre candidature à son offre'), false, NOW());`
        ], 
        data.parameters
    ]
}

exports.refuseApplicationOffer = refuseApplicationOffer;