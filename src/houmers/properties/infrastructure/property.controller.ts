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
import AuthUseCases from "../application/auth.usecases";
import HoumerRepository from "./houmer/houmer.repository";

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
		return response.status(201).send(result);
	};

	create = async (request: Request, response: Response, next: NextFunction) => {
		const body = request.body;

		let result = body;
		// try {
		//   result = await this.postClient.post(
		//     null,
		//     request["dercoHeaders"]["x-derco-idtrace"],
		//     body
		//   );
		// } catch (err) {
		//   return next(err);
		// }

		return response.status(201).send({ result, info: "create" });
	};

	patch = async (request: Request, response: Response, next: NextFunction) => {
		let body = request.body;
		const documento = request.params.id;
		request.params?.id && (body = { ...body, numero_documento: documento });
		let result = body;
		// try {
		//   result = await this.patchClient.patch(
		//     null,
		//     request["dercoHeaders"]["x-derco-idtrace"],
		//     body
		//   );
		// } catch (err) {
		//   return next(err);
		// }

		return response.status(201).send({ result, info: "create" });
	};

	findOne = async (
		request: Request,
		response: Response,
		next: NextFunction
	) => {
		const id = request.params.id;

		// const result = await this.findClient.findById(
		//   id,
		//   request["dercoHeaders"]["x-derco-idtrace"]
		// );
		// if (result instanceof Error) return next(result);

		return response.status(200).send(id);
	};

	find = async (request: Request, response: Response, next: NextFunction) => {
		const query = request.query;

		// const result = await this.findClient.find(
		//   query,
		//   request["dercoHeaders"]["x-derco-idtrace"]
		// );
		// if (result instanceof Error) return next(result);

		return response.status(200).send(query);
	};
}

export default AuthController;
