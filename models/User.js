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
            message: "Error while get data",
            status: 500,
          });
        }
      });
    });
  },
  getUserById: () => {},
  addNewUser: () => {},
  updateUser: () => {},
  deleteUser: () => {},
};

module.exports = UserModel;
