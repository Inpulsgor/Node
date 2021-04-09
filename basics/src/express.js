const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));

/*
 * GET /home
 */

app.get(
	"/home",
	(request, response, next) => {
		response.set("Set-Cookie", "some=value");

		const error = new Error();
		error.status = 400;

		next(error);
	},
	(request, response, next) => {
		return response.send({ answer: "here is your answer" });
	}
);

/*
 * POST /home
 */

app.post("/home", (request, response, next) => {
	console.log(request.body);

	response.send(request.body);
});

/*
 * POST /login
 */

app.post("/login", (request, response, next) => {
	console.log(request.body);

	return response.send("Request was successfully handled");
});

/*
 * middleware обробки помилок
 */

app.use((error, request, response, next) => {
	delete error.stack;

	next(error);
});

app.listen(3002, () => {
	console.log("Listening port", 3002);
});
