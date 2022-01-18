/**
 * Name Value-object
 *
 * @author Jorge Silva (e-jlillo)
 */

import isEmpty from "validator/lib/isEmpty.js";
import isAlpha from "validator/lib/isAlpha.js";
import ApiException from "../../../shared/exceptions/api.exception";

class Name {
	public value: string;

	/**
	 * Constructor
	 * @param value value
	 * @param key key to show better error message (OPTIONAL)
	 */
	constructor(value: string, key?: string) {
		this.value = value;

		if (this.checkIsEmpty()) {
			throw new ApiException(400, `The ${key ? key : "value"} can't be empty`);
		}

		if (!this.validateIsAlpha()) {
			throw new ApiException(
				400,
				`The ${key ? key : "value"} is not a alpha string`
			);
		}
	}

	/**
	 * Check if current value is a string
	 * @returns true if value is a string
	 */
	private validateIsAlpha(): boolean {
		return isAlpha(this.value + "", "es-ES", { ignore: " " });
	}

	/**
	 * Check if current value is empty
	 * @returns true if value is empty
	 */
	private checkIsEmpty(): boolean {
		return this?.value ? isEmpty(this.value + "") : true;
	}
}

export default Name;
