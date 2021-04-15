const express = require('express');
const app = express();
const port = 3000;

// Global middleware
app.use(express.json());

// Requests
app.get(
  "/weather",
  (req, res, next) => {
	
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
