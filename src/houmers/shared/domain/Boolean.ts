/**
 * Alphanumeric Value-object
 *
 * String value with basic validations
 *
 * @author Jorge Silva (e-jlillo)
 */

import { isEmpty, isBoolean } from "validator";

class Boolean {
	public value: string;

	/**
	 * Constructor
	 * @param value string value
	 * @param key key to show better error message (OPTIONAL)
	 */
	constructor(value: string, key?: string) {
		this.value = value;

		if (this.checkIsEmpty()) {
			throw new Error(`The ${key ? key : "value"} can't be empty`);
		}

		this.stringToBoolean();

		if (!this.validateBoolean()) {
			throw new Error(`The ${key ? key : "value"} is not a valid boolean`);
		}
	}

	/**
	 * String to boolean string
	 * @returns string
	 */
	private stringToBoolean() {
		const trueStrings = ["yes", "success", "true", "t", "y"];
		const falsetrings = ["no", "failed", "false", "f", "n"];
		if (trueStrings.includes(this.value.toLowerCase())) {
			this.value = "true";
		} else {
			this.value = falsetrings.includes(this.value.toLowerCase())
				? "false"
				: "";
		}
	}

	/**
	 * Check if current value is an Ascii
	 * @returns true if value has the correct ascii format
	 */
	private validateBoolean() {
		return isBoolean(this.value + "");
	}

	/**
	 * Check if current value is empty
	 * @returns true if value is empty
	 */
	private checkIsEmpty(): boolean {
		return isEmpty(this.value + "");
	}
}

export default Boolean;
