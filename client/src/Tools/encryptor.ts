import domain from "../config/serverDomain.config";
import axios from "axios";
import JSEncrypt from "jsencrypt";

export default async function encryptor(data: any): Promise<string | false>
{
      const stringifyData: string = JSON.stringify(data);
      const res = await axios.get(`https://${ domain }/getServerPublicKey`);
      const encryptor = new JSEncrypt();
      encryptor.setPublicKey(res.data.key);
      return encryptor.encrypt(stringifyData);
}
