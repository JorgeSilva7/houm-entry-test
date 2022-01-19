/**
 * Property repository
 *
 * This class implements Property repository using Mongoose library with Schema (./property.schema.ts)
 *
 * @author Jorge Silva
 */

import IVisitRepository from "../../domain/repository/ivisit.repository";
import VisitSchema from "./visit.schema";
import ApiException from "../../../../shared/exceptions/api.exception";
import Visit from "../../domain/visit";
import moment from "moment";
import { Types } from "mongoose";
import { millisToMinutesAndSeconds } from "../../../../shared/utils/functions";

class VisitRepository implements IVisitRepository {
	getById(id: string): Promise<Visit | Error> {
		return VisitSchema.findById(id)
			.then(async (res) => {
				return res;
			})
			.catch((err) => {
				return new ApiException(404, err);
			});
	}

	create(visit: Visit): Promise<Visit | Error> {
		return VisitSchema.create({
			property: visit.property._id,
			start_date: visit.start_date,
			houmer_id: visit.houmer_id,
		})
			.then((_res) => {
				return _res;
			})
			.catch((err) => {
				return new ApiException(500, err);
			});
	}

	update(visit: Visit): Promise<boolean | Error> {
		return VisitSchema.findByIdAndUpdate(visit._id, {
			end_date: visit.end_date,
		})
			.then((_res) => {
				return true;
			})
			.catch((err) => {
				return new ApiException(500, err);
			});
	}

	async getByHoumer(
		id: string,
		day: string,
		withDuration: boolean
	): Promise<Visit[] | Error> {
		let query = {
			houmer_id: new Types.ObjectId(id),
			end_date: null,
		};
		if (day) {
			query["end_date"] = {
				$lt: moment(day, "YYYY-MM-DD")
					.add(1, "day")
					.subtract(1, "millisecond")
					.toDate(),
				$gt: new Date(day),
			};
		}

		if (withDuration) {
			const resAggr = await VisitSchema.aggregate([
				{
					$match: query,
				},
			])
				.addFields({
					visit_duration: {
						$function: {
							body: millisToMinutesAndSeconds,
							args: [{ $subtract: ["$end_date", "$start_date"] }],
							lang: "js",
						},
					},
				})
				.then((res) => {
					return res;
				})
				.catch((err) => {
					return new ApiException(404, err);
				});
			return VisitSchema.populate(resAggr, { path: "property" })
				.then((res) => {
					return res;
				})
				.catch((err) => {
					return new ApiException(404, err);
				});
		} else {
			return VisitSchema.find(query)
				.populate("property")
				.sort("-end_date")
				.then((res) => {
					return res;
				})
				.catch((err) => {
					return new ApiException(404, err);
				});
		}
	}
}

export default VisitRepository;
