const db = require("../helpers/connection_db");
const responseMessage = require("../helpers/responseMessage");
const queryChatroom = require("../helpers/queryChatroom");
const { query } = require("express");

const ChatroomModel = {
  getAllChatrooms: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryChatroom.getAll(request).query1;
      db.query(query, (err, response) => {
        if (!err) {
          if (response.rows.length < 1) {
            reject(responseMessage("Chatroom not found", 400));
          }

          let chatroom = [];
          for (let i = 0; i < response.rows.length; i++) {
            const query = queryChatroom.getAll(response.rows[i].id).query2;
            db.query(query, (err, result) => {
              if (!err) {
                if (result.rows[0] !== undefined) {
                  const data = {
                    id: response.rows[i].id,
                    user1: response.rows[i].user1,
                    user2: response.rows[i].user2,
                    timestamp: response.rows[i].timestamp,
                    lastMessage: result.rows[0].text,
                  };
                  chatroom.push(data);
                }
                if (i == response.rows.length - 1) {
                  resolve(
                    responseMessage("Success get chatroom", 200, chatroom)
                  );
                }
              } else {
                reject(responseMessage("Get chatrooms failed", 500));
              }
            });
          }
        } else {
          reject(responseMessage("Get chatroom failed", 500));
        }
      });
    });
  },

  getAllChatroomsImportant: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryChatroom.getAllImportant(request).query1;
      db.query(query, (err, response) => {
        if (!err) {
          if (response.rows.length < 1) {
            reject(responseMessage("Chatroom not found", 400));
          }

          let chatroom = [];
          for (let i = 0; i < response.rows.length; i++) {
            const query = queryChatroom.getAllImportant(response.rows[i].id)
              .query2;
            db.query(query, (err, result) => {
              if (!err) {
                if (result.rows[0] !== undefined) {
                  const data = {
                    id: response.rows[i].id,
                    user1: response.rows[i].user1,
                    user2: response.rows[i].user2,
                    timestamp: response.rows[i].timestamp,
                    lastMessage: result.rows[0].text,
                  };
                  chatroom.push(data);
                }
                if (i == response.rows.length - 1) {
                  resolve(
                    responseMessage("Success get chatroom", 200, chatroom)
                  );
                }
              } else {
                reject(responseMessage("Get chatrooms failed", 500));
              }
            });
          }
        } else {
          reject(responseMessage("Get chatroom failed", 500));
        }
      });
    });
  },

  getAllChatroomsUnread: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryChatroom.getAllUnread(request).query1;
      db.query(query, (err, response) => {
        if (!err) {
          if (response.rows.length < 1) {
            reject(responseMessage("Chatroom not found", 400));
          }

          let chatroom = [];
          for (let i = 0; i < response.rows.length; i++) {
            const query = queryChatroom.getAllUnread(response.rows[i].id)
              .query2;
            db.query(query, (err, result) => {
              if (!err) {
                if (result.rows[0] !== undefined) {
                  const data = {
                    id: response.rows[i].id,
                    user1: response.rows[i].user1,
                    user2: response.rows[i].user2,
                    timestamp: response.rows[i].timestamp,
                    not_read: response.rows[i].not_read,
                    lastMessage: result.rows[0].text,
                  };
                  chatroom.push(data);
                }
                if (i == response.rows.length - 1) {
                  resolve(
                    responseMessage("Success get chatroom", 200, chatroom)
                  );
                }
              } else {
                reject(responseMessage("Get chatrooms failed", 500));
              }
            });
          }
        } else {
          reject(responseMessage("Get chatroom failed", 500));
        }
      });
    });
  },

  getAllChatroomsRead: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryChatroom.getAllRead(request).query1;
      db.query(query, (err, response) => {
        if (!err) {
          if (response.rows.length < 1) {
            reject(responseMessage("Chatroom not found", 400));
          }

          let chatroom = [];
          for (let i = 0; i < response.rows.length; i++) {
            const query = queryChatroom.getAllRead(response.rows[i].id).query2;
            db.query(query, (err, result) => {
              if (!err) {
                if (result.rows[0] !== undefined) {
                  const data = {
                    id: response.rows[i].id,
                    user1: response.rows[i].user1,
                    user2: response.rows[i].user2,
                    timestamp: response.rows[i].timestamp,
                    not_read: "0",
                    lastMessage: result.rows[0].text,
                  };
                  chatroom.push(data);
                }
                if (i == response.rows.length - 1) {
                  resolve(
                    responseMessage("Success get chatroom", 200, chatroom)
                  );
                }
              } else {
                reject(responseMessage("Get chatrooms failed", 500));
              }
            });
          }
        } else {
          reject(responseMessage("Get chatroom failed", 500));
        }
      });
    });
  },

  addNewChatroom: (request) => {
    return new Promise((resolve, reject) => {
      const { user1, user2 } = request;
      db.query(
        `select * from chatrooms where user1 = ${user1} AND user2 = ${user2} or user1 = ${user2} AND user2 = ${user1}`,
        (err, result) => {
          if (!err) {
            if (result.rowCount < 1) {
              const query = queryChatroom.addNew(request);
              db.query(query, (err) => {
                if (!err) {
                  resolve(
                    responseMessage("Success create chatroom", 201, request)
                  );
                } else {
                  reject(responseMessage("Create chatroom failed", 500));
                }
              });
            } else {
              reject(responseMessage("Chatroom exist", 400));
            }
          } else {
            reject(responseMessage("Create chatroom failed", 500));
          }
        }
      );
    });
  },

  deleteChatroom: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryChatroom.delete(request);
      db.query(query, (err) => {
        if (!err) {
          resolve(responseMessage("Chatroom deleted", 200));
        } else {
          reject(responseMessage("Delete chatroom failed", 500));
        }
      });
    });
  },
};

module.exports = ChatroomModel;
