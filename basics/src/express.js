const express = require("express");
const app = express();

// --> applies to each request
app.use(express.json()); // JSON parse on request body
app.use(express.urlencoded());
app.use(express.static("public"));

// --> GET /
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

// --> POST /
app.post("/", () => {

}, (request, response, next) => {
	console.log(request.body);
	response.send(request.body);
});

// --> POST /login
app.post("/login", (request, response, next) => {
	console.log(request.body);
	return response.send("Request was successfully handled");
});

/*
 * --> middleware обробки помилок
 */

// app.use((error, request, response, next) => {
// 	delete error.stack;

// 	next(error);
// });

/*
 * --> Listen port 3002
 */

app.listen(3002, () => {
	console.log("Listening port", 3002);
});
