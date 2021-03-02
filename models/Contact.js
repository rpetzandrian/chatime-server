const { request } = require("express");
const db = require("../helpers/connection_db");

const ContactModel = {
  getAllContacts: (request) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM contacts WHERE contact_id = ${request}`;
      db.query(query, (error, contact) => {
        const query = `SELECT contacts.friend_id, name, username, email, phone, photo, bio FROM contacts INNER JOIN users ON contacts.friend_id = users.id WHERE contacts.user_id = ${request}`;
        db.query(query, (err, response) => {
          if (!err) {
            const result = {
              contact_id: contact.rows[0]?.contact_id,
              user_id: contact.rows[0]?.user_id,
              friends: response.rows,
            };
            resolve(result);
          } else {
            reject({
              message: "Error occurs when get contact",
              statusCode: 500,
            });
          }
        });
      });
    });
  },

  deleteContact: (request) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM contacts WHERE user_id = ${request.userID} AND friend_id = ${request.friendID}`;
      db.query(query, (err) => {
        if (!err) {
          resolve({
            message: "Delete contact success",
            statusCode: 200,
          });
        } else {
          reject({
            message: "Delete contact failed",
            statusCode: 500,
          });
        }
      });
    });
  },
};

module.exports = ContactModel;
