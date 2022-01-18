/**
 * Alphanumeric Value-object
 *
 * String value with basic validations (Only numbers and letters [a-zA-Z0-9])
 *
 * @author Jorge Silva (e-jlillo)
 */

import isEmpty from "validator/lib/isEmpty.js";
import isAlphanumeric from "validator/lib/isAlphanumeric.js";
import ApiException from "../../../shared/exceptions/api.exception";

class Alphanumeric {
	public value: string | number;

	/**
	 * Constructor
	 * @param value string value
	 * @param key key to show better error message (OPTIONAL)
	 */
	constructor(value: string, key?: string) {
		this.value = value;

		if (this.checkIsEmpty()) {
			throw new ApiException(400, `The ${key ? key : "value"} can't be empty`);
		}

		if (!this.validateIsAlphanumeric()) {
			throw new ApiException(
				400,
				`The ${key ? key : "value"} is not an alphanumeric`
			);
		}
	}

	/**
	 * Check if current value is a alphanumeric
	 * @returns true if value is a alphanumeric
	 */
	private validateIsAlphanumeric() {
		return isAlphanumeric(this.value + "", "es-ES", { ignore: " " });
	}

	/**
	 * Check if current value is empty
	 * @returns true if value is empty
	 */
	private checkIsEmpty(): boolean {
		if (this.value !== 0) {
			return this?.value ? isEmpty(this.value + "") : true;
		}
		return false;
	}
}

export default Alphanumeric;
