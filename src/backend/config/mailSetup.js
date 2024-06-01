const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "atlanticarservices@gmail.com",
      pass: "nlkeyzfikaigmlkz",
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