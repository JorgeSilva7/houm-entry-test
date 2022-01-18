/**
 * Initial file to run api server
 *
 */
import { config } from "dotenv";
config();

import { PORT } from "./shared/config";
import App from "./shared/app";
import DatabaseConnection from "./shared/databases.connection";

import AuthRouter from "./houmers/properties/infrastructure/auth/auth.router";
import PropertyRouter from "./houmers/properties/infrastructure/property/property.router";

async function init() {
	const databaseConnection = new DatabaseConnection();
	await databaseConnection
		.mongooseDB()
		.then(() => {
			// Create new App with array of routes Routes instances and port to listen
			const app = new App([new AuthRouter(), new PropertyRouter()], PORT);

			//Start express app
			app.listen();
		})
		.catch((err) => {
			console.log(err);
		});
}

init();
