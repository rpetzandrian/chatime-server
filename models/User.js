const db = require("../helpers/connection_db");
const responseMessage = require("../helpers/responseMessage");

const UserModel = {
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT id, name, username, email, phone, photo, bio FROM users ORDER BY name ASC`;
      db.query(query, (err, response) => {
        if (response.rows.length < 1) {
          reject(responseMessage("User not found", 400, []));
          return;
        }
        if (!err) {
          resolve(responseMessage("Success get Users", 200, response.rows));
        } else {
          reject(responseMessage("Error while get data user", 500, []));
        }
      });
    });
  },

  getUserById: (request) => {
    return new Promise((resolve, reject) => {
      let id = request;
      const query = `SELECT id, name, username, email, phone, photo, bio FROM users WHERE id = ${request}`;

      db.query(query, (err, response) => {
        if (response.rows.length < 1) {
          reject(responseMessage("User not found", 400, []));
          return;
        }
        if (!err) {
          resolve(
            responseMessage(
              `Success get User with id ${id}`,
              200,
              response.rows
            )
          );
        } else {
          reject(responseMessage("Error while get data user", 500, []));
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
          resolve(
            responseMessage("Successfull! User has been created", 201, [])
          );
        } else {
          reject(responseMessage("Error while create new user", 500, []));
        }
      });
    });
  },

  updateUser: (id, request) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id = ${id}`).then((initialValue) => {
        if (initialValue.rows.length < 1) {
          reject(responseMessage("User not found", 400, []));
          return;
        }
        let {
          name = initialValue.rows[0]?.name,
          username = initialValue.rows[0]?.username,
          email = initialValue.rows[0]?.email,
          password = initialValue.rows[0]?.password,
          phone = initialValue.rows[0]?.phone,
          photo = initialValue.rows[0]?.photo,
          bio = initialValue.rows[0]?.bio,
        } = request;
        const query = `UPDATE users SET name='${name}', username='${username}', email='${email}', password='${password}', phone='${phone}', photo='${photo}', bio='${bio}', updated_at='now()' WHERE id = '${id}'`;
        db.query(query, (err) => {
          if (!err) {
            resolve(responseMessage("Success update user", 200, []));
          } else {
            reject(responseMessage("Error occurrs when update user", 500, []));
          }
        });
      });
    });
  },

  searchUsersByName: (request) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT id, name, username, email, phone, photo, bio FROM users WHERE LOWER(name) LIKE '%${request.toLowerCase()}%' ORDER BY name ASC `;
      db.query(query, (err, response) => {
        if (response.rows.length < 1) {
          reject(responseMessage("User not found", 400, []));
          return;
        }
        if (!err) {
          resolve(
            responseMessage("Success get users by name", 200, response.rows)
          );
        } else {
          reject(responseMessage("Error occurs when searching users", 500, []));
        }
      });
    });
  },

  deleteUser: (request) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM users where id=${request}`;

      db.query(query, (err) => {
        if (!err) {
          resolve(
            responseMessage(
              `Successfull! User with id ${request} has been deleted`,
              200,
              []
            )
          );
        } else {
          reject(responseMessage("Error occurs when deleting user", 500, []));
        }
      });
    });
  },
};

module.exports = UserModel;
