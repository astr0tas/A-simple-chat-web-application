import express, { Router } from 'express';
import key from '../config/RSAKey.config.js'; // Must include `.js` extension in order to work properly!

const serverKeyRoute: Router = express.Router();

serverKeyRoute.get('/getServerPublicKey', (req, res) =>
{
      res.status(200).send({ key: key.exportKey('public') });
});

export default serverKeyRoute;