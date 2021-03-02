const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json([{ message: "Ini get" }]);
});

const router = require("./routes");
router(app, "/api/v1");

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
