require('dotenv').config();
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    service     : process.env.MAIL_SERVICE,
    host        : process.env.MAIL_HOST,
    port        : process.env.MAIL_PORT,
    secure      : process.env.MAIL_SECURE,

    auth: {
        user      : process.env.MAIL_USER,
        pass      : process.env.MAIL_PASSWORD,
    },
})


const sendMail = async (transporter, mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email has been sent !");
    }  catch (error) {
        console.error(error);
    }
}

exports.transporter = transporter;
exports.sendMail = sendMail;