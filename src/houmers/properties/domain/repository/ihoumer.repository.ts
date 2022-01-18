import Alphanumeric from "../../../shared/domain/Alphanumeric";
import Name from "../../../shared/domain/Name";
import Houmer from "../houmer";

interface IHoumerRepository {
	login(username: Alphanumeric, password: string): Promise<Houmer | Error>;
	register(
		name: Name,
		lastName: Name,
		username: Alphanumeric,
		password: string
	): Promise<boolean | Error>;
}

export default IHoumerRepository;
