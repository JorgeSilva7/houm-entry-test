import Visit from "../visit";

interface IVisitRepository {
	getById(id: string): Promise<Visit | Error>;

	create(visit: Visit): Promise<Visit | Error>;

	update(visit: Visit): Promise<boolean | Error>;

	getByHoumer(
		houmer_id: string,
		day: string,
		withDuration: boolean
	): Promise<Visit[] | Error>;
}

export default IVisitRepository;
