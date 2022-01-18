/**
 * Client Router
 *
 * This file contains a specification of all routes on the /clientes path. In fact: Create
 *
 * @author Jorge Silva (e-jlillo)
 */
import express from "express";
import ClientController from "./client.controller";

class ClientRouter {
	public path = "/";
	public router = express.Router();
	private clientController: ClientController;

	constructor() {
		this.clientController = new ClientController();

		this.router.post(`${this.path}`, this.clientController.manage);
	}
}

export default ClientRouter;
