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
import { AuthenticationModel } from './model/AuthenticationModel.js'; // Note for index.ts: Must include `.js` extension in order to have index.js work properly!
import mysql from 'mysql2';
import AuthenticationRoutes from './controller/AuthenticationController.js'; // Note for index.ts: Must include `.js` extension in order to have index.js work properly!

const port: number = 8080;
const app: Express = express();
const key: NodeRSA = new NodeRSA({ b: 2048 });
const FileStore: FileStoreFactory.FileStore = FileStoreFactory(session);
const validator: AuthenticationModel = new AuthenticationModel();

app.use(cors({
      origin: '*',
      methods: '*',
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(session({
      store: new FileStore({
            path: './model/sessions',
      }),
      secret: 'uwc-enhanced-edition',
      resave: false,
      saveUninitialized: false,
      cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 3600000 * 24 * 3,
      },
      name: 'sessionUserID'
}));
app.get('/getServerPublicKey', (req, res) =>
{
      res.status(200).send({ key: key.exportKey('public') });
});

app.use((req, res, next) =>
{
      if (req.url === '/logout' || req.url === '/isLoggedIn' || req.url === '/' || req.url === '/recovery' || req.url === '/getServerPublicKey')
            next();
      else
      {
            if (!req.session)
                  return res.status(401).send('Session cookie not present!');

            validator.validateID(req.session.userID, (result: mysql.OkPacket | mysql.RowDataPacket[] | mysql.ResultSetHeader[] | mysql.RowDataPacket[][] | mysql.ProcedureCallPacket | mysql.OkPacket[] | null, err: mysql.QueryError | null) =>
            {
                  if (err)
                  {
                        console.log(err);
                        res.status(500).send({ message: 'Server internal error!' });
                  }
                  else
                  {
                        const contentType = req.get('Content-Type');
                        // const authorization = req.header('Authorization');

                        console.log('Content-Type:', contentType);
                        // console.log('Authorization:', authorization);

                        // Check if it is a GET request
                        // if (req.method === 'GET')
                        // {
                        //       // GET method doesn't need to have Content-Type header
                        //       if (contentType)
                        //             return res.status(400).send({ message: 'Invalid Content-Type' });
                        // }
                        // else
                        // {
                        // Verify the Content-Type header for other request methods
                        if (contentType && contentType !== 'application/json')
                        {
                              return res.status(400).send({ message: 'Invalid Content-Type' });
                        }
                        // }

                        // Verify the Authorization header (not needed for this project)
                        // if (!authorization)
                        // {
                        //       return res.status(401).send('Authorization header is missing');
                        // }

                        // Perform any other necessary verification steps here

                        // If all verification steps pass, proceed to the API endpoint
                        next();
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