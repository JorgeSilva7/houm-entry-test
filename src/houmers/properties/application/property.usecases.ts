import ApiException from "../../../shared/exceptions/api.exception";
import Name from "../../shared/domain/Name";
import Coordinates from "../../shared/domain/Coordinates";

import IPropertyRepository from "../domain/repository/iproperty.repository";
import Property from "../domain/property";
import Alphanumeric from "../../shared/domain/Alphanumeric";

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

			return await this.propertyRepository.create(name, coordinates, houmer_id);
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
