require('dotenv').config();

const nodemailer = require("nodemailer");
const new_password = Math.random().toString(36).substr(2, 12);


/**
 * Creates a transporter object using the default SMTP transport.
 * @constant
 * @type {Object}
 */
const transporter = nodemailer.createTransport({
    
    service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE,
    
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },
    
});


/**
 * Email options including sender, recipient, subject, and content.
 * @constant
 * @type {Object}
 */
const mailOptions = {
    
    from: {
        name: "AtlantiCar Services",
        address: process.env.MAIL_USER
    },
    
    to: [],
    subject: "Mot de passe oublié",
    text: "Voici votre nouveau mot de passe: " + new_password,
    html: "<b>Voici votre nouveau mot de passe: " + new_password + "</b>",

};


/**
 * Sends an email using the specified transporter and mail options.
 * @async
 * @function sendMail
 * @param {Object} transporter - The nodemailer transporter object.
 * @param {Object} mailOptions - The mail options object containing sender, recipient, subject, and body of the email.
 * @returns {Promise<void>} A promise that resolves when the email is sent.
 */
const sendMail = async (transporter, mailOptions) => {
    
    try {
        await transporter.sendMail(mailOptions);
        console.log("The email has been sent");
    } catch (error) {
        console.error("Error sending email:", error);
    }
    
};


/**
 * Exports the transporter, mailOptions, and sendMail function.
 * @exports transporter
 * @exports mailOptions
 * @exports sendMail
 */
exports.transporter = transporter;
exports.mailOptions = mailOptions;
exports.sendMail = sendMail;
