const {accountInterpreter} = require("./account/accountInterpreter.js")
const {announcementsInterpreter} = require("./announcements/announcementsInterpreter.js")
const {applicationsInterpreter} = require("./applications/applicationsInterpreter.js")

const interpreter = {
    ...accountInterpreter,
    ...announcementsInterpreter, 
    ...applicationsInterpreter
}

exports.interpreter = interpreter;
