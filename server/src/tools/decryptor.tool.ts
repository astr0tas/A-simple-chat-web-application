import key from "../config/RSAKey.config.js"; // Must include `.js` extension in order to work properly!

export default function decryptor(encryptedData:string): any
{
      return JSON.parse(key.decrypt(encryptedData,'utf8'));
}