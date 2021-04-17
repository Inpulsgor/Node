const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRouter = require('./users/user.router');

module.exports = class UserServer {
  constructor() {
    this.server = null;
  }

  start() {
    this.initServer();
    this.initMiddleware();
    this.initRoutes();
	this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddleware() {
    this.server.use(express.json());
    this.server.use(cors({ origin: "https://localhost:3000" }));
  }

  initRoutes() {
	this.server.use("/users", userRouter);
  };

  startListening() {
	  this.server.listen(process.env.PORT, () => console.log("Started listening on port " + process.env.PORT));
  };
};
