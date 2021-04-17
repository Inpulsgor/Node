const express = require("express");

const userRouter = express.Router();
const userController = require("./user.controller");

/*
 * ----------------------------------------------------------------
 *                              CRUD
 * ----------------------------------------------------------------
 */

/*
 * CREATE --> [C]RUD
 */

userRouter.post("/", userController.validateCreateUser, userController.createUser);

/*
 * READ --> C[R]UD
 */

userRouter.get("/", userController.getUsers);

/*
 * UPDATE --> CR[U]D
 */

userRouter.put("/:id", userController.validateUpdateUser, userController.updateUser);

/*
 * DELETE --> CRU[D]
 */

module.exports = userRouter;
