const { Client } = require("pg");
require("dotenv").config();
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const db = new Client({
  host: DB_HOST || "localhost",
  port: DB_PORT || 5432,
  user: DB_USER || "postgres",
  password: DB_PASSWORD || "rpetz",
  database: DB_NAME || "chatime",
});

db.connect()
  .then(() => {
    console.log("Database berhasil tersambung");
  })
  .catch((err) => {
    console.log("Error:", err);
  });

module.exports = db;
