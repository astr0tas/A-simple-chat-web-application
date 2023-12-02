import express, { Router } from "express";
import authenticationController from "../controller/authentication.controller.js"; // Must include `.js` extension in order to work properly!

const controller: authenticationController = new authenticationController();

const authenticationRoutes: Router = express.Router();

authenticationRoutes.post('/login', controller.login);
authenticationRoutes.get('/', controller.isLoggedIn);
authenticationRoutes.delete('/logout', controller.logout);
authenticationRoutes.get('/recoveryValidation', controller.validation);
authenticationRoutes.put('/recoveryNewPassword', controller.newPassword);

export default authenticationRoutes;