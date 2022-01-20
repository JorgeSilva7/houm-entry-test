/**
 * Auth middleware
 *
 * This middleware is used to verify the request has a valid auth token
 *
 */

import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { SECRET_JWT } from "../config";

function AuthMiddleware(
	request: Request,
	response: Response,
	next: NextFunction
) {
	var authorization = request.headers["authorization"];

	if (!authorization)
		return response.status(401).send({
			status: 401,
			message: "Token is mandatory for this route",
		});

	var token = authorization.split("Bearer ");
	if (!token[1])
		return response.status(401).send({
			status: 401,
			message: "Token is mandatory for this route with format: Bearer <TOKEN>",
		});

	verify(token[1], SECRET_JWT, function (err, decoded) {
		if (err)
			return response.status(401).send({
				status: 401,
				message: "The token has a invalid format or is incorrect",
			});

		request["houmer"] = decoded.id;

		return next();
	});
}

export default AuthMiddleware;
