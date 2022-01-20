/**
 * Houmer Mongoose Schema
 *
 * This file contain Schema for Houmer to use with Mongoose library
 *
 */

import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const SALT_WORK_FACTOR = 10;

const schema: Schema = new Schema({
	username: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	lastName: { type: String, required: true },
	password: { type: String, required: true, select: false },
});

/**
 * Pre "SAVE" function
 * Generate HASH Password if password isModified
 */
schema.pre("save", function (next) {
	var houmer = this;

	// only hash the password if it has been modified (or is new)
	if (!houmer.isModified("password")) return next();

	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
		if (err) return next(err);

		// hash the password using our new salt
		bcrypt.hash(houmer.password, salt, function (err, hash) {
			if (err) return next(err);

			// override the cleartext password with the hashed one
			houmer.password = hash;
			next();
		});
	});
});

const Houmer = model("Houmer", schema);

//Seed
Houmer.create({
	username: "test",
	password: "test123_",
	name: "Test",
	lastName: "User",
})
	.then((res) => {
		console.log(
			"SEED HOUMER USER CREATED { username: test : password: test123_ }"
		);
	})
	.catch((err) => {
		console.log(
			"SEED HOUMER USER ALREADY CREATED { username: test : password: test123_ }"
		);
	});

export default Houmer;
