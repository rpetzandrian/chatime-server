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

          resolve(responseMessage("Success get chatroom", 200, response.rows));
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

          resolve(responseMessage("Success get chatroom", 200, response.rows));
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

          resolve(responseMessage("Success get chatroom", 200, response.rows));
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

          resolve(responseMessage("Success get chatroom", 200, response.rows));
        } else {
          reject(responseMessage("Get chatroom failed", 500));
        }
      });
    });
  },

  searchChatrooms: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryChatroom.search(request);
      db.query(query, (err, result) => {
        if (!err) {
          if (result.rowCount < 1) {
            reject(responseMessage("Chatroom not found", 400));
          }

          resolve(responseMessage("Success get chatroom", 200, response.rows));
        } else {
          reject(responseMessage("Get chatrooms failed", 500));
        }
      });
    });
  },

  addNewChatroom: (request) => {
    return new Promise((resolve, reject) => {
      const { user1, user2 } = request;
      const find = queryChatroom.addNew(request).find;
      db.query(find, (err, result) => {
        if (!err) {
          if (result.rowCount < 1) {
            const query = queryChatroom.addNew(request).addChatroom;
            db.query(query, (err, result) => {
              if (!err) {
                const query = queryChatroom.addNew(request, result.rows[0].id)
                  .addMember;
                db.query(query, (err) => {
                  if (!err) {
                    resolve(
                      responseMessage("Success create chatroom", 201, {
                        ...request,
                        id: result.rows[0].id,
                      })
                    );
                  } else {
                    reject(responseMessage("Create chatroom failed", 500));
                  }
                });
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
      });
    });
  },

  updateChatroom: (request) => {
    return new Promise((resolve, reject) => {
      const { id, chatroom_id } = request;
      db.query(
        `select is_pinned, is_saved from chatroom_members where chatroom_id = ${chatroom_id} and user_id = ${id}`,
        (err, response) => {
          if (!err) {
            if (response.rows.length < 1) {
              reject(responseMessage("Chatroom not found", 400));
            }

            const newReq = {
              ...request,
              is_pinned:
                request.is_pinned === null
                  ? response.rows[0].is_pinned
                  : request.is_pinned,
              is_saved:
                request.is_saved === null
                  ? response.rows[0].is_saved
                  : request.is_saved,
            };
            const query = queryChatroom.updateChatroom(newReq);
            db.query(query, (err) => {
              if (!err) {
                resolve(responseMessage("Update success", 200));
              } else {
                reject(responseMessage("update failed", 500));
              }
            });
          } else {
            reject(responseMessage("update failed", 500));
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
