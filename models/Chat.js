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
};

module.exports = ChatModel;
