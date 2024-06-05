require('dotenv').config();
const {transporter, sendMail} = require("../../config/mailSetup.js");

/**
 * Fonction qui renvoie les commandes SQL et les parametres adéquats pour l'ajout 
 * d'un compte à la base de données
 * @param {*} data - Données envoyées par l'application
 * @returns [listQueries, listParams] -  
 *      - listQueries est une liste de String qui sont les commandes SQL à exécuter par la base de données
 *      - listParams est une liste de liste où chaque sous liste d'indice i est l'ensemble des paramètres nécessaire
 *        à la bonne exécution de la commande SQL d'indice i de listQueries
 */
function signUp(data) {

    const mailOptions = {
        from: {
                name: "AtlantiCar Services", 
                address: process.env.MAIL_USER
        },
        to: [data.parameters[3]],
        subject: "Création de votre compte AtlantiCar",
        text: `
            Bienvenue sur AtlantiCar !

            
            Bonjour,

            Nous vous annonçons que votre compte est bien crée.
            
            
            Cordialement,
            
            L'équipe d'Atlanticar
            
            
            Ne répondez pas à cette adresse mail
        `
        ,
        html: `
        <h1>Bienvenue sur AtlantiCar !</h1>
            
        <div style="padding-top:10px">
            <h3>Bonjour, </h3>
            <p>Nous vous annonçons que votre compte est bien crée.</p>
        </div>
        <div style="padding-top:10px">
            <p>Cordialement,</p>
            <p>L'équipe d'Atlanticar</p>
        </div>
        <img src ="../../assets.logo.jpg">
        <p><i>Ne répondez pas à cette adresse mail</i></p>
        `,
    }

    sendMail(transporter, mailOptions);


    return [
        [
            `
            INSERT INTO account (user, password, phone_number, email)
            SELECT ?, ?, ?, ? FROM DUAL
            WHERE NOT EXISTS (
            SELECT * FROM account
            WHERE user = ? OR phone_number = ?
            );
            `
        ],
        [
            [data.parameters[0], data.parameters[1], data.parameters[2], data.parameters[3], data.parameters[0], data.parameters[2]]
        ]
    ];
}


exports.signUp = signUp;