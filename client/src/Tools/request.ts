import JSEncrypt from "jsencrypt";
import axios from 'axios';
import domain from "./domain";

const key: JSEncrypt = new JSEncrypt();

const request = axios.create({
      withCredentials: true
});

async function encrypt(data: string): Promise<string | false>
{
      const res = await axios.get(`https://${ domain }/getServerPublicKey`);
      const encryptor = new JSEncrypt();
      encryptor.setPublicKey(res.data.key);
      return encryptor.encrypt(data);
}

request.interceptors.request.use(async (req) =>
{
      // if (req.method === 'post')
      // {
      const encryptedData = await encrypt(JSON.stringify(req.data));
      req.data = { key: key.getPublicKey(), data: encryptedData };
      // }
      return req;
}, (error) =>
{
      return Promise.reject(error);
});

request.interceptors.response.use(res =>
{
      if (res.data.isEncrypted)
      {
            const decryptedData = key.decrypt(res.data.data);
            return { ...res, data: decryptedData };
      }
      return { ...res, data: res.data.data };
}, (error) =>
{
      return Promise.reject(error);
});

export default request;