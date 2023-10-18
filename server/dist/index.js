import express from 'express';
import https from 'https';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import bodyParser from "body-parser";
import { Server as SocketServer } from "socket.io";
const port = 8080;
const app = express();
app.use(cors({
    origin: '*',
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send("Welcum");
});
const __dirname = dirname(dirname(fileURLToPath(import.meta.url)));
const server = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app);
const io = new SocketServer(server);
server.listen(port, () => {
    console.log("Server listening on port " + port);
});
