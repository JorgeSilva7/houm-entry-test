/**
 * Initial file to run api server
 *
 */
import { config } from "dotenv";
config();

import { PORT } from "./shared/config";
import App from "./shared/app";
import DatabaseConnection from "./shared/databases.connection";

import ClientRouter from "./houmers/properties/infrastructure/client.router";

async function init() {
	const databaseConnection = new DatabaseConnection();
	await databaseConnection
		.mongooseDB()
		.then(() => {
			// Create new App with array of routes Routes instances and port to listen
			const app = new App([new ClientRouter()], PORT);

			//Start express app
			app.listen();
		})
		.catch((err) => {
			console.log(err);
		});
}

init();
