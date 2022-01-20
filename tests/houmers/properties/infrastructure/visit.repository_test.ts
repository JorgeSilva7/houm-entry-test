import Visit from "../../../../src/houmers/properties/domain/visit";
import IVisitRepository from "../../../../src/houmers/properties/domain/repository/ivisit.repository";
import moment from "moment";

class VisitRepositoryTest implements IVisitRepository {
	data: Visit[] = [];

	async getById(id: string): Promise<Visit | Error> {
		const found = this.data.find((visit) => visit._id == id);

		if (!found) {
			return new Error("Error");
		}

		return found;
	}

	async create(visit: Visit): Promise<Visit | Error> {
		const visitObj = new Visit();
		visitObj._id = visit.property._id;
		visitObj.property = visit.property;
		visitObj.houmer_id = visit.houmer_id;
		visitObj.start_date = visit.start_date;

		this.data.push(visitObj);
		return await visitObj;
	}

	async update(visit: Visit): Promise<boolean | Error> {
		const found = this.data.find((visit) => visit._id == visit._id);

		if (!found) {
			return new Error("Error");
		}

		found.end_date = visit.end_date;

		return await true;
	}

	async getByHoumer(
		id: string,
		day: string,
		withDuration: boolean
	): Promise<Visit[] | Error> {
		let found: Visit[] = [];

		if (day) {
			found = this.data.filter(
				(visit) =>
					visit.houmer_id == id &&
					moment(visit.end_date).format("YYYY-MM-DD") == day
			);
		} else {
			found = this.data.filter(
				(visit) => visit.houmer_id == id && visit.end_date == null
			);
		}

		return found;
	}
}

export default VisitRepositoryTest;
