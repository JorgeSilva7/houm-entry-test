/**
 * Database connection
 *
 * This file is used to connect to a Database engine. The database connection is stored in "db" variable to use in external file
 *
 */

import * as config from "./config";
import { connect } from "mongoose";

export default class DatabaseConnection {
	public db: any;

	/**
	 * Connect to Mongodb with Mongoose
	 */
	async mongooseDB() {
		console.log("Connecting to mongodb...");
		return connect(config.DB_URI)
			.then(async () => {
				console.log("Connected to MongoDB With Mongoose");
			})
			.catch((err) => {
				throw new Error(err);
			});
	}
}
