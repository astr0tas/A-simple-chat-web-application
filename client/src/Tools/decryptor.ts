import key from "./RSAKey.tool";
import CryptoJS from "crypto-js";

export default function decryptor(data: string, sessionKey: string): (false | string)
{
      // Decrypt the encrypted AES key (session key)
      const aesKey: string | false = key.decrypt(sessionKey);
      if (!aesKey)
            return false;

      // Use the AES key to decrypt the encrypted data
      const decryptedData = CryptoJS.AES.decrypt(data, aesKey).toString();

      return decryptedData;
}