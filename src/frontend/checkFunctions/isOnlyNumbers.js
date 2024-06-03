/**
 * Function to check if the input string contains only digits.
 * 
 * @param {String} str - The string to evaluate.
 * @returns {Boolean} - Indicates whether the string contains only digits.
 */
function isOnlyNumbers(str) {
    return /^\d+$/.test(str);
}

export default isOnlyNumbers;
