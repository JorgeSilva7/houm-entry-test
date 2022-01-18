/**
 * Property Router
 *
 * This file contains a specification of all routes on the /properties path. This routes need authenticated user (AuthMiddleware)
 *
 * @author Jorge Silva
 */
import express from "express";
import AuthMiddleware from "../../../../shared/middlewares/auth.middleware";
import PropertyController from "./property.controller";

class AuthRouter {
	public path = "/properties";
	public router = express.Router();
	private propertyController: PropertyController;

	constructor() {
		this.propertyController = new PropertyController();

		this.router.post(
			`${this.path}`,
			AuthMiddleware,
			this.propertyController.create
		);
		this.router.get(
			`${this.path}`,
			AuthMiddleware,
			this.propertyController.getByHoumer
		);
	}
}

export default AuthRouter;
