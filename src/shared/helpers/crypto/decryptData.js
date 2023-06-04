import CryptoJS from 'crypto-js';

import NotiflixMessage from 'shared/components/NotiflixMessage/NotiflixMessage';

const decryptData = (encryptedData, key) => {
  try {
    if (encryptedData) {
      const decrypted = CryptoJS.AES.decrypt(encryptedData, key).toString(
        CryptoJS.enc.Utf8
      );
      return decrypted;
    }
  } catch (error) {
    NotiflixMessage({
      type: 'info',
      data: error.message,
    });
  }

  return null;
};

export default decryptData;
