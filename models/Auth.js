const db = require("../helpers/connection_db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const responseMessage = require("../helpers/responseMessage");
const hashPassword = require("../helpers/hashPassword");
const queryUser = require("../helpers/queryUser");

const UserAuth = {
  register: (req) => {
    return new Promise((resolve, reject) => {
      const { email, password, name } = req;
      db.query(
        `SELECT email FROM users WHERE email = '${email}'`,
        (err, value) => {
          if (!err) {
            if (value.rows.length < 1) {
              bcrypt.genSalt(10, (errSalt, salt) => {
                if (!errSalt) {
                  bcrypt.hash(password, salt, (errHash, hash) => {
                    if (!errHash) {
                      const newUser = {
                        ...req,
                        password: hash,
                        is_admin: false,
                      };
                      const { query, values } = queryUser.addNew(newUser);

                      db.query(query, values, (err) => {
                        if (!err) {
                          resolve(
                            responseMessage("Register success", 201, newUser)
                          );
                        } else {
                          reject(
                            responseMessage("Error occurs when register", 500)
                          );
                        }
                      });
                    } else {
                      reject(
                        responseMessage("Error occurs when register", 500)
                      );
                    }
                  });
                } else {
                  reject(responseMessage("Error occurs when register", 500));
                }
              });
            } else {
              reject(responseMessage("User exist", 400));
            }
          }
        }
      );
    });
  },

  login: (req) => {
    return new Promise((resolve, reject) => {
      const { email, password } = req;
      db.query(`SELECT * FROM users WHERE email = '${email}'`, (err, value) => {
        if (!err) {
          if (value.rows.length < 1) {
            reject(responseMessage("User unregistered", 400));
          } else {
            bcrypt.compare(
              password,
              value.rows[0].password,
              (errCompare, result) => {
                if (!errCompare) {
                  if (result) {
                    const { id, username, name, role } = value.rows[0];
                    const payload = {
                      id: id,
                      username: username ?? name,
                      role: role ?? "basic",
                    };
                    jwt.sign(payload, "chatime123", function (errToken, token) {
                      if (!errToken) {
                        resolve(responseMessage("Login success", 200, token));
                      } else {
                        reject(responseMessage("Error occurs when login", 500));
                      }
                    });
                  } else {
                    reject(responseMessage("Wrong email/password", 400));
                  }
                } else {
                  reject(responseMessage("Error occurs when login", 500));
                }
              }
            );
          }
        } else {
          reject(responseMessage("Error when login", 500));
        }
      });
    });
  },
};

module.exports = UserAuth;
