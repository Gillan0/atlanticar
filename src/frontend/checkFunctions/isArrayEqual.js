function isArrayEqual(a,b) {
    if (a.length !== b.length) {
        return false;
    }
    
    // Comparer chaque élément des deux tableaux
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true
}
export default isArrayEqual;