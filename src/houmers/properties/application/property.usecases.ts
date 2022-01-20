import ApiException from "../../../shared/exceptions/api.exception";
import Coordinates from "../../shared/domain/Coordinates";

import IPropertyRepository from "../domain/repository/iproperty.repository";
import Alphanumeric from "../../shared/domain/Alphanumeric";
import Property from "../domain/property";

class PropertyUseCases {
	propertyRepository: IPropertyRepository;

	constructor(propertyRepository: IPropertyRepository) {
		this.propertyRepository = propertyRepository;
	}

	create = async (body: any, houmer_id: string) => {
		const has_error = this.isValidCreateBody(body);
		if (has_error.length) {
			return new ApiException(400, has_error);
		}

		try {
			const name = new Alphanumeric(body.name, "name");
			const coordinates = new Coordinates(
				body.coordinates.latitude,
				body.coordinates.longitude
			);

			const property = new Property();
			property.coordinates = coordinates;
			property.name = name;
			property.houmer_id = houmer_id;

			return await this.propertyRepository.create(property);
		} catch (err) {
			return new ApiException(400, err);
		}
	};

	getByHoumer = async (houmer_id: string) => {
		try {
			return await this.propertyRepository.getByHoumer(houmer_id);
		} catch (err) {
			return new ApiException(400, err);
		}
	};

	private isValidCreateBody = (body: any): string[] => {
		const { name, coordinates } = body;

		let error: string[] = [];
		!name && error.push("name can't be empty");
		!coordinates &&
			error.push(
				"coordinates can't be empty and must be a object with latitude and longitude properties"
			);

		!coordinates?.longitude &&
			error.push("coordinates.longitude can't be empty and must be a number");
		!coordinates?.latitude &&
			error.push("coordinates.latitude can't be empty and must be a number");

		return error;
	};
}

export default PropertyUseCases;
