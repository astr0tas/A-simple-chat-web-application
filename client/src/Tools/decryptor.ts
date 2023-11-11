import key from "./RSAKey.tool";

export default function decryptor(data:string): any
{
      return JSON.parse(key.decrypt(data) as string);
}