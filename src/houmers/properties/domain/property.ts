import Coordinates from "../../shared/domain/Coordinates";
import Name from "../../shared/domain/Name";
import Houmer from "./houmer";

class Property {
	private _name: Name;
	private _coordinates: Coordinates;
	private _houmer: Houmer;

	public get name(): Name {
		return this._name;
	}

	public set name(name: Name) {
		this._name = name;
	}

	public get coordinates(): Coordinates {
		return this._coordinates;
	}

	public set coordinates(coordinates: Coordinates) {
		this._coordinates = coordinates;
	}

	public get houmer(): Houmer {
		return this._houmer;
	}

	public set houmer(houmer: Houmer) {
		this._houmer = houmer;
	}
}

export default Property;
