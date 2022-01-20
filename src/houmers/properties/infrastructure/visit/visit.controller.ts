/**
 * Visit Controller
 *
 * This file contains the middlewares between route and the "use case" or "application".
 * Extract the necesary data from express.Request
 *
 * Controlls the request and response for visit methods
 *
 * @author Jorge Silva
 *
 */

import { NextFunction, Request, Response } from "express";
import VisitUseCase from "../../application/visit.usecases";
import VisitRepository from "./visit.repository";
import PropertyRepository from "../property/property.repository";
import ApiException from "../../../../shared/exceptions/api.exception";

class VisitController {
	private visitUseCase: VisitUseCase;

	constructor() {
		const propertyRepository = new PropertyRepository();
		const visitRepository = new VisitRepository();
		this.visitUseCase = new VisitUseCase(visitRepository, propertyRepository);
	}

	create = async (request: Request, response: Response, next: NextFunction) => {
		const { body } = request;

		const result = await this.visitUseCase.create(body, request["houmer"]);
		if (result instanceof Error) {
			return next(result);
		}
		return response.status(201).send({ success: result });
	};

	end = async (request: Request, response: Response, next: NextFunction) => {
		const { params } = request;

		const result = await this.visitUseCase.end(params.id, request["houmer"]);
		if (result instanceof Error) {
			return next(result);
		}
		return response.status(200).send({ success: result });
	};

	getByHoumer = async (
		request: Request,
		response: Response,
		next: NextFunction
	) => {
		const { query } = request;

		let result = null;
		if (query["type"] == "visit_duration") {
			result = await this.visitUseCase.getByHoumerWithVisitDuration(
				request["houmer"],
				query
			);
		} else if (query["type"] == "move_speed") {
			result = await this.visitUseCase.getByHoumerWithMoveDuration(
				request["houmer"],
				query
			);
		} else {
			return next(
				new ApiException(
					400,
					"The query 'type' is necessary and must be 'visit_duration' o 'move_speed'"
				)
			);
		}

		if (result instanceof Error) {
			return next(result);
		}

		return response.status(200).send({ items: result });
	};
}

export default VisitController;
