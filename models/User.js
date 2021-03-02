const db = require("../helpers/connection_db");

const UserModel = {
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT name, username, phone, bio, photo FROM users`;
      db.query(query, (err, response) => {
        if (!err) {
          resolve(response.rows);
        } else {
          reject({
            message: "Error while get data user",
            statusCode: 500,
          });
        }
      });
    });
  },
  getUserById: () => {},
  addNewUser: (request) => {
    return new Promise((resolve, reject) => {
      let {
        name,
        username = null,
        email,
        password,
        phone = null,
        photo = null,
        bio = null,
      } = request;

      const query = `INSERT INTO users(name, username, email, password, phone, photo, bio, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
      const values = [
        name,
        username,
        email,
        password,
        phone,
        photo,
        bio,
        `now()`,
        null,
      ];

      db.query(query, values, (err) => {
        if (!err) {
          resolve({
            message: "Successfull! User has been created",
            statusCode: 201,
          });
        } else {
          reject({
            message: "Error while create new user",
            statusCode: 500,
          });
        }
      });
    });
  },
  updateUser: () => {},
  deleteUser: () => {},
};

module.exports = UserModel;
