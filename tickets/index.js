const express = require('express');
const Joi = require('joi');

const app = express();
const port = 3000;

// Global middleware
app.use(express.json());

// Requests
app.get(
  "/weather",
  (req, res, next) => {
	const schema = Joi.object({
		lat: Joi.string().required(),
		lon: Joi.string().required()
	});

	const validationResult = schema.validate(req.query);

	if (validationResult.error) return res.status(400).send(validationResult.error);

	next();
  },
  (req, res, next) => {
    // console.log("body", req.body);
    console.log("query", req.query);

    res.json({ weather: "send" });
  }
);

// Listen port
app.listen(port, () => {
	console.log("Started listening on port", port);
});
