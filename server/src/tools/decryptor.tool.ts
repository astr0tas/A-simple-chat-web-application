// import key from "../config/RSAKey.config.js"; // Must include `.js` extension in order to work properly!
// import crypto from "crypto";


export default function decryptor(encryptedData: string, sessionKey: string): string
{
      const aesKey = key.decrypt(sessionKey, "utf8");

      // if (encryptedData)
      //       return JSON.parse(key.decrypt(encryptedData, 'utf8'));
      // else return null;
}