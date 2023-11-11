import express from 'express';
import https from 'https';
import cors from 'cors';
import bodyParser from "body-parser";
import { Server as SocketServer } from "socket.io";
import session from "express-session";
import { AuthenticationModel } from './model/Authentication.Model.js'; // Must include `.js` extension in order to work properly!
import AuthenticationRoutes from './controller/Authentication.Controller.js'; // Must include `.js` extension in order to work properly!
import exceptionURLs from './config/exceptionURL.config.js'; // Must include `.js` extension in order to work properly!
import corsConfig from './config/cors.config.js'; // Must include `.js` extension in order to work properly!
import sessionConfig from './config/session.config.js'; // Must include `.js` extension in order to work properly!
import key from './config/RSAKey.config.js'; // Must include `.js` extension in order to work properly!
import SSL from './config/SSL.config.js'; // Must include `.js` extension in order to work properly!
import PORT from './config/PORT.config.js'; // Must include `.js` extension in order to work properly!
const app = express();
const validator = new AuthenticationModel();
app.use(cors(corsConfig));
app.use(express.json());
app.use(bodyParser.json());
app.use(session(sessionConfig));
app.get('/getServerPublicKey', (req, res) => {
    res.status(200).send({ key: key.exportKey('public') });
});
app.use((req, res, next) => {
    console.log('====================================');
    console.log('Request url: ' + req.url);
    console.log('Request method: ' + req.method);
    const contentType = req.get('Content-Type');
    console.log('Content-Type:', contentType);
    console.log('====================================');
    if (exceptionURLs.includes(req.url))
        next();
    else {
        if (!req.session) {
            res.status(400).send({ message: 'Session cookie not present!' });
            return;
        }
        validator.validateUser(req.session.username, (result, err) => {
            if (err) {
                console.log(err);
                res.status(500).send({ message: 'Server internal error!' });
            }
            else {
                if (result && result.length) {
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
const server = https.createServer(SSL, app);
const io = new SocketServer(server);
server.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
});
