/**
 * Fonction qui renvoie les commandes SQL et les parametres adéquats pour 
 * la connexion à un compte
 * @param {*} data - Données envoyées par l'application
 * @returns [listQueries, listParams] -  
 *      - listQueries est une liste de String qui sont les commandes SQL à exécuter par la base de données
 *      - listParams est une liste de liste où chaque sous liste d'indice i est l'ensemble des paramètres nécessaire
 *        à la bonne exécution de la commande SQL d'indice i de listQueries
 */
function signIn(data) {
    return [[`
    SELECT
        (CASE
            WHEN EXISTS (SELECT * FROM account WHERE user = ? AND password = ?)
                THEN 'TRUE'
            ELSE
                'FALSE'
        END) AS answer,
        id
    FROM account
    WHERE
        user = ?
        AND password = ?;
    `,`SELECT phone_number, email FROM account WHERE user = ? AND password = ?;`],
    [[data.parameters[0], data.parameters[1],data.parameters[0], data.parameters[1]], [data.parameters[0], data.parameters[1]]]]
}

exports.signIn = signIn;