const db = require("../helpers/connection_db");
const queryContact = require("../helpers/queryContact");
const responseMessage = require("../helpers/responseMessage");

const ContactModel = {
  getAllContacts: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryContact.getAll(request).q1;
      db.query(query, (error, contact) => {
        if (error) {
          reject(responseMessage("Error occurs when get contact", 500));
        }

        if (contact.rows.length < 1) {
          reject(responseMessage("Contact not found", 400));
          return;
        }

        const query = queryContact.getAll(request).q2;
        db.query(query, (err, response) => {
          if (response.rows.length < 1) {
            reject(responseMessage("Contact not found", 400));
            return;
          }

          if (!err) {
            const result = {
              contact_id: contact.rows[0]?.contact_id,
              user_id: contact.rows[0]?.user_id,
              friend_name: contact.rows[0]?.friend_name,
              friend_list: response.rows,
            };
            resolve(
              responseMessage("Success when get all contacts", 200, result)
            );
          } else {
            reject(responseMessage("Error occurs when get contact", 500));
          }
        });
      });
    });
  },

  getContactByFriendId: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryContact.getByFriend(request).q1;
      db.query(query, (error, contact) => {
        if (error) {
          reject(responseMessage("Error occurs when get contact", 500));
        }

        if (contact.rows.length < 1) {
          reject(responseMessage("Contact not found", 400));
          return;
        }

        const query = queryContact.getByFriend(request).q2;
        db.query(query, (err, response) => {
          if (response.rows.length < 1) {
            reject(responseMessage("Contact not found", 400));
            return;
          }

          if (!err) {
            const result = {
              contact_id: contact.rows[0]?.contact_id,
              user_id: contact.rows[0]?.user_id,
              friend_name: contact.rows[0]?.friend_name,
              friend_detail: response.rows[0],
            };
            resolve(
              responseMessage("Success when get all contacts", 200, result)
            );
          } else {
            reject(responseMessage("Error occurs when get contact", 500));
          }
        });
      });
    });
  },

  searchContactsByName: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryContact.getAll(request).q1;
      db.query(query, (error, contactResult) => {
        if (error) {
          reject(responseMessage("Error when search users", 500));
        }

        if (contactResult.rows.length < 1) {
          reject(responseMessage("Contact not found", 400));
          return;
        }

        const query = queryContact.search(request);
        db.query(query, (err, response) => {
          if (response.rows.length < 1) {
            reject(responseMessage("Contact not found", 400));
            return;
          }

          if (!err) {
            const result = {
              contact_id: contactResult.rows[0]?.contact_id,
              user_id: contactResult.rows[0]?.user_id,
              friend_name: contactResult.rows[0]?.friend_name,
              friends: response.rows,
            };
            resolve(
              responseMessage("Success when search contact", 200, result)
            );
          } else {
            reject(responseMessage("Error occurs when search contact", 500));
          }
        });
      });
    });
  },

  addNewContact: (request) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select id from users where phone = '${request.phone}'`,
        (err, response) => {
          if (!err) {
            if (response.rowCount === 0) {
              reject(responseMessage("User not found", 400));
            } else {
              db.query(
                `select id from contacts where user_id = ${request.user_id} and friend_id = ${response.rows[0].id}`,
                (err, result) => {
                  if (!err) {
                    if (result.rowCount === 0) {
                      const req = {
                        ...request,
                        friend_id: parseInt(response.rows[0].id),
                      };
                      const { query, values } = queryContact.addNew(req);
                      db.query(query, values, (err) => {
                        if (!err) {
                          resolve(
                            responseMessage("Contact has been created", 201)
                          );
                        } else {
                          reject(responseMessage("Add contact failed", 500));
                        }
                      });
                    } else {
                      reject(responseMessage("Contacts exist", 400));
                    }
                  } else {
                    reject(responseMessage("Add contact failed", 500));
                  }
                }
              );
            }
          } else {
            reject(responseMessage("Add contact failed", 500));
          }
        }
      );
    });
  },

  updateContact: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryContact.update(request, null).q1;
      db.query(query, (err, initialValue) => {
        if (initialValue.rows.length < 1) {
          reject(responseMessage("Contact not found", 400));
          return;
        }
        const query = queryContact.update(request, initialValue).q2;
        db.query(query, (err) => {
          if (!err) {
            resolve(responseMessage("Contact updated", 200, request));
          } else {
            reject(responseMessage("Update contact failed", 500));
          }
        });
      });
    });
  },

  deleteContact: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryContact.delete(request);
      db.query(query, (err) => {
        if (!err) {
          resolve(responseMessage("Delete contact success", 200));
        } else {
          reject(responseMessage("Delete contact failed", 500));
        }
      });
    });
  },
};

module.exports = ContactModel;
