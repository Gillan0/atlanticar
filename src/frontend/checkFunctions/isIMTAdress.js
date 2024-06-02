/**
 * Fonction vérifiant que le String entré en paramètre contient '@imt-atlantique.net'
 * @param {String} str - Chaîne de caractères à évaluer 
 * @returns {Boolean} - Indique si la chaîne de caractère contient '@imt-atlantique.net'
 */
function isIMTAdress(str){
    return str.includes("@imt-atlantique.net");
}

export default isIMTAdress