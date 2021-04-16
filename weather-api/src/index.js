const express = require('express');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const cors = require('cors');
const Joi = require("joi");

const url = "https://api.openweathermap.org";
const port = 3000;

const app = express();
dotenv.config(); // allows - process.env

/*
 * ------------------------
 * --> Methods
 * ------------------------
 */

// Validate query params
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

// Fetch weather
const getWeather = async (req, res, next) => {
	const { lat, lon } = req.query;

	const response = await fetch(
    `${url}/data/2.5/weather?lat=${lat}&lon=${lon}&lang=ua&appid=${process.env.WEATHER_API_KEY}`
  );

	const responseBody = await response.json();

	if (responseBody.status >= 400) {
		return res.status(responseBody.status).send(responseBody.statusText);
	}

	res.status(200).send(responseBody);
}

// CORS origin
const addAllowOriginHeader = (req, res, next) => {
	res.set("Access-Control-Allow-Origin", "http://localhost:3000");
	next();
}

// CORS headers
const addCorsHeaders = (req, res, next) => {
	res.set("Access-Control-Allow-Methods", req.headers["access-control-request-method"]);
	res.set("Access-Control-Allow-Headers", req.headers["access-control-request-headers"]);

	res.status(200).send();
};

/*
 * ------------------------
 * --> Global middleware
 * ------------------------
 */

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" })); // same as below
// app.use(addAllowOriginHeader);
// app.options("*", addCorsHeaders);

/*
 * ------------------------
 * --> Requests
 * ------------------------
 */

app.get("/weather", validateQueryParams, getWeather);

/*
 * ------------------------
 * --> Listen port
 * ------------------------
 */

app.listen(port, () => console.log("Started listening on port", port));


