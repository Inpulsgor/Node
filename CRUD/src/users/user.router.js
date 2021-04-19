const express = require("express");

const userRouter = express.Router();
const userController = require("./user.controller");

// CREATE
userRouter.post("/", userController.validateCreateUser, userController.createUser);
// READ
userRouter.get("/", userController.getUsers);
// UPDATE
userRouter.put("/:id", userController.validateUpdateUser, userController.updateUser);
// DELETE
userRouter.delete("/:id", userController.deleteUser);


module.exports = userRouter;
