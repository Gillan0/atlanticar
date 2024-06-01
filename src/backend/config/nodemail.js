require('dotenv').config();

const nodemailer = require("nodemailer");
const new_password = Math.random().toString(36).substr(2, 12);

const transporter = nodemailer.createTransport({

    service     : process.env.MAIL_SERVICE,
    host        : process.env.MAIL_HOST,
    port        : process.env.MAIL_PORT,
    secure      : process.env.MAIL_SECURE,

    auth: {
        user      : process.env.MAIL_USER,
        pass      : process.env.MAIL_PASSWORD,
    },

});


const mailOptions = {

    from: {
            name    : "AtlantiCar Services", 
            address : process.env.MAIL_USER
    },

    to: [],
    subject: "Mot de passe oublié",
    text: "Voici votre nouveau mot de passe: " + new_password,
    html: "<b>Voici votre nouveau mot de passe: " + new_password + "</b>",

}


const sendMail = async (transporter, mailOptions) => {

    try {

        await transporter.sendMail(mailOptions);
        console.log("The email has been sent");
    
    }  catch (error) {

        console.error(error);
    
    }

}

exports.transporter = transporter;
exports.mailOptions = mailOptions;
exports.sendMail = sendMail;