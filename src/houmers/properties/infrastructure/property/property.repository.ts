/**
 * Property repository
 *
 * This class implements Property repository using Mongoose library with Schema (./property.schema.ts)
 *
 * @author Jorge Silva
 */

import IPropertyRepository from "../../domain/repository/iproperty.repository";
import Coordinates from "../../../shared/domain/Coordinates";
import Property from "../../domain/property";
import PropertySchema from "./property.schema";
import ApiException from "../../../../shared/exceptions/api.exception";
import Alphanumeric from "../../../shared/domain/Alphanumeric";
import { Types } from "mongoose";

class PropertyRepository implements IPropertyRepository {
	create(
		name: Alphanumeric,
		coordinates: Coordinates,
		houmer_id: string
	): Promise<boolean | Error> {
		return PropertySchema.create({
			name: name.value,
			coordinates: {
				latitude: coordinates.latitude.value,
				longitude: coordinates.longitude.value,
			},
			houmer_id: houmer_id,
		})
			.then((_res) => {
				return true;
			})
			.catch((err) => {
				return new ApiException(500, err);
			});
	}

	getByHoumer(id: string): Promise<Property[] | Error> {
		return PropertySchema.find({ houmer_id: id })
			.then(async (res) => {
				return res;
			})
			.catch((err) => {
				return new ApiException(404, err);
			});
	}
}

export default PropertyRepository;
