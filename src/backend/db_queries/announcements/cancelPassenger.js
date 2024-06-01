/**
 * Fonction qui renvoie les commandes SQL et les parametres adéquats pour 
 * supprimer un passager à une offre émise par un compte particulier
 * @param {*} data - Données envoyées par l'application
 * @returns [listQueries, listParams] -  
 *      - listQueries est une liste de String qui sont les commandes SQL à exécuter par la base de données
 *      - listParams est une liste de liste où chaque sous liste d'indice i est l'ensemble des paramètres nécessaire
 *        à la bonne exécution de la commande SQL d'indice i de listQueries
 */
function cancelPassenger(data) {
    return  [
        [
            'DELETE FROM offer_client WHERE id_offer = ? AND client = ?;',
            'UPDATE offer SET nb_seat = nb_seat + 1 WHERE id = ?;',
            `INSERT INTO notification VALUES (DEFAULT, ?, CONCAT( ?, ' a annulé votre trajet en tant que passager'), false, NOW());`
        ], 
        data.parameters
    ]
}
exports.cancelPassenger = cancelPassenger;