const { Client } = require("pg");
const db = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "rpetz",
  database: "chatime",
});

db.connect()
  .then(() => {
    console.log("Database berhasil tersambung");
  })
  .catch((err) => {
    console.log("Error:", err);
  });

module.exports = db;
