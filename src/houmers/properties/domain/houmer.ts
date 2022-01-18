import Alphanumeric from "../../shared/domain/Alphanumeric";
import Name from "../../shared/domain/Name";
import bcrypt from "bcrypt";

class Houmer {
	public _id: any;
	private _name: Name;
	private _lastName: Name;
	private _token: string;
	private _username: Alphanumeric;
	private _password: string;

	public get name(): Name {
		return this._name;
	}

	public set name(name: Name) {
		this._name = name;
	}

	public get lastName(): Name {
		return this._lastName;
	}

	public set lastName(lastName: Name) {
		this._lastName = lastName;
	}

	public get token(): string {
		return this._token;
	}

	public set token(token: string) {
		this._token = token;
	}

	public get username(): Alphanumeric {
		return this._username;
	}

	public set username(username: Alphanumeric) {
		this._username = username;
	}

	public get password(): string {
		return this._password;
	}

	public set password(password: string) {
		this._password = password;
	}
}

export default Houmer;
