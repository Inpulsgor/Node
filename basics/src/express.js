const express = require("express");
const app = express();

/*
 * Global middleware
 * applies on each request
 */

app.use(express.json()); // JSON parse on request body
app.use(express.urlencoded());
app.use("/public", express.static("public")); // returns public folder data

/*
 * method:  "GET"
 * path:    "/"
 */

app.get("/", (request, response, next) => {
	response.set("Content-Type", "application/json");
	response.status(205).send({ hello: "amigo" });
	// response.set("Set-Cookie", "some=value");
	// request.headers
	// request.get('Accept')

	// const error = new Error();
	// error.status = 400;
	// next(error);
	});

/*
 * method:  "POST"
 * path:    "/"
 */

app.post(
  "/",
  (request, response, next) => {
	  next(); // goes to next middleware
  },
  (request, response) => {
    console.log(request.body);
    response.send(request.body);
  }
);

/*
 * method:  "GET"
 * path:    "/login"
 */

app.post("/login", (request, response, next) => {
	console.log(request.body);
	return response.send("Request was successfully handled");
});

/*
 * middleware
 * обробки помилок
 */

app.use((error, request, response, next) => {
	delete error.stack;

	next(error);
});

/*
 * listen
 * port: 3002
 */

app.listen(3002, () => {
	console.log("Listening port", 3002);
});
