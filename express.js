const express = require("express");

const app = express();

app.get("/home", (request, response, next) => {
	return response.send({ answer: "here is your answer" });
});

app.listen(3000, () => {
	console.log("Listening port", 3000);
});
