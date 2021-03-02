const { request } = require("express");
const db = require("../helpers/connection_db");

const UserModel = {
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT id, name, username, email, phone, photo, bio FROM users ORDER BY name ASC`;
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
      const query = `SELECT id, name, username, email, phone, photo, bio FROM users WHERE id = ${request}`;

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

  updateUser: (id, request) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id = ${id}`).then((initialValue) => {
        if (initialValue.rows.length < 1) {
          reject({
            message: "User not found",
            statusCode: 400,
          });
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
            resolve({
              message: "Success update user",
              statusCode: 200,
            });
          } else {
            reject({
              message: "Error occurrs when update user",
              statusCode: 500,
            });
          }
        });
      });
    });
  },

  searchUsersByName: (request) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT id, name, username, email, phone, photo, bio FROM public.users WHERE LOWER(name) LIKE '%${request.toLowerCase()}%' ORDER BY name ASC `;
      db.query(query, (err, response) => {
        if (!err) {
          resolve(response.rows);
        } else {
          reject({
            message: "Error occurs when searching users",
            statusCode: 500,
          });
        }
      });
    });
  },

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
