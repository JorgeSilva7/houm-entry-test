/**
 * In this file, you find the initialization of express app, intialize of routers and middlewares
 *
 */

import express from "express";
import * as bodyParser from "body-parser";
import ErrorMiddleware from "./middlewares/error.middleware";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { SWAGGER_OPTIONS } from "./config";

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
	}

	private initializeErrorHandling() {
		this.app.use(ErrorMiddleware);
	}

	private initializeRouters(routers) {
		routers.forEach((router) => {
			this.app.use("", router.router);
		});
	}

	public listen() {
		this.app.listen(this.port, () => {
			console.log(`App listening on the port ${this.port}`);
		});
	}
}

export default App;
