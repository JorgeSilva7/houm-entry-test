import Coordinates from "../../shared/domain/Coordinates";
import Houmer from "./houmer";
import Property from "./property";

class Move {
	private _start_coordinates: Coordinates;
	private _property_destination: Property;
	private _start_date: Date;
	private _end_date: Date;
	private _houmer: Houmer;

	public get start_coordinates(): Coordinates {
		return this._start_coordinates;
	}

	public set start_coordinates(start_coordinates: Coordinates) {
		this._start_coordinates = start_coordinates;
	}

	public get property_destination(): Property {
		return this._property_destination;
	}

	public set property_destination(property_destination: Property) {
		this._property_destination = property_destination;
	}

	public get start_date(): Date {
		return this._start_date;
	}

	public set start_date(start_date: Date) {
		this._start_date = start_date;
	}

	public get end_date(): Date {
		return this._end_date;
	}

	public set end_date(end_date: Date) {
		this._end_date = end_date;
	}

	public get houmer(): Houmer {
		return this._houmer;
	}

	public set houmer(houmer: Houmer) {
		this._houmer = houmer;
	}
}

export default Move;
