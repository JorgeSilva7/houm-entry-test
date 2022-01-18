import Alphanumeric from "../../../shared/domain/Alphanumeric";
import Coordinates from "../../../shared/domain/Coordinates";
import Property from "../property";

interface IPropertyRepository {
	create(
		name: Alphanumeric,
		coordinates: Coordinates,
		houmer_id: string
	): Promise<boolean | Error>;

	getByHoumer(houmer_id: string): Promise<Property[] | Error>;
}

export default IPropertyRepository;
