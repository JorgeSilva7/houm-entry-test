import Property from "../../../../src/houmers/properties/domain/property";
import IPropertyRepository from "../../../../src/houmers/properties/domain/repository/iproperty.repository";

class PropertyRepositoryTest implements IPropertyRepository {
	data: Property[] = [];

	async getById(id: string): Promise<Property | Error> {
		const found = this.data.find((property) => property._id == id);

		if (!found) {
			return new Error("Error");
		}

		return found;
	}

	async create(property: Property): Promise<boolean | Error> {
		const propertyObj = new Property();
		propertyObj._id = property.name.value;
		propertyObj.name = property.name;
		propertyObj.coordinates = {
			latitude: property.coordinates.latitude,
			longitude: property.coordinates.longitude,
		};
		propertyObj.houmer_id = property.houmer_id;

		this.data.push(propertyObj);
		return await true;
	}

	async getByHoumer(id: string): Promise<Property[] | Error> {
		const found = this.data.filter((property) => property.houmer_id == id);

		if (!found) {
			return new Error("Error on login");
		}

		return found;
	}
}

export default PropertyRepositoryTest;
