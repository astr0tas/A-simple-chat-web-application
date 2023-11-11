import axios from 'axios';
import key from './RSAKey.tool';
import encryptor from './encryptor';
import decryptor from './decryptor';

const request = axios.create({
      withCredentials: true
});

request.interceptors.request.use(async (req) =>
{
      // if (req.method === 'post')
      // {
      const encryptedData = await encryptor(req.data);
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
            const decryptedData = decryptor(res.data.data);
            return { ...res, data: decryptedData };
      }
      return { ...res, data: res.data.data };
}, (error) =>
{
      return Promise.reject(error);
});

export default request;