const express = require("express");

const app = express();

app.use(express.json());

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

app.post("/home", (request, response, next) => {
	console.log(request.body);

	response.send(request.body);
});

app.listen(3000, () => {
	console.log("Listening port", 3000);
});
