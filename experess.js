const express = require("express");

const app = express();

app.get("/home", (request, response, next) => {
  response.send({ answer: "hello there" });
});

app.listen(3000, () => {
  console.log("Listening port", 3000);
});
