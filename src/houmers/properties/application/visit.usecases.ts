class VisitUseCases {
	constructor() {}

	create = (body: any): Promise<boolean | Error> => {
		return null;
	};

	getByHoumer = (houmer_id: string, query: any): Promise<string | Error> => {
		return null;
	};

	private validateCreateBody = (body: any): boolean => {
		return true;
	};
}

export default VisitUseCases;
