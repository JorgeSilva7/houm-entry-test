/**
 * Property repository
 *
 * This class implements Property repository using Mongoose library with Schema (./property.schema.ts)
 *
 * @author Jorge Silva
 */

import IPropertyRepository from "../../domain/repository/iproperty.repository";
import Property from "../../domain/property";
import PropertySchema from "./property.schema";
import ApiException from "../../../../shared/exceptions/api.exception";

class PropertyRepository implements IPropertyRepository {
	getById(id: string): Promise<Property | Error> {
		return PropertySchema.findById(id)
			.then(async (res) => {
				return res;
			})
			.catch((err) => {
				return new ApiException(404, err);
			});
	}

	create(property: Property): Promise<boolean | Error> {
		return PropertySchema.create({
			name: property.name.value,
			coordinates: {
				latitude: property.coordinates.latitude.value,
				longitude: property.coordinates.longitude.value,
			},
			houmer_id: property.houmer_id,
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
