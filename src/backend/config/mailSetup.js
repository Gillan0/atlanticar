require('dotenv').config();
const nodemailer = require("nodemailer");

/**
 * Creates a transporter object using the default SMTP transport.
 * @constant
 * @type {Object}
 */
const transporter = nodemailer.createTransport({
    service     : process.env.MAIL_SERVICE,
    host        : process.env.MAIL_HOST,
    port        : process.env.MAIL_PORT,
    secure      : process.env.MAIL_SECURE === 'true', // Convert string to boolean
    auth: {
        user      : process.env.MAIL_USER,
        pass      : process.env.MAIL_PASSWORD,
    },
});


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
        console.log("Email has been sent!");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};


/**
 * Exports the transporter and sendMail function.
 * @exports transporter
 * @exports sendMail
 */
exports.transporter = transporter;
exports.sendMail = sendMail;
