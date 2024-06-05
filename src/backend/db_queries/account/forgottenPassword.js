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
        text: `
            Réinitialisation de votre mot de passe


            Bonjour,
            
            Nous avons reçu une demande réinitilisation de votre mot de passe.
            
            Votre nouveau mot de passe est ` + new_password + `.
            
            N'oubliez pas de le modifier dans votre écran Compte.
            
            
            Cordialement,
            
            L'équipe d'Atlanticar
            
            
            Ne répondez pas à cette adresse mail
        `,
        html: `
            <h1>Réinitialisation de votre mot de passe</h1>
            
            <div style="padding-top:10px">
                <h3>Bonjour, </h3>
                <p>Nous avons reçu une demande réinitilisation de votre mot de passe.</p>
                <p>Votre nouveau mot de passe est <b> `+ new_password +`</b>.</p>
                <p>N'oubliez pas de le modifier dans votre écran <b>Compte</b>.</p>
            </div>
            <div style="padding-top:10px">
                <p>Cordialement,</p>
                <p>L'équipe d'Atlanticar</p>
            </div>
            <img src ="../../assets.logo.jpg">
            <p><i>Ne répondez pas à cette adresse mail</i></p>
        `,
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