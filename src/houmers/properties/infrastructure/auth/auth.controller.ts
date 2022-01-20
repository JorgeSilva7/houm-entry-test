/**
 * Auth Controller
 *
 * This file contains the middlewares between route and the "use case" or "application".
 * Extract the necesary data from express.Request
 *
 * Controlls the request and response for auth methods
 *
 * @author Jorge Silva
 *
 */

import { NextFunction, Request, Response } from "express";
import AuthUseCases from "../../application/auth.usecases";
import HoumerRepository from "../houmer/houmer.repository";

class AuthController {
	private authUseCases: AuthUseCases;

	constructor() {
		const houmerRepository = new HoumerRepository();
		this.authUseCases = new AuthUseCases(houmerRepository);
	}

	login = async (request: Request, response: Response, next: NextFunction) => {
		const { body } = request;

		const result = await this.authUseCases.login(body);
		if (result instanceof Error) {
			return next(result);
		}
		return response.status(200).send(result);
	};

	register = async (
		request: Request,
		response: Response,
		next: NextFunction
	) => {
		const { body } = request;

		const result = await this.authUseCases.register(body);
		if (result instanceof Error) {
			return next(result);
		}
		return response.status(201).send({ success: result });
	};
}

export default AuthController;
