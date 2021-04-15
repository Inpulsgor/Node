const express = require('express');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const Joi = require("joi");

const baseUrl = "https://api.openweathermap.org";
// const url = "/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}";
const port = 3000;

const app = express();
dotenv.config();

/*
 * Helpers
 */

const validateQueryParams = (req, res, next) => {
  const schema = Joi.object({
    lat: Joi.string().required(),
    lon: Joi.string().required(),
  });

  const validationResult = schema.validate(req.query);

  if (validationResult.error)
    return res.status(400).send(validationResult.error);

  next();
};

const getWeather = async (req, res, next) => {
	const { lat, lon } = req.query;

	const response = await fetch(
    `${baseUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&lang=ua&appid=${process.env.WEATHER_API_KEY}`
  );

	const responseBody = await response.json();

	if (responseBody.status >= 400) {
		return res.status(responseBody.status).send(responseBody.statusText);
	}

	res.status(200).send(responseBody);
}

/*
 * Global middleware
 */

app.use(express.json());

/*
 * Requests
 */

app.get("/weather", validateQueryParams, getWeather);

/*
 * Listen port
 */

app.listen(port, () => console.log("Started listening on port", port));


