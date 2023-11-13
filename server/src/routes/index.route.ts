import express, { Express } from 'express';
import serverKeyRoute from './getServerPublicKey.route.js'; // Must include `.js` extension in order to work properly!
import authenticationRoutes from './authentication.route.js'; // Must include `.js` extension in order to work properly!

const routes: Express = express();

routes.use('/', serverKeyRoute);
routes.use('/', authenticationRoutes);

export default routes;