/**
 * Visit Router
 *
 * This file contains a specification of all routes on the /visits path. This routes need authenticated user (AuthMiddleware)
 *
 * @author Jorge Silva
 */
import express from "express";
import AuthMiddleware from "../../../../shared/middlewares/auth.middleware";
import VisitController from "./visit.controller";

class VisitRouter {
	public path = "/visits";
	public router = express.Router();
	private visitController: VisitController;

	constructor() {
		this.visitController = new VisitController();

		this.router.post(
			`${this.path}`,
			AuthMiddleware,
			this.visitController.create
		);
		this.router.patch(
			`${this.path}/:id/end`,
			AuthMiddleware,
			this.visitController.end
		);
		this.router.get(
			`${this.path}`,
			AuthMiddleware,
			this.visitController.getByHoumer
		);
	}
}

export default VisitRouter;
