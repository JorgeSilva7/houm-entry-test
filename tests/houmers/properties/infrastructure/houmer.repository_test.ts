import Houmer from "../../../../src/houmers/properties/domain/houmer";
import IHoumerRepository from "../../../../src/houmers/properties/domain/repository/ihoumer.repository";
import Alphanumeric from "../../../../src/houmers/shared/domain/Alphanumeric";
import Name from "../../../../src/houmers/shared/domain/Name";

class HoumerRepositoryTest implements IHoumerRepository {
	data: Houmer[] = [];

	async login(
		username: Alphanumeric,
		password: string
	): Promise<Houmer | Error> {
		const found = this.data.find(
			(houmer) =>
				houmer.username.value == username.value && houmer.password == password
		);

		if (!found) {
			return new Error("Error on login");
		}

		return found;
	}

	async register(
		name: Name,
		lastName: Name,
		username: Alphanumeric,
		password: string
	): Promise<boolean | Error> {
		const houmer = new Houmer();
		houmer.name = name;
		houmer.lastName = lastName;
		houmer.username = username;
		houmer.password = password;

		const usernameFound = this.data.some(
			(hm) => houmer.username.value == hm.username.value
		);
		if (usernameFound) {
			return new Error("Username already exists");
		}

		this.data.push(houmer);
		return await true;
	}
}

export default HoumerRepositoryTest;
