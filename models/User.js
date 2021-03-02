const db = require("../helpers/connection_db");

const UserModel = {
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT id, name, username, phone, bio, photo FROM users ORDER BY name ASC`;
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

  getUserById: (request) => {
    return new Promise((resolve, reject) => {
      let id = request;
      const query = `SELECT id, name, username, phone, bio, photo FROM users WHERE id = ${request}`;

      db.query(query, (err, response) => {
        if (!err) {
          resolve(response.rows);
        } else {
          reject({
            message: `Error occurs during get user with id ${request}`,
            statusCode: 500,
          });
        }
      });
    });
  },
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
  deleteUser: (request) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM users where id=${request}`;

      db.query(query, (err) => {
        if (!err) {
          resolve({
            message: `Successfull! User with id ${request} has been deleted`,
            statusCode: 200,
          });
        } else {
          reject({
            message: "Error occurs when deleting user",
            statusCode: 500,
          });
        }
      });
    });
  },
};

module.exports = UserModel;
