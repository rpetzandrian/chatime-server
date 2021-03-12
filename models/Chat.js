const db = require("../helpers/connection_db");
const responseMessage = require("../helpers/responseMessage");
const queryChat = require("../helpers/queryChat");

const ChatModel = {
  getChatrooms: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryChat.getChatroom(request);
      db.query(query, (err, response) => {
        if (response.rows.length < 1) {
          reject(responseMessage("Chatroom not found", 400));
          return;
        }

        let chatroom = [];
        for (let i = 0; i < response.rows.length; i++) {
          const query = queryChat.getLastMessage(response.rows[i].id);
          db.query(query, (err, result) => {
            let data = result.rows[0];
            if (data !== undefined) {
              let chatroomSegment = {
                id: data.id,
                user1_id: data.user1_id,
                user2_id: data.user2_id,
                lastMessage: {
                  id: data.message_id,
                  sender_id: data.sender_id,
                  receiver_id: data.receiver_id,
                  message_text: data.message_text,
                  message_image: data.image,
                  message_file: data.file,
                  message_document: data.document,
                  timestamp: data.timestamp,
                },
              };
              chatroom.push(chatroomSegment);
            }
            if (i == response.rows.length - 1) {
              if (!err) {
                resolve(
                  responseMessage("Success get chatroom list", 200, chatroom)
                );
              } else {
                reject(responseMessage("Error occurs when get chatroom", 500));
              }
            }
          });
        }
      });
    });
  },

  addNewChatroom: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryChat.addNewChatroom(request);
      db.query(query, (err) => {
        if (!err) {
          resolve(responseMessage("Success add new chatroom", 201, request));
        } else {
          reject(responseMessage("Error occurs when add new chatroom", 500));
        }
      });
    });
  },

  deleteChatroom: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryChat.deleteChatroom(request).q1;
      db.query(query, (err) => {
        if (err) {
          reject(responseMessage("Error when delete messages", 500));
        }
        const query = queryChat.deleteChatroom(request).q2;
        db.query(query, (err) => {
          if (!err) {
            resolve(responseMessage("Success delete chatroom", 200));
          } else {
            reject(responseMessage("Delete chatroom failed", 500));
          }
        });
      });
    });
  },

  getMessageByChatroom: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryChat.getMessage(request);
      db.query(query, (err, response) => {
        if (response.rows.length < 1) {
          reject(responseMessage("Contact not found", 400));
          return;
        }

        if (!err) {
          resolve(responseMessage("Success get messages", 200, response.rows));
        } else {
          reject(responseMessage("Error occurs when get messages", 500));
        }
      });
    });
  },

  getLastMessageByChatroom: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryChat.getLastMessage(request);
      db.query(query, (err, response) => {
        if (response.rows.length < 1) {
          reject(responseMessage("Contact not found", 400));
          return;
        }

        if (!err) {
          resolve(
            responseMessage("Success get messages", 200, response.rows[0])
          );
        } else {
          reject(responseMessage("Error occurs when get messages", 500));
        }
      });
    });
  },

  addNewMessage: (request) => {
    return new Promise((resolve, reject) => {
      const { query, values } = queryChat.addNewMessage(request);
      db.query(query, values, (err) => {
        if (!err) {
          resolve(responseMessage("Success add message", 201, request));
        } else {
          reject(responseMessage("Error while add message", 500));
        }
      });
    });
  },

  deleteMessage: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryChat.deleteMessage(request);
      db.query(query, (err) => {
        if (!err) {
          resolve(responseMessage("Success delete message", 200));
        } else {
          reject(responseMessage("Error occurs when delete message", 500));
        }
      });
    });
  },
};

module.exports = ChatModel;
