const Joi = require("joi");
const userModel = require("../models/user");

class UserController {
  async CreateUser(req, res, next) {
	try {
		const user = await userModel.create(req.body);

		return res.status(201).json(user);
	} catch (error) {
		next(error);
	};
  };

  getUsers(req, res, next) {

  };

  getUserByID(req, res, next) {

  };

  updateUser(req, res, next) {

  };

  deleteUserByID(req, res, next) {

  };

  validateCreateUser(req, res, next) {
    const validationSchema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    const validationResult = validationSchema.validate(req.body);

    if (validationResult.error)
      return res.status(400).send(validationResult.error);

    next();
  };

  validateUpdateUser(req, res, next) {

  };
}

module.exports = new UserController();
