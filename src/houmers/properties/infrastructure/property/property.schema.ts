/**
 * Property Mongoose Schema
 *
 * This file contain Schema for Property to use with Mongoose library
 *
 */

import { model, Schema } from "mongoose";

const schema: Schema = new Schema({
	name: { type: String, required: true },
	coordinates: {
		latitude: { type: Number, required: true },
		longitude: { type: Number, required: true },
	},
	houmer_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "Houmer",
	},
});

const Property = model("Property", schema);

export default Property;
