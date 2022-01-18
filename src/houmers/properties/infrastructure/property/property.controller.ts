/**
 * Property Controller
 *
 * This file contains the middlewares between route and the "use case" or "application".
 * Extract the necesary data from express.Request
 *
 * Controlls the request and response for property methods
 *
 * @author Jorge Silva
 *
 */

import { NextFunction, Request, Response } from "express";
import PropertyUseCases from "../../application/property.usecases";
import PropertyRepository from "./property.repository";
import haversine from "haversine";

class PropertyController {
	private propertyUseCases: PropertyUseCases;

	constructor() {
		const propertyRepository = new PropertyRepository();
		this.propertyUseCases = new PropertyUseCases(propertyRepository);
	}

	create = async (request: Request, response: Response, next: NextFunction) => {
		const { body } = request;

		const result = await this.propertyUseCases.create(body, request["houmer"]);
		if (result instanceof Error) {
			return next(result);
		}
		return response.status(201).send({ success: result });
	};

	getByHoumer = async (
		request: Request,
		response: Response,
		next: NextFunction
	) => {
		const result = await this.propertyUseCases.getByHoumer(request["houmer"]);
		if (result instanceof Error) {
			return next(result);
		}

		console.log(haversine(result[0].coordinates, result[1].coordinates));

		return response.status(200).send(result);
	};
}

export default PropertyController;
