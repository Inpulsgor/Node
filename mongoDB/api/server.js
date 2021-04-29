const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const URL = process.env.MONGODB_URL;
const PORT = process.env.PORT;

/*
 * create server
 * init global middleware
 * init routes
 * init database
 * start listening
 */

module.exports = class UserServer {
	constructor() {
		this.server = null;
	};

	async start() {
		this.initServer();
		this.initMiddleware();
		this.initRoutes();
		await this.initDatabase();
		this.startListening();
	};

	initServer() {
		this.server = express();
	};

	initMiddleware() {
		this.server.use(express.json());
	};

	initRoutes() {

	};

	async initDatabase() {
		await mongoose.connect();
	};

	startListening() {
		this.server.listen(PORT, () => console.log("Server started listening on port", PORT));
	};
 }
