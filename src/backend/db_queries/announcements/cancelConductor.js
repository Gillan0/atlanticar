/**
 * Fonction qui renvoie les commandes SQL et les parametres adéquats pour 
 * supprimer un conducteur à une requête émise par un compte particulier
 * @param {*} data - Données envoyées par l'application
 * @returns [listQueries, listParams] -  
 *      - listQueries est une liste de String qui sont les commandes SQL à exécuter par la base de données
 *      - listParams est une liste de liste où chaque sous liste d'indice i est l'ensemble des paramètres nécessaire
 *        à la bonne exécution de la commande SQL d'indice i de listQueries
 */
function cancelConductor(data) {
    return  [
        [
            'UPDATE request SET conductor = NULL WHERE id = ?;',
            `INSERT INTO notification VALUES (DEFAULT, ?, CONCAT( ?, ' a annulé votre trajet en tant que conducteur'), false, NOW());`
        ], 
        data.parameters
    ]
}
exports.cancelConductor = cancelConductor;