import Aes from 'react-native-aes-crypto';

const encryptData = (text, key) => {
    return Aes.randomKey(16).then(iv => {
        return Aes.encrypt(text, key, iv, 'aes-256-cbc').then(cipher => ({
            cipher,
            iv,
        }));
    });
};

const decryptData = (encryptedData, key) => {
    return Aes.decrypt(encryptedData.cipher, key, encryptedData.iv, 'aes-256-cbc');
};

export { encryptData, decryptData };