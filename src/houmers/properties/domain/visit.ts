import Houmer from "./houmer";
import Property from "./property";

class Visit {
	private _property: Property;
	private _date: Date;
	private _houmer: Houmer;

	public get property(): Property {
		return this._property;
	}

	public set property(property: Property) {
		this._property = property;
	}

	public get date(): Date {
		return this._date;
	}

	public set date(date: Date) {
		this._date = date;
	}

	public get houmer(): Houmer {
		return this._houmer;
	}

	public set houmer(houmer: Houmer) {
		this._houmer = houmer;
	}
}

export default Visit;
