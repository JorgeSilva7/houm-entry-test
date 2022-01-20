/**
 * Api Exception
 *
 *
 * Exception class with Code status and Message error
 *
 */
class ApiException extends Error {
	status: number;
	message: any;
	constructor(status: number, message: any) {
		super(message);
		this.status = status;
		this.message = message.stack ? message.stack : message;
	}
}

export default ApiException;
