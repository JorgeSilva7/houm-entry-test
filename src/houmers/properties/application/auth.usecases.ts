import ApiException from "../../../shared/exceptions/api.exception";
import Alphanumeric from "../../shared/domain/Alphanumeric";
import Name from "../../shared/domain/Name";
import Houmer from "../domain/houmer";
import IHoumerRepository from "../domain/repository/ihoumer.repository";
import { sign } from "jsonwebtoken";
import { SECRET_JWT } from "../../../shared/config";

class AuthUseCases {
	houmerRepository: IHoumerRepository;

	constructor(houmerRepository: IHoumerRepository) {
		this.houmerRepository = houmerRepository;
	}

	/**
	 * Register new Houmer
	 * @param body body with properties
	 * @returns true if houmer successfully registered
	 */
	register = async (body: any) => {
		const has_error = this.isValidRegisterBody(body);
		if (has_error.length) {
			return new ApiException(400, has_error);
		}

		try {
			const name = new Name(body.name, "name");
			const lastName = new Name(body.lastName, "lastName");
			const username = new Alphanumeric(body.username, "username");

			return this.houmerRepository.register(
				name,
				lastName,
				username,
				body.password
			);
		} catch (err) {
			return new ApiException(400, err);
		}
	};

	/**
	 * Login houmer with username and password
	 * @param body body with parameters
	 * @returns return token
	 */
	login = async (body: any) => {
		const has_error = this.isValidLoginBody(body);
		if (has_error.length) {
			return new ApiException(400, has_error);
		}

		try {
			const username = new Alphanumeric(body.username, "username");
			const password = body.password;

			const res = await this.houmerRepository.login(username, password);

			if (res instanceof Error) {
				return res;
			}

			const token = sign(
				{ id: res._id, username: res.username.value },
				SECRET_JWT,
				{
					expiresIn: "7d",
				}
			);

			return { token };
		} catch (err) {
			return err;
		}
	};

	/**
	 * Check if body is valid for register houmer
	 * @param body body with parameters to validate
	 * @returns array of errors (or an empty array)
	 */
	private isValidRegisterBody = (body: any): string[] => {
		const { name, lastName, username, password } = body;

		let error: string[] = [];
		!name && error.push("name can't be empty");
		!lastName && error.push("lastName can't be empty");
		!username && error.push("username can't be empty");
		!password && error.push("password can't be empty");

		String(password)?.length < 6 &&
			error.push("Password must be at least 6 characters");

		return error;
	};

	/**
	 * Check if body is valid for login
	 * @param body body with parameters to validate
	 * @returns array of errors (or an empty array)
	 */
	private isValidLoginBody = (body: any): string[] => {
		const { username, password } = body;

		let error: string[] = [];
		!username && error.push("Username can't be empty");
		!password && error.push("Password can't be empty");

		password?.length < 6 &&
			error.push("Password must be at least 6 characters");

		return error;
	};
}

export default AuthUseCases;
