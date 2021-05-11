const express = require("express");
const Joi = require("joi");
const { MongoClient, ObjectID } = require("mongodb");
require('dotenv').config();

let db, usersCollection;

/*
 * CREATE
 */

const validateCreateUser = (req, res, next) => {
	const validationSchema = Joi.object({
		username: Joi.string().required(),
		email: Joi.string().required(),
		password: Joi.string().required()
	});

	const validationResult = validationSchema.validate(req.body);

	if(validationResult.error) return res.status(400).send(validationResult.error);

	next();
};

const CreateUser = async (req, res, next) => {
	try {
		const newUser = await usersCollection.insert(req.body);
		return res.status(201).json(newUser.ops);
	} catch(error) {
		next(error);
	}
};

/*
 * READ
 */

const getUsers = async (req, res, next) => {
	try {
		const users = await usersCollection.find().toArray();
		return res.status(200).json(users);
	} catch(error) {
		next(error);
	}
}

const getUserByID = async (req, res, next) => {
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

/*
 * UPDATE
 */

const validateUpdateUser = (req, res, next) => {
  const validationSchema = Joi.object({
    username: Joi.string(),
    email: Joi.string(),
    password: Joi.string()
  });

  const validationResult = validationSchema.validate(req.body);

  if (validationResult.error) return res.status(400).send(validationResult.error);

  next();
};

const updateUser = async (req, res, next) => {
	try {
		const userID = req.params.id;

		if (!ObjectID.isValid(userID)) return res.status(404).send(); // if ObjectID is not valid - return 404

		const updateResult = await usersCollection.updateOne({ _id: new ObjectID(userID) }, { $set: req.body });

		if (!updateResult.modifiedCount) return res.status(404).send();

		return res.status(204).send();
	} catch (error) {
		next(error);
	}
};

/*
 * DELETE
 */

const deleteUserByID = async (req, res, next) => {
	try {
		const userID = req.params.id;

		if (!ObjectID.isValid(userID)) return res.status(404).send(); // if ObjectID is not valid - return 404

		const deleteResult = await usersCollection.deleteOne({ _id: new ObjectID(userID) });

		if (!deleteResult.deletedCount) return res.status(404).send();

		return res.status(204).send();
	} catch (error) {
		next(error);
	}
}

/*
 * INIT
 */

const main = async () => {
	const server = express();
	const client = await MongoClient.connect(process.env.MONGODB_URL, {useUnifiedTopology: true});

	db = client.db(process.env.DB_NAME);
	usersCollection = db.collection("users");

	server.use(express.json());

	server.post("/users", validateCreateUser, CreateUser);
	server.get("/users", getUsers);
	server.get("/users/:id", getUserByID);
	server.put("/users/:id", validateUpdateUser, updateUser);
	server.delete("/users/:id", deleteUserByID);

	server.listen(process.env.PORT, () => console.log("Server listening on port", process.env.PORT));
}

main();
