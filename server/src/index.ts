import express, { Express } from 'express';
import https from 'https';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import bodyParser from "body-parser";
import { Server as SocketServer } from "socket.io";
import NodeRSA from 'node-rsa';
import session from "express-session";
import FileStoreFactory from 'session-file-store';
import { AuthenticationModel } from './model/AuthenticationModel.js'; // Note for index.ts: Must include `.js` extension in order to work properly!
import mysql from 'mysql2';
import AuthenticationRoutes from './controller/AuthenticationController.js'; // Note for index.ts: Must include `.js` extension in order to work properly!
import domain from './domain.js'; // Note for index.ts: Must include `.js` extension in order to work properly!

const port: number = 8080;
const app: Express = express();
const key: NodeRSA = new NodeRSA({ b: 2048 });
key.setOptions({ encryptionScheme: 'pkcs1' });
export { key };
const FileStore: FileStoreFactory.FileStore = FileStoreFactory(session);
const validator: AuthenticationModel = new AuthenticationModel();

app.use(cors({
      origin: `https://${ domain }`,
      methods: '*',
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(session({
      store: new FileStore({
            path: `${ dirname(fileURLToPath(import.meta.url)) }/model/sessions`,
      }),
      secret: 'uwc-enhanced-edition',
      resave: false,
      saveUninitialized: false,
      cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 3600000 * 24 * 3,
      }
}));

app.get('/getServerPublicKey', (req, res) =>
{
      res.status(200).send({ key: key.exportKey('public') });
});

app.use((req, res, next) =>
{
      console.log('====================================');
      console.log('Request url: ' + req.url);
      console.log('Request method: ' + req.method);
      const contentType = req.get('Content-Type');
      console.log('Content-Type:', contentType);
      console.log('====================================');

      if (req.url === '/login' || req.url === '/logout' || req.url === '/recoveryValidation' || req.url === '/recoveryNewPassword' || req.url === '/getServerPublicKey')
            next();
      else
      {
            if (!req.session)
            {
                  res.status(400).send({message:'Session cookie not present!'});
                  return;
            }

            validator.validateUser(req.session.username, (result: mysql.RowDataPacket[] | null, err: mysql.QueryError | null) =>
            {
                  if (err)
                  {
                        console.log(err);
                        res.status(500).send({ message: 'Server internal error!' });
                  }
                  else
                  {
                        if (result && result.length)
                        {
                              // Verify the Content-Type header for other request methods
                              if (req.method !== 'GET' && contentType && contentType !== 'application/json')
                                    res.status(400).send({ message: 'Invalid Content-Type' });
                              next();
                        }
                        else
                              res.status(401).send({ message: "Invalid user!" });
                  }
            });
      }
});

app.use('/', AuthenticationRoutes);

const __dirname = dirname(dirname(fileURLToPath(import.meta.url)));
const server: https.Server = https.createServer({
      key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
      cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app);

const io: SocketServer = new SocketServer(server);

server.listen(port, () =>
{
      console.log("Server listening on port " + port);
});