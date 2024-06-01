// All imports needed for creation of interpreter

const {forgottenPassword} = require("./forgottenPassword.js");
const {getNotifications} = require("./getNotifications.js");
const {modifyEmail} = require("./modifyEmail.js")
const {modifyPassword} = require("./modifyPassword.js");
const {modifyPhone} = require("./modifyPhone.js");
const {signIn} = require("./signIn.js");
const {signUp} = require("./signUp.js")

// Links commands to functions
const accountInterpreter = {
    "forgotten_password" : forgottenPassword,
    "get_notifications" : getNotifications,
    "modify_password" : modifyPassword,
    "modify_phone_number" : modifyPhone,
    "modify_email" : modifyEmail,
    "signIn" : signIn,
    "signUp" : signUp
}

exports.accountInterpreter = accountInterpreter;