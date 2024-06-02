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
        text: "Bienvenue sur AtlantiCar ! Nous vous annonçons que votre compte est bien crée !",
        html: "<b>Bienvenue sur AtlantiCar ! Nous vous annonçons que votre compte est bien crée !</b>",
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