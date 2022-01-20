/**
 * Visit Mongoose Schema
 *
 * This file contain Schema for Visit to use with Mongoose library
 *
 */

import { model, Schema } from "mongoose";

const schema: Schema = new Schema({
	property: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "Property",
	},
	start_date: {
		type: Date,
		required: true,
	},
	end_date: {
		type: Date,
		required: false,
	},
	houmer_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "Houmer",
	},
});

const Visit = model("Visit", schema);

export default Visit;
