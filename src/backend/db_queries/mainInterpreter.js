/**
 * Importe le module d'interprétation des comptes.
 * @module accountInterpreter
 */
const { accountInterpreter } = require("./account/accountInterpreter.js");

/**
 * Importe le module d'interprétation des annonces.
 * @module announcementsInterpreter
 */
const { announcementsInterpreter } = require("./announcements/announcementsInterpreter.js");

/**
 * Importe le module d'interprétation des applications.
 * @module applicationsInterpreter
 */
const { applicationsInterpreter } = require("./applications/applicationsInterpreter.js");

/**
 * Combine tous les interprètes en un seul objet d'interprète.
 * @constant
 * @type {Object}
 */
const interpreter = {
    ...accountInterpreter,
    ...announcementsInterpreter,
    ...applicationsInterpreter
};

/**
 * Exporte l'objet d'interprète combiné.
 * @exports interpreter
 */
exports.interpreter = interpreter;
