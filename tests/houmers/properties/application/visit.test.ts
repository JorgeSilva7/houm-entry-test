import { describe, before } from "mocha";

import chai from "chai";
import VisitUseCase from "../../../../src/houmers/properties/application/visit.usecases";
import PropertyUseCase from "../../../../src/houmers/properties/application/property.usecases";
import VisitRepositoryTest from "../infrastructure/visit.repository_test";
import PropertyRepositoryTest from "../infrastructure/property.repository_test";
import moment from "moment";
import Visit from "../../../../src/houmers/properties/domain/visit";
const { expect } = chai;

const startTest = () => {
	let visitUseCase: VisitUseCase;
	let propertyUseCase: PropertyUseCase;

	before((done) => {
		const propertyRepository = new PropertyRepositoryTest();
		const visitRepositoryTest = new VisitRepositoryTest();
		visitUseCase = new VisitUseCase(visitRepositoryTest, propertyRepository);
		propertyUseCase = new PropertyUseCase(propertyRepository);

		done();
	});

	describe("Visit", async () => {
		it("should create a property (will use in future)", async function () {
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

		it("should create a visit to a last created property", async function () {
			const body = {
				property: "Casa 1",
			};
			const result = await visitUseCase.create(body, "1");
			expect(result).to.be.a("Object");
			expect(result).to.have.property("houmer_id");
		});

		it("should finish the last visit", async function () {
			const result = await visitUseCase.end("Casa 1", "1");
			expect(result).to.equal(true);
		});

		it("should return finished visits with visit_duration property", async function () {
			const query = {
				day: moment().format("DD-MM-YYYY"),
				type: "visit_duration",
			};
			const result = await visitUseCase.getByHoumerWithVisitDuration(
				"1",
				query
			);

			expect(result).to.be.a("Array");
			expect(result).to.length(1);

			const withDuration = (<Visit[]>result).map((f) => {
				return { ...f, visit_duration: "30 minutos" };
			});
			expect(withDuration[0]).to.have.property("visit_duration");
		});

		it("should create a other property (will use in next test)", async function () {
			const body = {
				name: "Casa 2",
				coordinates: {
					latitude: "-38.717392218041645",
					longitude: -72.55483729888249,
				},
			};
			const isCreated = await propertyUseCase.create(body, "1");

			expect(isCreated).to.equal(true);
		});

		it("should create a other visit to a last created property", async function () {
			const body = {
				property: "Casa 2",
			};
			const result = await visitUseCase.create(body, "1");
			expect(result).to.be.a("Object");
			expect(result).to.have.property("houmer_id");
		});

		it("should finish the last visit (2)", async function () {
			const result = await visitUseCase.end("Casa 2", "1");
			expect(result).to.equal(true);
		});

		it("should return finished visits with (movements or travels) with move_speed property", async function () {
			const query = {
				day: moment().format("DD-MM-YYYY"),
				type: "move_duration",
			};
			const result = await visitUseCase.getByHoumerWithMoveDuration("1", query);

			expect(result).to.be.a("Array");
			expect(result).to.length(1);
			expect(result[0]).to.have.property("move_speed");
		});
	});
};

export default { startTest };
