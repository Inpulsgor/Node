const express = require("express");

const userRouter = express.Router();
const userController = require("./user.controller");

userRouter.get("/", userController.getUsers);
userRouter.post(
	"/",
	userController.validateCreateUser,
	userController.createUser
);

module.exports = userRouter;
