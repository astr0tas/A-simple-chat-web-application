import axios from 'axios';
import key from './RSAKey.tool';
import encryptor from './encryptor';
import decryptor from './decryptor';
import encryptedMethods from '../config/encryptedMethod.config';

const request = axios.create({
      withCredentials: true
});

request.interceptors.request.use(async (req) =>
{
      if (req.method && encryptedMethods.includes(req.method))
      {
            const encryptResult = await encryptor(JSON.stringify(req.data));
            if (!encryptResult)
                  throw new Error('Client data encryption failed!');
            const [encryptedData, sessionKey] = encryptResult;
            req.data = { key: key.getPublicKey(), data: encryptedData, sessionKey };
      }
      else
            req.data = { key: key.getPublicKey(), data: req.data };
      return req;
}, (error) =>
{
      return Promise.reject(error);
});

request.interceptors.response.use(res =>
{
      if (res.data.isEncrypted)
      {
            const decryptedData = decryptor(res.data.data, res.data.sessionKey);
            if (!decryptedData)
                  throw new Error("Client data encryption failed!");
            return { ...res, data: JSON.parse(decryptedData) };
      }
      else
      {
            if (res.data.message)
                  return { ...res, message: res.data.message };
            else
                  return { ...res, data: res.data.data };
      }
}, (error) =>
{
      return Promise.reject(error);
});

export default request;