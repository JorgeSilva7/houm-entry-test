/**
 * Error middleware
 *
 * This middleware is use to handle an HttpException and return Http Response with the error
 *
 */

import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/api.exception";

function ErrorMiddleware(
	error: HttpException,
	request: Request,
	response: Response,
	next: NextFunction
) {
	const status = error.status || 500;
	const message = error.message || "Something went wrong";
	return response.status(status).send({
		status,
		message,
	});
}

export default ErrorMiddleware;
