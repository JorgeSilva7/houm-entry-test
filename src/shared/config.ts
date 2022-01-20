/**
 * Config or "Constants" file. This is a reflection (but in code) of .env or docker-compose environments section
 */

const DB_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
const SECRET_JWT = process.env.SECRET_JWT || "SECRET_JWT";

const SWAGGER_OPTIONS = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Houm entry test",
			version: "0.1.0",
			description: "",
			contact: {
				name: "Jorge Silva",
				email: "jorge.silva6956@gmail.com",
			},
		},
		servers: [
			{
				url: `http://localhost:${PORT}`,
			},
		],
	},
	apis: ["./src/shared/swagger/*.swagger.yml"],
};

export { DB_URI, PORT, SWAGGER_OPTIONS, SECRET_JWT };
