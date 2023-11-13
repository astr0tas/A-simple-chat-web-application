import express from 'express';
import https from 'https';
import cors from 'cors';
// import { Server as SocketServer } from "socket.io";
import session from "express-session";
import corsConfig from './config/cors.config.js'; // Must include `.js` extension in order to work properly!
import sessionConfig from './config/session.config.js'; // Must include `.js` extension in order to work properly!
import SSL from './config/SSL.config.js'; // Must include `.js` extension in order to work properly!
import PORT from './config/PORT.config.js'; // Must include `.js` extension in order to work properly!
import routes from './routes/index.route.js'; // Must include `.js` extension in order to work properly!
import verifyRequest from './middleware/verifyRequest.middleware.js'; // Must include `.js` extension in order to work properly!
const app = express();
app.use(express.json()); // Allows you to access the parsed JSON body of a request using req.body in your route handlers.
app.use(express.urlencoded({ extended: true })); // Handle URL encoding
app.use(cors(corsConfig));
app.use(session(sessionConfig));
app.use(verifyRequest); // Verify requests before pass them to the handlers
app.use(routes);
const server = https.createServer(SSL, app);
// const io: SocketServer = new SocketServer(server);
server.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
});
