/**
 * Fonction vérifiant que le String en paramètre ne contient que des chiffres
 * @param {String} str - Chaîne de caractères à évaluer
 * @returns {Boolean} - Indique s'il n'y a que des chiffres dans la chaîne de caractères
 */
function isOnlyNumbers(str) {
    return /^\d+$/.test(str);
}

export default isOnlyNumbers;