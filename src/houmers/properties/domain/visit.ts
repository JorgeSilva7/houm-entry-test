import Houmer from "./houmer";
import Property from "./property";

class Visit {
	private _property: Property;
	private _start_date: Date;
	private _end_date: Date;
	private _houmer: Houmer;

	public get property(): Property {
		return this._property;
	}

	public set property(property: Property) {
		this._property = property;
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

export default Visit;
