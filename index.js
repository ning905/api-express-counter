const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// let counter = 0;
const counters = { counter: 0 };

app.get("/counter", (req, res) => {
  res.json({ counter: counters.counter });
});

app.delete("/counter", (req, res) => {
  counters.counter = 0;

  res.json({ counter: counters.counter });
});

app.post("/counter/increment", (req, res) => {
  counters.counter = counters.counter + 1;

  res.status(201).json({ counter: counters.counter });
});

app.post("/counter/decrement", (req, res) => {
  counters.counter = counters.counter - 1;

  res.status(201).json({ counter: counters.counter });
});

app.post("/counter/double", (req, res) => {
  counters.counter = counters.counter * 2;

  res.status(201).json({ counter: counters.counter });
});

// Extension 1
app.put("/counter", (req, res) => {
  if (req.query.value) {
    counters.counter = Number(req.query.value);
  }
  res.status(201).json({ counter: counters.counter });
});

//Extension 2
app.get("/counter/:name", (req, res) => {
  console.log(req.params.name);

  if (!counters.hasOwnProperty(req.params.name)) {
    counters[req.params.name] = 0;
  }

  res.json({ counter: counters[req.params.name] });
});

app.delete("/counter/:name", (req, res) => {
  counters[req.params.name] = 0;

  res.json({ counter: counters[req.params.name] });
});

app.post("/counter/:name/increment", (req, res) => {
  counters[req.params.name] = counters[req.params.name] + 1;

  res.status(201).json({ counter: counters[req.params.name] });
});

app.post("/counter/:name/decrement", (req, res) => {
  counters[req.params.name] = counters[req.params.name] - 1;

  res.status(201).json({ counter: counters[req.params.name] });
});

app.post("/counter/:name/double", (req, res) => {
  counters[req.params.name] = counters[req.params.name] * 2;

  res.status(201).json({ counter: counters[req.params.name] });
});

const port = 3030;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
