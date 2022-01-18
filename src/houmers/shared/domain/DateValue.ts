/**
 * Date value-object
 *
 * Date validations
 *
 * @author Jorge Silva (e-jlillo)
 */

import isEmpty from "validator/lib/isEmpty.js";
import isDate from "validator/lib/isDate.js";
import moment from "moment";
import ApiException from "../../../shared/exceptions/api.exception";

class DateValue {
	public value: string;

	/**
	 * Constructor
	 * @param value value
	 * @param key key to show better error message (OPTIONAL)
	 */
	constructor(value: string, key?: string) {
		if (this.checkIsEmpty(value)) {
			throw new ApiException(400, `The ${key ? key : "value"} can't be empty`);
		}

		if (!this.checkIsDate(value)) {
			throw new ApiException(
				400,
				`The ${key ? key : "value"} is not a valid date (DD-MM-YYYY)`
			);
		}

		this.value = moment(value, "DD-MM-YYYY").format("YYYY-MM-DD");
	}

	/**
	 * Check if current value is empty
	 * @returns true if value is empty
	 */
	private checkIsEmpty(value: string): boolean {
		if (value === null || typeof value == "undefined") return true;

		return isEmpty(value + "");
	}

	/**
	 * Check if current value is a date
	 * @returns true if value is a valid date
	 */
	private checkIsDate(value: string): boolean {
		return isDate(value + "", { format: "DD-MM-YYYY", strictMode: true });
	}
}

export default DateValue;
