import Numeric from "../../houmers/shared/domain/Numeric";

const paginationOptions = (query: any) => {
	let page: number = query["page"] || 1;
	const voPage = new Numeric(page, "page");
	page = voPage.value < 1 ? 1 : voPage.value;

	let limit: number = query["limit"] || 10;
	const voPerPage = new Numeric(limit, "limit");
	limit = voPerPage.value < 1 ? 1 : voPerPage.value;

	return { page, limit };
};

const paginationMetadata = async (
	response: Object,
	dbCountFunction: Function,
	page: number,
	limit: number
) => {
	const count = await dbCountFunction();

	const metadata = {
		page: Number(page),
		per_page: Number(limit),
		page_count: Math.max(1, Math.round(count / limit)),
		total_count: count,
	};
	response["metadata"] = metadata;
	return response;
};

function millisToMinutesAndSeconds(millis) {
	const minutes = Math.floor(millis / 60000);
	const seconds = Number(((millis % 60000) / 1000).toFixed(0));

	let stringRes = "";
	if (minutes) {
		stringRes = `${minutes} minutes and `;
	}
	if (seconds) {
		stringRes += `${seconds < 10 ? "0" : ""}${seconds} seconds`;
	}

	return stringRes;
}

const asyncForEach = async (array, callback) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
};

export {
	paginationOptions,
	paginationMetadata,
	millisToMinutesAndSeconds,
	asyncForEach,
};
