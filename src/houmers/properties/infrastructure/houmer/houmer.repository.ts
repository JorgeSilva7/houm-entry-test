/**
 * Hopumer repository
 *
 * This class implements Houmer repository using Mongoose library with Schema (./houmer.schema.ts)
 *
 * @author Jorge Silva
 */

import ApiException from "../../../../shared/exceptions/api.exception";
import Alphanumeric from "../../../shared/domain/Alphanumeric";
import Name from "../../../shared/domain/Name";
import Houmer from "../../domain/houmer";
import IHoumerRepository from "../../domain/repository/ihoumer.repository";
import HoumerSchema from "./houmer.schema";
import bcrypt from "bcrypt";

class HoumerRepository implements IHoumerRepository {
	async login(
		username: Alphanumeric,
		password: string
	): Promise<Houmer | Error> {
		return HoumerSchema.findOne({ username: username.value })
			.select("+password")
			.then(async (res) => {
				const houmer = new Houmer();
				houmer._id = res._id;
				houmer.name = res.name;
				houmer.lastName = res.lastName;
				houmer.password = res.password;
				houmer.username = res.username;

				try {
					const isMatch = await bcrypt.compare(password, houmer.password);

					if (!isMatch) return new ApiException(400, "Password don't match");

					return houmer;
				} catch (err) {
					return new ApiException(400, err);
				}
			})
			.catch((err) => {
				return new ApiException(404, "The username not exists");
			});
	}

	register(
		name: Name,
		lastName: Name,
		username: Alphanumeric,
		password: string
	): Promise<boolean | Error> {
		return HoumerSchema.create({
			name: name.value,
			lastName: lastName.value,
			username: username.value,
			password,
		})
			.then((_res) => {
				return true;
			})
			.catch((err) => {
				if (err.code === 11000) {
					return new ApiException(400, "The username already exists");
				}
				return new ApiException(500, err);
			});
	}
}

export default HoumerRepository;
