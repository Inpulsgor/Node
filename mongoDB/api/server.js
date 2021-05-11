const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routers/user");

require("dotenv").config();

/*
 * -- start()           --> create server;
 * -- initMiddleware()  --> init global middleware;
 * -- initRoutes()      --> init routes
 * -- initDatabase()    --> init database
 * -- startListening()  --> start listening
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
		this.server.use("/users", userRouter);
	};

	async initDatabase() {
		await mongoose.connect(process.env.MONGODB_URL,
	{
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
	};

	startListening() {
		const PORT = process.env.PORT;
		this.server.listen(PORT, () => console.log("Server started listening on port", PORT));
	};
 }
