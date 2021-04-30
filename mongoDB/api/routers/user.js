const { Router } = require("express");
const userController = require("../controllers/user");

const userRouter = Router();

userRouter.post("/", userController.validateCreateUser, userController.CreateUser);
userRouter.get("/", userController.getUsers);
userRouter.get("/:id", userController.getUserByID);
userRouter.put("/:id", userController.validateUpdateUser, userController.updateUser);
userRouter.delete("/:id", userController.deleteUserByID);

module.exports = userRouter;
