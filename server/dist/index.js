import express from 'express';
import https from 'https';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const port = 8080;
const app = express();
app.get('/', (req, res) => {
    res.send("Welcum");
});
const __dirname = dirname(dirname(fileURLToPath(import.meta.url)));
const server = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app);
server.listen(port, () => {
    console.log("Server listening on port " + port);
});
