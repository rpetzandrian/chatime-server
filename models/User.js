const db = require("../helpers/connection_db");
const responseMessage = require("../helpers/responseMessage");
const queryUser = require("../helpers/queryUser");
const errUserExist = require("../helpers/errUserExists");

const UserModel = {
  getAllUsers: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryUser.getAll(request);
      db.query(query, (err, response) => {
        if (response.rows.length < 1) {
          reject(responseMessage("User not found", 400, {}));
          return;
        }
        if (!err) {
          resolve(responseMessage("Success get Users", 200, response.rows));
        } else {
          reject(responseMessage("Error while get data user", 500, {}));
        }
      });
    });
  },

  getUserById: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryUser.getById(request);
      db.query(query, (err, response) => {
        if (response.rows.length < 1) {
          reject(responseMessage("User not found", 400, {}));
          return;
        }
        if (!err) {
          resolve(
            responseMessage(
              `Success get User with id ${request}`,
              200,
              response.rows[0]
            )
          );
        } else {
          reject(responseMessage("Error while get data user", 500, {}));
        }
      });
    });
  },

  addNewUser: (request) => {
    return new Promise((resolve, reject) => {
      const { query, values } = queryUser.addNew(request);
      db.query(query, values, (err) => {
        if (!err) {
          resolve(
            responseMessage("Successfull! User has been created", 201, request)
          );
        } else {
          reject(
            errUserExist(err, request) ||
              responseMessage("Error while create new user", 500, {})
          );
        }
      });
    });
  },

  updateUser: (request) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id = ${request.id}`).then(
        (initialValue) => {
          if (initialValue.rows.length < 1) {
            reject(responseMessage("User not found", 400, {}));
            return;
          }
          const query = queryUser.update(request, initialValue);
          db.query(query, (err) => {
            if (!err) {
              resolve(
                responseMessage("Success update user", 200, request.body)
              );
            } else {
              reject(
                responseMessage("Error occurrs when update user", 500, {})
              );
            }
          });
        }
      );
    });
  },

  searchUsersByName: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryUser.searchByName(request);
      db.query(query, (err, response) => {
        if (response.rows.length < 1) {
          reject(responseMessage("User not found", 400, {}));
          return;
        }
        if (!err) {
          resolve(
            responseMessage("Success get users by name", 200, response.rows)
          );
        } else {
          reject(responseMessage("Error occurs when searching users", 500, {}));
        }
      });
    });
  },

  deleteUser: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryUser.delete(request);

      db.query(query, (err) => {
        if (!err) {
          resolve(
            responseMessage(
              `Successfull! User with id ${request} has been deleted`,
              200,
              {}
            )
          );
        } else {
          reject(responseMessage("Error occurs when deleting user", 500, {}));
        }
      });
    });
  },
};

module.exports = UserModel;
