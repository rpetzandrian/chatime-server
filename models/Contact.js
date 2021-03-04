const { request } = require("express");
const db = require("../helpers/connection_db");
const responseMessage = require("../helpers/responseMessage");

const ContactModel = {
  getAllContacts: (request) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT contact_id, user_id FROM contacts WHERE user_id = ${request}`;
      db.query(query, (error, contact) => {
        if (error) {
          reject(responseMessage("Error occurs when get contact", 500, []));
        }

        if (contact.rows.length < 1) {
          reject(responseMessage("Contact not found", 400, []));
          return;
        }

        const query = `SELECT contacts.friend_id, contacts.friend_name, username, email, phone, photo, bio FROM contacts INNER JOIN users ON contacts.friend_id = users.id WHERE contacts.user_id = ${request}`;
        db.query(query, (err, response) => {
          if (response.rows.length < 1) {
            reject(responseMessage("Contact not found", 400, []));
            return;
          }

          if (!err) {
            const result = {
              contact_id: contact.rows[0]?.contact_id,
              user_id: contact.rows[0]?.user_id,
              friend_name: contact.rows[0]?.friend_name,
              friends: response.rows,
            };
            resolve(
              responseMessage("Success when get all contacts", 200, result)
            );
          } else {
            reject(responseMessage("Error occurs when get contact", 500, []));
          }
        });
      });
    });
  },

  getContactByFriendId: (request) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT contact_id, user_id FROM contacts WHERE user_id = ${request.user_id} AND friend_id = ${request.friend_id}`;
      db.query(query, (error, contact) => {
        if (error) {
          reject(responseMessage("Error occurs when get contact", 500, []));
        }

        if (contact.rows.length < 1) {
          reject(responseMessage("Contact not found", 400, []));
          return;
        }

        const query = `SELECT contacts.friend_id, contacts.friend_name, username, email, phone, photo, bio FROM contacts INNER JOIN users ON contacts.friend_id = users.id WHERE contacts.user_id = ${request.user_id} AND friend_id = ${request.friend_id}`;
        db.query(query, (err, response) => {
          if (response.rows.length < 1) {
            reject(responseMessage("Contact not found", 400, []));
            return;
          }

          if (!err) {
            const result = {
              contact_id: contact.rows[0]?.contact_id,
              user_id: contact.rows[0]?.user_id,
              friend_name: contact.rows[0]?.friend_name,
              friends: response.rows,
            };
            resolve(
              responseMessage("Success when get all contacts", 200, result)
            );
          } else {
            reject(responseMessage("Error occurs when get contact", 500, []));
          }
        });
      });
    });
  },

  searchContactsByName: (request) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT contact_id, user_id FROM contacts WHERE user_id = ${request.id}`;
      db.query(query, (error, contact) => {
        if (error) {
          reject(responseMessage("Error when search users", 500, []));
        }

        if (contact.rows.length < 1) {
          reject(responseMessage("Contact not found", 400, []));
          return;
        }

        const query = `SELECT contacts.friend_id, contacts.friend_name, username, email, phone, photo, bio FROM contacts INNER JOIN users ON contacts.friend_id = users.id WHERE LOWER(contacts.friend_name) LIKE '%${request.name.toLowerCase()}%' ORDER BY contacts.friend_name ASC`;
        db.query(query, (err, response) => {
          if (response.rows.length < 1) {
            reject(responseMessage("Contact not found", 400, []));
            return;
          }

          if (!err) {
            const result = {
              contact_id: contact.rows[0]?.contact_id,
              user_id: contact.rows[0]?.user_id,
              friend_name: contact.rows[0]?.friend_name,
              friends: response.rows,
            };
            resolve(
              responseMessage("Success when search contact", 200, result)
            );
          } else {
            reject(
              responseMessage("Error occurs when search contact", 500, [])
            );
          }
        });
      });
    });
  },

  addNewContact: (request) => {
    return new Promise((resolve, reject) => {
      let { user_id, friend_id, friend_name = null } = request;
      const query = `INSERT into contacts(user_id, friend_id, friend_name) VALUES($1, $2, $3)`;
      const values = [user_id, friend_id, friend_name];

      db.query(query, values, (err) => {
        if (!err) {
          resolve(responseMessage("Success add new contact", 201, []));
        } else {
          reject(responseMessage("Add contact failed", 500, []));
        }
      });
    });
  },

  updateContact: (request) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM contacts WHERE user_id = ${request.userID} AND friend_id=${request.friendID}`;
      db.query(query, (err, initialValue) => {
        if (initialValue.rows.length < 1) {
          reject(responseMessage("Contact not found", 400, []));
          return;
        }
        let {
          friendName = initialValue.rows[0].friend_name || null,
          userID,
          friendID,
        } = request;
        const query = `UPDATE contacts SET friend_name = '${friendName}' WHERE user_id = ${userID} AND friend_id= ${friendID}`;
        db.query(query, (err) => {
          if (!err) {
            resolve(responseMessage("Contact updated", 200, []));
          } else {
            reject(responseMessage("Update contact failed", 500, []));
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
          resolve(responseMessage("Delete contact success", 200, []));
        } else {
          reject(responseMessage("Delete contact failed", 500, []));
        }
      });
    });
  },
};

module.exports = ContactModel;
