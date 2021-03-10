const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");

// let whitelist = [
//   "http://localhost:3000",
//   "http://localhost:3001",
//   "http://localhost:8000",
//   "http://127.0.0.1:5500",
// ];
// let corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

// app.use(cors(corsOptions));
app.use(express.static("public"));
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
