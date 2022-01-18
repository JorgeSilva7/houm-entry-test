import Numeric from "./Numeric";

class Coordinates {
	public latitude: Numeric;
	public longitude: Numeric;

	constructor(latitude: number, longitude: number) {
		this.latitude = new Numeric(latitude, "latitude");
		this.longitude = new Numeric(longitude, "longitude");
	}
}

export default Coordinates;
