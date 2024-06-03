/**
 * Compares two arrays for equality.
 * 
 * @param {Array} a - The first array to compare.
 * @param {Array} b - The second array to compare.
 * @returns {boolean} Returns true if the arrays are equal, false otherwise.
 */
function isArrayEqual(a, b) {
    // Check if the arrays have the same length
    if (a.length !== b.length) return false;
    
    // Compare each element of the two arrays
    for (let i = 0; i < a.length; i++) {        
        if (a[i] !== b[i]) return false;
    }    
    return true;
}

export default isArrayEqual;
