/**
 * Fonction qui renvoie les commandes SQL et les parametres adéquats pour 
 * la modification du mot de passe d'un compte
 * @param {*} data - Données envoyées par l'application
 * @returns [listQueries, listParams] -  
 *      - listQueries est une liste de String qui sont les commandes SQL à exécuter par la base de données
 *      - listParams est une liste de liste où chaque sous liste d'indice i est l'ensemble des paramètres nécessaire
 *        à la bonne exécution de la commande SQL d'indice i de listQueries
 */
function modifyPassword(data) {
    return [
        [
            `UPDATE account 
            SET password = ? 
            WHERE id = ? AND password = ? ;`
        ],
        [   
            [data.parameters[0], data.id, data.password]
        ]
    ]
}

exports.modifyPassword = modifyPassword;