import ApiException from "../../../shared/exceptions/api.exception";

import IVisitRepository from "../domain/repository/ivisit.repository";
import IPropertyRepository from "../domain/repository/iproperty.repository";
import Visit from "../domain/visit";
import DateValue from "../../shared/domain/DateValue";
import haversine from "haversine";

class VisitUseCases {
	visitRepository: IVisitRepository;
	propertyRepository: IPropertyRepository;

	constructor(
		visitRepository: IVisitRepository,
		propertyRepository: IPropertyRepository
	) {
		this.visitRepository = visitRepository;
		this.propertyRepository = propertyRepository;
	}

	create = async (body: any, houmer_id: string) => {
		const has_error = this.isValidCreateBody(body);
		if (has_error.length) {
			return new ApiException(400, has_error);
		}

		try {
			const property = await this.propertyRepository.getById(body.property);
			if (property instanceof Error) {
				return property;
			}

			if (!property) {
				return new ApiException(404, `Property not found`);
			}

			const alreadyVisit = await this.visitRepository.getByHoumer(
				houmer_id,
				null,
				false
			);
			if (alreadyVisit instanceof Error) {
				return alreadyVisit;
			}

			if (alreadyVisit.length) {
				return new ApiException(
					403,
					`Unauthorized: You has a pending visit (finish the visit '${alreadyVisit[0].property.name}' first)`
				);
			}

			const visit = new Visit();
			visit.houmer_id = houmer_id;
			visit.property = property;
			visit.start_date = new Date();

			return await this.visitRepository.create(visit);
		} catch (err) {
			return new ApiException(400, err);
		}
	};

	end = async (visit_id: string, houmer_id: string) => {
		try {
			const visitFound = await this.visitRepository.getById(visit_id);
			if (visitFound instanceof Error) {
				return visitFound;
			}

			if (!visitFound) {
				return new ApiException(404, `Visit not found`);
			}

			if (visitFound.end_date) {
				return new ApiException(400, `Visit already has a end date`);
			}

			if (String(visitFound.houmer_id) !== houmer_id) {
				return new ApiException(
					403,
					"Unauthorized: The visit creator is not the current houmer"
				);
			}

			visitFound.end_date = new Date();

			return await this.visitRepository.update(visitFound);
		} catch (err) {
			return new ApiException(400, err);
		}
	};

	getByHoumerWithVisitDuration = async (houmer_id: string, query: any) => {
		const has_error = this.isValidGetQuery(query);
		if (has_error.length) {
			return new ApiException(400, has_error);
		}

		try {
			const datObj = new DateValue(query.day, "day");

			return await this.visitRepository.getByHoumer(
				houmer_id,
				datObj.value,
				true
			);
		} catch (err) {
			return new ApiException(400, err);
		}
	};

	getByHoumerWithMoveDuration = async (houmer_id: string, query: any) => {
		const has_error = this.isValidGetQuery(query);
		if (has_error.length) {
			return new ApiException(400, has_error);
		}

		try {
			const datObj = new DateValue(query.day, "day");

			const res = await this.visitRepository.getByHoumer(
				houmer_id,
				datObj.value,
				false
			);

			if (res instanceof Error) {
				return res;
			}

			const { min_speed } = query;

			//Map over the res array and filter to remove empty elements
			return res
				.map((visit, i) => {
					if (res.length > i + 1) {
						//Calculating linear distance with haversine method, between success visited properties per cronology order
						const distance = haversine(
							res[i].property.coordinates,
							res[i + 1].property.coordinates
						);

						//Calculating difference between same properties. Start date of the last visit with end date of the previous visit. In hours
						const date_diff =
							(res[i].start_date.getTime() - res[i + 1].end_date.getTime()) /
							60000 /
							60;

						//Calculate speed (distance in KM / time un hours = km/hrs)
						const speed = distance / date_diff;

						if (speed > min_speed || !speed) {
							return {
								property: visit.property,
								_id: visit._id,
								move_speed: speed
									? speed.toFixed(2) + " km/hrs"
									: "No speed (visit to same property or coordinates)",
							};
						}
					}
				})
				.filter((n) => n);
		} catch (err) {
			return new ApiException(400, err);
		}
	};

	private isValidCreateBody = (body: any): string[] => {
		const { property } = body;

		let error: string[] = [];
		!property && error.push("property can't be empty");

		return error;
	};

	private isValidGetQuery = (query: any): string[] => {
		const { day } = query;

		let error: string[] = [];
		!day &&
			error.push("day can't be empty and must be a date format (DD-MM-YYYY)");

		return error;
	};
}

export default VisitUseCases;
