import JSEncrypt from "jsencrypt";
import axios from 'axios';
import domain from "./domain";

const key: JSEncrypt = new JSEncrypt();

const request = axios.create({
      withCredentials: true
});

async function encrypt(data: any): Promise<string | false>
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
      const encryptedData = await encrypt(req.data);
      req.data = { key: key.getPublicKey(), data: encryptedData };
      // }
      return req;
}, (error) =>
{
      return Promise.reject(error);
});

request.interceptors.response.use(res =>
{
      const decryptedData = key.decrypt(res.data);
      return { ...res, data: decryptedData };
}, (error) =>
{
      return Promise.reject(error);
});

export default request;