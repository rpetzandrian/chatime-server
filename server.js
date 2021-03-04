const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = require("./routes");
router(app, "/api/v1");

app.get("/", (req, res) => {
  res.send({
    message: "Home",
  });
});

app.get("*", (req, res) => {
  res.status(404).send({
    message: "Page not found",
    statuscode: 404,
  });
});

app.listen(port, () => {
  console.log(`Server started on http://${process.env.HOST}:${port}`);
});
