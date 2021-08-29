const db = require("../helpers/connection_db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const responseMessage = require("../helpers/responseMessage");
const queryUser = require("../helpers/queryUser");

const UserAuth = {
  register: (req) => {
    return new Promise((resolve, reject) => {
      const { email, password } = req;
      db.query(
        `SELECT email FROM users WHERE email = '${email}'`,
        (err, value) => {
          if (!err) {
            if (value.rows.length < 1) {
              bcrypt.hash(password, 10, function (errHash, hash) {
                if (!errHash) {
                  const newUser = {
                    ...req,
                    password: hash,
                    is_admin: false,
                    is_online: false,
                  };
                  const { query1, values1, query2 } = queryUser.addNew(newUser);

                  db.query(query1, values1, (err) => {
                    if (!err) {
                      db.query(query2, (err) => {
                        resolve(
                          responseMessage("Register success", 201, newUser)
                        );
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
                    const { id, username, name, is_admin } = value.rows[0];
                    const payload = {
                      id: id,
                      username: username ?? name,
                      role: is_admin ? "Admin" : "User",
                    };
                    jwt.sign(
                      payload,
                      process.env.SECRET_KEY,
                      // { expiresIn: "30000" },
                      function (errToken, token) {
                        if (!errToken) {
                          resolve(
                            responseMessage("Login success", 200, {
                              token: token,
                              id: id,
                              // expired: 30000,
                            })
                          );
                        } else {
                          reject(
                            responseMessage("Error occurs when login", 500)
                          );
                        }
                      }
                    );
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
