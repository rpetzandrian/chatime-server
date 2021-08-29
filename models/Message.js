const db = require("../helpers/connection_db");
const queryMessage = require("../helpers/queryMessage");
const responseMessage = require("../helpers/responseMessage");
const fs = require("fs");

const MessageModel = {
  getAllMessages: (request) => {
    return new Promise((resolve, reject) => {
      const getMessages = queryMessage.getAll(request);
      db.query(getMessages, (err, response) => {
        if (!err) {
          resolve(responseMessage("Success get Message", 200, response.rows));
        } else {
          console.log(err);
          reject(responseMessage("Error when get messages", 500));
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
      const { images, file, document } = request;
      if (images) {
        for (let i = 0; i < images.length; i++) {
          if (i === images.length - 1) {
            const query = queryMessage.addNew(request).query;
            const values = queryMessage.addNew(request).values;
            db.query(query, values, (err, result) => {
              console.log(err, "1");
              if (!err) {
                db.query(
                  `INSERT INTO message_img(message_id, images) VALUES(${result.rows[0].id}, 'uploads/images/${images[i].filename}')`,
                  (err) => {
                    console.log(err, "2");
                    if (!err) {
                      db.query(
                        `UPDATE chatrooms SET lastmessage = ${result.rows[0].id} WHERE id = ${request.chatroom_id}`,
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
                  }
                );
              }
            });
          } else {
            const subReq = { ...request, text: null };
            const query = queryMessage.addNew(subReq).query;
            const values = queryMessage.addNew(subReq).values;
            db.query(query, values, (err, result) => {
              if (!err) {
                db.query(
                  `INSERT INTO message_img(message_id, images) VALUES(${result.rows[0].id}, 'uploads/images/${images[i].filename}')`,
                  (err) => {
                    if (!err) {
                      db.query(
                        `UPDATE chatrooms SET lastmessage = ${result.rows[0].id} WHERE id = ${request.chatroom_id}`,
                        (err) => {
                          if (err) {
                            reject(
                              responseMessage("Error when add messages", 500)
                            );
                          }
                        }
                      );
                    }
                  }
                );
              }
            });
          }
        }
      }
      if (file) {
        for (let i = 0; i < file.length; i++) {
          if (i === file.length - 1) {
            const query = queryMessage.addNew(request).query;
            const values = queryMessage.addNew(request).values;
            db.query(query, values, (err, result) => {
              if (!err) {
                db.query(
                  `INSERT INTO message_file(message_id, file) VALUES(${result.rows[0].id}, 'uploads/files/${file[i].filename}')`,
                  (err) => {
                    if (!err) {
                      db.query(
                        `UPDATE chatrooms SET lastmessage = ${result.rows[0].id} WHERE id = ${request.chatroom_id}`,
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
                  }
                );
              }
            });
          } else {
            const subReq = { ...request, text: null };
            const query = queryMessage.addNew(subReq).query;
            const values = queryMessage.addNew(subReq).values;
            db.query(query, values, (err, result) => {
              if (!err) {
                db.query(
                  `INSERT INTO message_img(message_id, images) VALUES(${result.rows[0].id}, 'uploads/images/${images[i].filename}')`,
                  (err) => {
                    if (!err) {
                      db.query(
                        `UPDATE chatrooms SET lastmessage = ${result.rows[0].id} WHERE id = ${request.chatroom_id}`,
                        (err) => {
                          if (err) {
                            reject(
                              responseMessage("Error when add messages", 500)
                            );
                          }
                        }
                      );
                    }
                  }
                );
              }
            });
          }
        }
      }
      if (document) {
        for (let i = 0; i < document.length; i++) {
          if (i === document.length - 1) {
            const query = queryMessage.addNew(request).query;
            const values = queryMessage.addNew(request).values;
            db.query(query, values, (err, result) => {
              if (!err) {
                db.query(
                  `INSERT INTO message_doc(message_id, document) VALUES(${result.rows[0].id}, 'uploads/documents/${document[i].filename}')`,
                  (err) => {
                    if (!err) {
                      db.query(
                        `UPDATE chatrooms SET lastmessage = ${result.rows[0].id} WHERE id = ${request.chatroom_id}`,
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
                  }
                );
              }
            });
          } else {
            const subReq = { ...request, text: null };
            const query = queryMessage.addNew(subReq).query;
            const values = queryMessage.addNew(subReq).values;
            db.query(query, values, (err, result) => {
              if (!err) {
                db.query(
                  `INSERT INTO message_img(message_id, images) VALUES(${result.rows[0].id}, 'uploads/images/${images[i].filename}')`,
                  (err) => {
                    if (!err) {
                      db.query(
                        `UPDATE chatrooms SET lastmessage = ${result.rows[0].id} WHERE id = ${request.chatroom_id}`,
                        (err) => {
                          if (err) {
                            reject(
                              responseMessage("Error when add messages", 500)
                            );
                          }
                        }
                      );
                    }
                  }
                );
              }
            });
          }
        }
      }
      if (!images && !file && !document) {
        const query = queryMessage.addNew(request).query;
        const values = queryMessage.addNew(request).values;
        db.query(query, values, (err, result) => {
          if (!err) {
            db.query(
              `UPDATE chatrooms SET lastmessage = ${result.rows[0].id} WHERE id = ${request.chatroom_id}`,
              (err) => {
                if (!err) {
                  resolve(
                    responseMessage("Success create Message", 201, request)
                  );
                }
              }
            );
          }
        });
      }
    });
  },

  deleteMessage: (request) => {
    return new Promise((resolve, reject) => {
      const getQuery = queryMessage.delete(request.id).get;
      db.query(getQuery, (err, result) => {
        if (!err) {
          if (result.rows[0].images !== null) {
            fs.unlinkSync(`public/${result.rows[0].images}`);
          }
          if (result.rows[0].document !== null) {
            fs.unlinkSync(`public/${result.rows[0].document}`);
          }
          if (result.rows[0].file !== null) {
            fs.unlinkSync(`public/${result.rows[0].file}`);
          }

          const deleteQuery = queryMessage.delete(request.id).query;
          db.query(deleteQuery, (err) => {
            if (!err) {
              db.query(
                `SELECT id from messages where chatroom_id = ${request.chatroom} order by timestamp DESC LIMIT 1`,
                (err, result) => {
                  if (!err) {
                    db.query(
                      `UPDATE chatrooms SET lastmessage = ${result.rows[0].id} where id = ${request.chatroom}`,
                      (err) => {
                        if (!err) {
                          resolve(
                            responseMessage("Delete message success", 200)
                          );
                        }
                      }
                    );
                  }
                }
              );
            } else {
              reject(responseMessage("Error when delete message", 500));
            }
          });
        } else {
          reject(responseMessage("Error when delete message", 500));
        }
      });
    });
  },
};

module.exports = MessageModel;
