/**
 * Client Mongoose Schema
 *
 * This file contain Schema for Client to use with Mongoose library
 *
 * @author Jorge Silva (e-jlillo)
 */

import { model, Schema } from "mongoose";

const ClientSchema: Schema = new Schema({
	origen: { type: String, required: true },
});

const Client = model("Client", ClientSchema);

export default Client;
