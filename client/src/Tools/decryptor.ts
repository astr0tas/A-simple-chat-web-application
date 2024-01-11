import key from "./RSAKey.tool";

export default function decryptor(data: string)
{
      const decryptedData: string | boolean = key.decrypt(data);
      if (decryptedData === false) return null;
      return JSON.parse(decryptedData);
}