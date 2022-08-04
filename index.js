const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

let counter = 0;
const additionalCounter = {};

app.get("/counter", (req, res) => {
  res.json({ counter });
});

app.delete("/counter", (req, res) => {
  counter = 0;

  res.json({ counter });
});

app.post("/counter/increment", (req, res) => {
  counter++;

  res.status(201).json({ counter });
});

app.post("/counter/decrement", (req, res) => {
  counter--;

  res.status(201).json({ counter });
});

app.post("/counter/double", (req, res) => {
  counter *= 2;

  res.status(201).json({ counter });
});

// Extension 1
app.put("/counter", (req, res) => {
  if (req.query.value) {
    counter = Number(req.query.value);
  }
  res.status(201).json({ counter });
});

//Extension 2
app.get("/counter/:name", (req, res) => {
  console.log(req.params.name);

  if (!additionalCounter.hasOwnProperty(req.params.name)) {
    additionalCounter[req.params.name] = 0;
  }

  res.json({ counter: additionalCounter[req.params.name] });
});

app.delete("/counter/:name", (req, res) => {
  additionalCounter[req.params.name] = 0;

  res.json({ counter: additionalCounter[req.params.name] });
});

app.post("/counter/:name/increment", (req, res) => {
  additionalCounter[req.params.name] = additionalCounter[req.params.name] + 1;

  res.status(201).json({ counter: additionalCounter[req.params.name] });
});

app.post("/counter/:name/decrement", (req, res) => {
  additionalCounter[req.params.name] = additionalCounter[req.params.name] - 1;

  res.status(201).json({ counter: additionalCounter[req.params.name] });
});

app.post("/counter/:name/double", (req, res) => {
  additionalCounter[req.params.name] = additionalCounter[req.params.name] * 2;

  res.status(201).json({ counter: additionalCounter[req.params.name] });
});

const port = 3030;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
