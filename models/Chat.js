const { request } = require("express");
const db = require("../helpers/connection_db");
const responseMessage = require("../helpers/responseMessage");

const ChatModel = {
  getChatrooms: (request) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM chatrooms WHERE user1_id = ${request} OR user2_id = ${request}`;
      db.query(query, (err, response) => {
        if (!err) {
          resolve(
            responseMessage("Success get chatroom list", 200, response.rows)
          );
        } else {
          reject(responseMessage("Error occurs when get chatroom", 500, []));
        }
      });
    });
  },

  addNewChatroom: (request) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT into chatrooms(user1_id, user2_id, created_at) VALUES(${request.user1}, ${request.user2}, 'now()')`;
      db.query(query, (err) => {
        if (!err) {
          resolve(responseMessage("Success add new chatroom", 201, []));
        } else {
          reject(
            responseMessage("Error occurs when add new chatroom", 500, [])
          );
        }
      });
    });
  },

  deleteChatroom: (request) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM messages WHERE chatroom_id = ${request}`;
      db.query(query, (err) => {
        if (err) {
          reject(responseMessage("Error when delete messages", 500, []));
        }
        const query = `DELETE FROM chatrooms WHERE id = ${request}`;
        db.query(query, (err) => {
          if (!err) {
            resolve(responseMessage("Success delete chatroom", 200, []));
          } else {
            reject(responseMessage("Delete chatroom failed", 500, []));
          }
        });
      });
    });
  },

  getMessageByChatroom: (request) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM messages WHERE chatroom_id = ${request} ORDER BY timestamp ASC`;
      db.query(query, (err, response) => {
        if (!err) {
          resolve(responseMessage("Success get messages", 200, response.rows));
        } else {
          reject(responseMessage("Error occurs when get messages", 500, []));
        }
      });
    });
  },

  getLastMessageByChatroom: (request) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM messages WHERE chatroom_id = ${request} ORDER BY timestamp DESC`;
      db.query(query, (err, response) => {
        if (!err) {
          resolve(
            responseMessage("Success get messages", 200, response.rows[0])
          );
        } else {
          reject(responseMessage("Error occurs when get messages", 500, []));
        }
      });
    });
  },

  addNewMessage: (request) => {
    return new Promise((resolve, reject) => {
      let {
        chatroom_id,
        sender_id,
        receiver_id,
        message_text = null,
        longitude = null,
        latitude = null,
        image = null,
        file = null,
        document = null,
      } = request;
      const query = `INSERT into messages(chatroom_id, sender_id, receiver_id, is_read, message_text, longitude, latitude, image, file, document, created_at, timestamp) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;
      const values = [
        chatroom_id,
        sender_id,
        receiver_id,
        false,
        message_text,
        longitude,
        latitude,
        image,
        file,
        document,
        `now()`,
        `now()`,
      ];
      db.query(query, values, (err) => {
        if (!err) {
          resolve(responseMessage("Success add message", 201, []));
        } else {
          reject(responseMessage("Error while add message", 500, []));
        }
      });
    });
  },

  deleteMessage: (request) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM messages WHERE id = ${request}`;
      db.query(query, (err) => {
        if (!err) {
          resolve(responseMessage("Success delete message", 200, []));
        } else {
          reject(responseMessage("Error occurs when delete message", 500, []));
        }
      });
    });
  },
};

module.exports = ChatModel;
