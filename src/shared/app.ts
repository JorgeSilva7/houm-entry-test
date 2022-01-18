/**
 * In this file, you find the initialization of express app, intialize of routers and middlewares
 *
 */

import express from "express";
import * as bodyParser from "body-parser";
import ErrorMiddleware from "./middlewares/error.middleware";
import DercoHeadersMiddleware from "./middlewares/dercoHeaders.middleware";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { SWAGGER_OPTIONS } from "./config";
import { v1 as uuidv1 } from "uuid";

import {
	HealthChecker,
	HealthEndpoint,
	ReadinessEndpoint,
	LivenessEndpoint,
} from "@cloudnative/health-connect";
import Logger from "./log/logger";

class App {
	public app: express.Application;
	public port: number;

	constructor(routers, port) {
		this.app = express();
		this.port = port;

		this.initializeMiddlewares();
		this.initializeRouters(routers);
		this.initializeErrorHandling();
		this.initializeSwagger();
	}

	private initializeSwagger() {
		const specs = swaggerJsdoc(SWAGGER_OPTIONS);
		this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
	}

	private initializeMiddlewares() {
		this.app.use(bodyParser.json());
		this.app.use(DercoHeadersMiddleware);
	}

	private initializeErrorHandling() {
		this.app.use(ErrorMiddleware);
	}

	private initializeRouters(routers) {
		routers.forEach((router) => {
			this.app.use("", router.router);
		});
	}

	private initializeHealthCheck(): express.Router {
		const heathRouter = express.Router();

		let healthCheck = new HealthChecker();
		heathRouter.use("/live", LivenessEndpoint(healthCheck));
		heathRouter.use("/ready", ReadinessEndpoint(healthCheck));
		heathRouter.use("/health", HealthEndpoint(healthCheck));

		return heathRouter;
	}

	public listen() {
		this.app.listen(this.port, () => {
			console.log(`App listening on the port ${this.port}`);
			new Logger(
				"info",
				{
					statusCode: 200,
					message: `App listening on the port ${this.port}`,
				},
				uuidv1()
			).log();

			this.app.use("/check", this.initializeHealthCheck());
		});
	}
}

export default App;
