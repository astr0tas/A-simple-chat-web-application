import express, { Express, Request, Response } from 'express';
import https from 'https';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import bodyParser from "body-parser";

const port: number = 8080;

const app: Express = express();
app.use(cors({
      origin: '*',
      methods: '*',
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());
app.get('/', (req: Request, res: Response) =>
{
      res.send("Welcum");
});

const __dirname = dirname(dirname(fileURLToPath(import.meta.url)));
const server: https.Server = https.createServer({
      key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
      cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app);

server.listen(port, () =>
{
      console.log("Server listening on port " + port);
});