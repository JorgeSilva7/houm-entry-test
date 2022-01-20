import { describe, before } from "mocha";

import chai from "chai";
import HoumerRepositoryTest from "../infrastructure/houmer.repository_test";
import AuthUseCase from "../../../../src/houmers/properties/application/auth.usecases";
const { expect } = chai;

const startTest = () => {
	let authUseCase: AuthUseCase;

	before((done) => {
		const houmerRepository = new HoumerRepositoryTest();
		authUseCase = new AuthUseCase(houmerRepository);

		done();
	});

	describe("Auth - Register and Login", async () => {
		it("should register a houmer", async function () {
			const body = {
				name: "Jorge",
				lastName: "Silva",
				username: "jsilva",
				password: "123456",
			};
			const isCreated = await authUseCase.register(body);

			expect(isCreated).to.equal(true);
		});

		it("expect a error because user 'jsilva' already registered", async function () {
			const body = {
				name: "Jorge",
				lastName: "Silva",
				username: "jsilva",
				password: "123456",
			};

			const result = await authUseCase.register(body);
			expect(result).to.be.a("Error");
			expect((<Error>result).message).to.include("Username already exists");
		});

		it("expect a error because the password is too short", async function () {
			const body = {
				name: "Jorge",
				lastName: "Silva",
				username: "jsilva2",
				password: "12345",
			};
			const result = await authUseCase.register(body);
			expect(result).to.be.a("Error");
			expect((<Error>result).message).to.include(
				"Password must be at least 6 characters"
			);
		});

		it("should login last registered houmer", async function () {
			const body = {
				username: "jsilva",
				password: "123456",
			};
			const result = await authUseCase.login(body);

			expect(result).to.have.property("token");
		});

		it("expect a error on login because the username doesn't exists", async function () {
			const body = {
				username: "jsilvaaaa",
				password: "123456",
			};
			const result = await authUseCase.login(body);

			expect(result).to.be.a("Error");
			expect((<Error>result).message).to.equals("Error on login");
		});
	});
};

export default { startTest };
