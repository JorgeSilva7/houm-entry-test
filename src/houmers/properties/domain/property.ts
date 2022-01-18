import Coordinates from "../../shared/domain/Coordinates";
import Alphanumeric from "../../shared/domain/Alphanumeric";

class Property {
	private _name: Alphanumeric;
	private _coordinates: Coordinates;
	private _houmer_id: string;

	public get name(): Alphanumeric {
		return this._name;
	}

	public set name(name: Alphanumeric) {
		this._name = name;
	}

	public get coordinates(): Coordinates {
		return this._coordinates;
	}

	public set coordinates(coordinates: Coordinates) {
		this._coordinates = coordinates;
	}

	public get houmer_id(): string {
		return this._houmer_id;
	}

	public set houmer_id(houmer_id: string) {
		this._houmer_id = houmer_id;
	}
}

export default Property;
