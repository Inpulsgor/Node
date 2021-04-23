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
		const user = await usersCollection.findOne({ _id: new ObjectID(userID) });

		return res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

/*
 * INIT
 */

const main = async () => {
	const server = express();
	const client = await MongoClient.connect(process.env.MONGODB_URL, {
    	useUnifiedTopology: true,
  	});

	db = client.db(process.env.DB_NAME);
	usersCollection = db.collection("users");

	server.use(express.json());
	server.post("/users", validateCreateUser, CreateUser);
	server.get("/users", getUsers);
	server.get("/users/:id", getUserByID);

	server.listen(process.env.PORT, () => console.log("Server listening on port", process.env.PORT));
}

main();
