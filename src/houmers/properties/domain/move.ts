import Coordinates from "../../shared/domain/Coordinates";
import Property from "./property";

class Move {
	public _id: any;
	private _start_coordinates: Coordinates;
	private _property_destination: Property;
	private _start_date: Date;
	private _end_date: Date;
	private _houmer_id: string;

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

	public get houmer_id(): string {
		return this._houmer_id;
	}

	public set houmer_id(houmer_id: string) {
		this._houmer_id = houmer_id;
	}
}

export default Move;
