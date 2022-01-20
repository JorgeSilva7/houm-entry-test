import { describe, before } from "mocha";

import chai from "chai";
import PropertyUseCase from "../../../../src/houmers/properties/application/property.usecases";
import PropertyRepositoryTest from "../infrastructure/property.repository_test";
const { expect } = chai;

const startTest = () => {
	let propertyUseCase: PropertyUseCase;

	before((done) => {
		const propertyRepository = new PropertyRepositoryTest();
		propertyUseCase = new PropertyUseCase(propertyRepository);

		done();
	});

	describe("Property", async () => {
		it("should create a property", async function () {
			const body = {
				name: "Casa 1",
				coordinates: {
					latitude: "-38.7288152829259",
					longitude: -72.61304485137737,
				},
			};
			const isCreated = await propertyUseCase.create(body, "1");

			expect(isCreated).to.equal(true);
		});

		it("expect a error because body lack data", async function () {
			const body = {
				name: "",
				coordinates: {
					latitude: "-38.7288152829259",
					longitude: -72.61304485137737,
				},
			};

			const isCreated = await propertyUseCase.create(body, "1");

			expect(isCreated).to.be.a("Error");
			expect((<Error>isCreated).message).to.include("name can't be empty");
		});

		it("should get propertys by houmer id", async function () {
			const result = await propertyUseCase.getByHoumer("1");
			expect(result).to.be.a("Array");
			expect(result).to.length(1);
		});
	});
};

export default { startTest };
