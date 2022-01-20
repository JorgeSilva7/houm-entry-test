import Alphanumeric from "../../shared/domain/Alphanumeric";
import Name from "../../shared/domain/Name";

class Houmer {
	public _id: any;
	private _name: Name;
	private _lastName: Name;
	private _username: Alphanumeric;
	private _password: string;

	public set name(name: Name) {
		this._name = name;
	}

	public set lastName(lastName: Name) {
		this._lastName = lastName;
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
