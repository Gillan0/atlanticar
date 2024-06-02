/**
 * Import account interpreter module.
 * @module accountInterpreter
 */
const { accountInterpreter } = require("./account/accountInterpreter.js");

/**
 * Import announcements interpreter module.
 * @module announcementsInterpreter
 */
const { announcementsInterpreter } = require("./announcements/announcementsInterpreter.js");

/**
 * Import applications interpreter module.
 * @module applicationsInterpreter
 */
const { applicationsInterpreter } = require("./applications/applicationsInterpreter.js");

/**
 * Combines all interpreters into a single interpreter object.
 * @constant
 * @type {Object}
 */
const interpreter = {
    ...accountInterpreter,
    ...announcementsInterpreter,
    ...applicationsInterpreter
};

/**
 * Exports the combined interpreter object.
 * @exports interpreter
 */
exports.interpreter = interpreter;
