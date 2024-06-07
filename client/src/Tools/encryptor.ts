import domain from "../config/serverDomain.config";
import axios from "axios";
import JSEncrypt from "jsencrypt";
import CryptoJS from "crypto-js";

export default async function encryptor(data: string): Promise<[string, string] | false>
{
      // Encrypt data with AES key
      const aesKey: string = CryptoJS.lib.WordArray.random(32).toString();
      const encryptedData = CryptoJS.AES.encrypt(data, aesKey).toString();

      // Encrypt the AES key with the server's public key
      const res = await axios.get(`${ domain }/getServerPublicKey`);
      const encryptor = new JSEncrypt();
      encryptor.setPublicKey(res.data.key);
      const sessionKey: string | false = encryptor.encrypt(aesKey);
      if (!sessionKey) return false;

      return [encryptedData, sessionKey];
}
