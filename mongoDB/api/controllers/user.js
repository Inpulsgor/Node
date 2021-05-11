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
	try {
		const users = await userModel.find().toArray();
		return res.status(200).json(users);
	} catch(error) {
		next(error);
	}
  };

  getUserByID(req, res, next) {
	try {
		const userID = req.params.id;

		if (!ObjectID.isValid(userID)) return res.status(404).send(); // if ObjectID is not valid - return 404

		const user = await usersCollection.findOne({ _id: new ObjectID(userID) });

		if (!user) return res.status(404).send(); // if user with current ID not found - return 404

		return res.status(200).json(user);
	} catch (error) {
		next(error);
	}
  };

  updateUser(req, res, next) {
	try {
		const userID = req.params.id;

		if (!ObjectID.isValid(userID)) return res.status(404).send(); // if ObjectID is not valid - return 404

		const updateResult = await usersCollection.updateOne(
			{ _id: new ObjectID(userID) },
			{ $set: req.body }
		);

		if (!updateResult.modifiedCount) return res.status(404).send();

		return res.status(204).send();
	} catch (error) {
		next(error);
	}
  };

  deleteUserByID(req, res, next) {
	try {
		const userID = req.params.id;

		if (!ObjectID.isValid(userID)) return res.status(404).send(); // if ObjectID is not valid - return 404

		const deleteResult = await usersCollection.deleteOne({
		_id: new ObjectID(userID),
		});

		if (!deleteResult.deletedCount) return res.status(404).send();

		return res.status(204).send();
	} catch (error) {
		next(error);
	}
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
	const validationSchema = Joi.object({
		username: Joi.string(),
		email: Joi.string(),
		password: Joi.string(),
	});

	const validationResult = validationSchema.validate(req.body);

	if (validationResult.error) {
		return res.status(400).send(validationResult.error);
	}

	next();
  };
}

module.exports = new UserController();
