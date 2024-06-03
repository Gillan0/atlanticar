/**
 * Function to check if the input string is a valid price.
 * An empty string is considered a valid price.
 * 
 * @param {String} str - The string to evaluate.
 * @returns {Boolean} - Indicates whether the string is a valid price.
 */
function isValidPrice(str) {
    if (str === '') {
        return true;
    }
    const num = parseFloat(str);
    return !isNaN(num);
}

export default isValidPrice;
