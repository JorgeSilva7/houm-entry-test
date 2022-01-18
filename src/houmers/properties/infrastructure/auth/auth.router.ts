/**
 * Auth Router
 *
 * This file contains a specification of all routes on the /auth path
 *
 * @author Jorge Silva
 */
import express from "express";
import AuthController from "./auth.controller";

class AuthRouter {
	public path = "/auth";
	public router = express.Router();
	private authController: AuthController;

	constructor() {
		this.authController = new AuthController();

		this.router.post(`${this.path}/login`, this.authController.login);
		this.router.post(`${this.path}/register`, this.authController.register);
	}
}

export default AuthRouter;
