/**
 * Function to check if the input string contains '@imt-atlantique.net'.
 * 
 * @param {String} str - The string to evaluate.
 * @returns {Boolean} - Indicates whether the string contains '@imt-atlantique.net'.
 */
function isIMTAdress(str) {
    return str.includes("@imt-atlantique.net");
}

export default isIMTAdress;
