import Property from "./property";

class Visit {
	public _id: any;
	private _property: Property;
	private _start_date: Date;
	private _end_date: Date;
	private _houmer_id: string;

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

	public get houmer_id(): string {
		return this._houmer_id;
	}

	public set houmer_id(houmer_id: string) {
		this._houmer_id = houmer_id;
	}
}

export default Visit;
