const db = require("../helpers/connection_db");
const queryMessage = require("../helpers/queryMessage");
const responseMessage = require("../helpers/responseMessage");
const fs = require("fs");

const MessageModel = {
  getAllMessages: (request) => {
    return new Promise((resolve, reject) => {
      const getChatroom = queryMessage.getAll(request).getchatroom;
      db.query(getChatroom, (err, result) => {
        if (!err) {
          if (result.rowCount < 1) {
            reject(responseMessage("Chat not found", 400));
          }

          const getMessages = queryMessage.getAll(request).getMessages;
          db.query(getMessages, (err, response) => {
            if (!err) {
              if (response.rowCount < 1) {
                reject(responseMessage("Message empty", 400));
              }

              const data = {
                chatroom_id: result.rows[0].chatroom_id,
                user1: result.rows[0].user1,
                user1_photo: result.rows[0].user1_photo,
                user2: result.rows[0].user2,
                user2_photo: result.rows[0].user2_photo,
                user2_name: result.rows[0].friend_name,
                is_online: result.rows[0].is_online,
                contact_id: result.rows[0].contact_id,
                messages: response.rows,
              };

              resolve(responseMessage("Success get Message", 200, data));
            } else {
              reject(responseMessage("Error when get messages", 500));
            }
          });
        } else {
          reject(responseMessage("Error when get chat", 500));
        }
      });
    });
  },

  editRead: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryMessage.editRead(request);
      db.query(query, (err) => {
        if (!err) {
          resolve(responseMessage("Success update messages", 200));
        } else {
          reject(responseMessage("Error when update messages", 500));
        }
      });
    });
  },

  addNewMessage: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryMessage.addNew(request).query;
      const values = queryMessage.addNew(request).values;
      db.query(query, values, (err) => {
        if (!err) {
          const query = queryMessage.findOne(request);
          db.query(query, (err, result) => {
            if (!err) {
              const subReq = { ...request, id: result.rows[0].id };
              if (subReq.images !== null) {
                db.query(
                  `INSERT INTO message_img(message_id, images) VALUES(${subReq.id}, '${subReq.images}')`,
                  (err) => {
                    if (err) {
                      reject(responseMessage("Error when added images", 500));
                    }
                    db.query(
                      `UPDATE chatrooms SET timestamp = 'now()' WHERE id = ${request.chatroom_id}`,
                      (err) => {
                        if (!err) {
                          resolve(
                            responseMessage(
                              "Success create Message",
                              201,
                              request
                            )
                          );
                        }
                      }
                    );
                  }
                );
              } else if (subReq.file !== null) {
                db.query(
                  `INSERT INTO message_file(message_id, file) VALUES(${subReq.id}, '${subReq.file}')`,
                  (err) => {
                    if (err) {
                      reject(responseMessage("Error when added file", 500));
                    }
                    db.query(
                      `UPDATE chatrooms SET timestamp = 'now()' WHERE id = ${request.chatroom_id}`,
                      (err) => {
                        if (!err) {
                          resolve(
                            responseMessage(
                              "Success create Message",
                              201,
                              request
                            )
                          );
                        }
                      }
                    );
                  }
                );
              } else if (subReq.document !== null) {
                db.query(
                  `INSERT INTO message_doc(message_id, document) VALUES(${subReq.id}, '${subReq.document}')`,
                  (err) => {
                    if (err) {
                      reject(responseMessage("Error when added document", 500));
                    }
                    db.query(
                      `UPDATE chatrooms SET timestamp = 'now()' WHERE id = ${request.chatroom_id}`,
                      (err) => {
                        if (!err) {
                          resolve(
                            responseMessage(
                              "Success create Message",
                              201,
                              request
                            )
                          );
                        }
                      }
                    );
                  }
                );
              } else {
                db.query(
                  `UPDATE chatrooms SET timestamp = 'now()' WHERE id = ${request.chatroom_id}`,
                  (err) => {
                    if (!err) {
                      resolve(
                        responseMessage("Success create Message", 201, request)
                      );
                    }
                  }
                );
              }
            } else {
              reject(responseMessage("Error when create message", 500));
            }
          });
        } else {
          reject(responseMessage("Error when create message", 500));
        }
      });
    });
  },

  deleteMessage: (request) => {
    return new Promise((resolve, reject) => {
      const getQuery = queryMessage.delete(request).get;
      db.query(getQuery, (err, result) => {
        if (result.rows.length < 1 || result.rows == undefined) {
          const query = queryMessage.delete(request).query;
          db.query(query, (err) => {
            if (!err) {
              resolve(responseMessage("Success delete message", 200));
            } else {
              reject(responseMessage("Delete message failed", 500));
            }
          });
        }
        if (!err) {
          const subReq = { ...result.rows[0] };
          if (subReq.images !== null || subReq.images !== undefined) {
            fs.unlinkSync(`public/${subReq.images}`);
          }
          if (subReq.document !== null || subReq.document !== undefined) {
            fs.unlinkSync(`public/${subReq.document}`);
          }
          if (subReq.file !== null || subReq.file !== undefined) {
            fs.unlinkSync(`public/${subReq.file}`);
          }

          const query = queryMessage.delete(request).query;
          db.query(query, (err) => {
            if (!err) {
              resolve(responseMessage("Success delete message", 200));
            } else {
              reject(responseMessage("Delete message failed", 500));
            }
          });
        } else {
          reject(responseMessage("Delete message failed", 500));
        }
      });
    });
  },
};

module.exports = MessageModel;
