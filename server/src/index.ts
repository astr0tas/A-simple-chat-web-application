import express, { Express } from 'express';
import https from 'https';
import cors from 'cors';
import session from "express-session";
// import { Server as SocketServer } from "socket.io";
import corsConfig from './config/cors.config.js'; // Must include `.js` extension in order to work properly!
import sessionConfig from './config/session.config.js'; // Must include `.js` extension in order to work properly!
import SSL from './config/SSL.config.js'; // Must include `.js` extension in order to work properly!
import routes from './routes/index.route.js'; // Must include `.js` extension in order to work properly!
import verifyRequest from './middleware/verifyRequest.middleware.js'; // Must include `.js` extension in order to work properly!
import errorHandler from './middleware/errorHandler.middleware.js'; // Must include `.js` extension in order to work properly!
import dotenv from 'dotenv';
dotenv.config();


const app: Express = express();

app.use(express.json()); // Allows you to access the parsed JSON body of a request using req.body in your route handlers.
app.use(express.urlencoded({ extended: true })); // This middleware is added to the application to parse incoming requests with Content-Type: application/x-www-form-urlencoded. The extended: true option allows for parsing rich objects and arrays.
app.use(cors(corsConfig));
app.use(session(sessionConfig));

app.use(verifyRequest); // Verify requests before pass them to the handlers

app.use(routes);

app.use(errorHandler); // Handle errors thrown by the routers

const server: https.Server = https.createServer(SSL, app);

// const io: SocketServer = new SocketServer(server);

server.listen(parseInt(process.env.PORT || '8080'), () =>
{
      console.log("Server listening on port " + process.env.PORT || 8080);
});
