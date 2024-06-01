const {transporter, sendMail} = require("../../config/mailSetup.js");

/**
 * Fonction qui renvoie les commandes SQL et les parametres adéquats pour 
 * gérer modifier un mot de passe dans la procédure d'un cas 'mot de passe oublié'
 * @param {*} data - Données envoyées par l'application
 * @returns [listQueries, listParams] -  
 *      - listQueries est une liste de String qui sont les commandes SQL à exécuter par la base de données
 *      - listParams est une liste de liste où chaque sous liste d'indice i est l'ensemble des paramètres nécessaire
 *        à la bonne exécution de la commande SQL d'indice i de listQueries
 */
function forgottenPassword(data) {
    // Generate new password
    const new_password = Math.random().toString(36).substr(2, 12);

    // Setup email to send
    const mailOptions = {
        from: {
                name: "AtlantiCar Services", 
                address: "atlanticarservices@gmail.com"
        },
        to: [data.parameters[1]],
        subject: "Mot de passe oublié",
        text: "Voici votre nouveau mot de passe: " + new_password,
        html: "<b>Voici votre nouveau mot de passe: " + new_password + "</b>",
    }

    // Sends email
    sendMail(transporter, mailOptions);
    
    return [
        [`
            UPDATE account
            SET password = ?
            WHERE user = ? AND email = ?;
        `],
        [
            [new_password, data.parameters[0], data.parameters[1]]
        ]
    ];
}

exports.forgottenPassword = forgottenPassword;