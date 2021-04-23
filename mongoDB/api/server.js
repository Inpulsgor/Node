const express = require("express");
const Joi = require("joi");
const { MongoClient } = require("mongodb");
require('dotenv').config();

const PORT = process.env.PORT;


const validateCreateUser = (req, res, next) => {
	const schema = Joi.object({
		username: Joi.string().required(),
		email: Joi.string().required(),
		password: Joi.string().required()
	});

	const result = schema.valid(req.body);

	if(result.error) return res.status(400).send(result.error);

	next();
};

const CreateUser = (req, res, next) => {};

const main = async() => {
	const server = express();
	const client = await MongoClient.connect(process.env.MONGODB_URL);
	const db = client.db(process.env.DB_NAME);
	const users = db.collection("users");

	server.post("/users", )

	server.listen(PORT, () =>
    console.log("Server listening on port", PORT)
  );
}

main();
