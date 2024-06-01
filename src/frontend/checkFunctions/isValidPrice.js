function isValidPrice(str) {
    if (str == '') {
        return true;
    }
    const num = parseFloat(str);
    return !isNaN(num);
}

export default isValidPrice;