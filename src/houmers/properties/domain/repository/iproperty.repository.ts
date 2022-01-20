import Property from "../property";

interface IPropertyRepository {
	create(property: Property): Promise<boolean | Error>;

	getByHoumer(houmer_id: string): Promise<Property[] | Error>;

	getById(id: string): Promise<Property | Error>;
}

export default IPropertyRepository;
