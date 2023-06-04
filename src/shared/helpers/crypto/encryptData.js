import CryptoJS from 'crypto-js';

const encryptData = (data, key) => {
  const jsonString = JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(jsonString, key).toString();
  return encrypted;
};

  export default encryptData;