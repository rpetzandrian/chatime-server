const { request } = require("express");

const queryChat = {
  getChatroom: (request) => {
    const query = `SELECT * FROM chatrooms WHERE user1_id = ${request} OR user2_id = ${request}`;
    return query;
  },

  addNewChatroom: (request) => {
    const query = `INSERT into chatrooms(user1_id, user2_id, created_at) VALUES(${request.user1}, ${request.user2}, 'now()')`;
    return query;
  },

  deleteChatroom: (request) => {
    const q1 = `DELETE FROM messages WHERE chatroom_id = ${request}`;
    const q2 = `DELETE FROM chatrooms WHERE id = ${request}`;

    return { q1, q2 };
  },

  getMessage: (request) => {
    const query = `SELECT * FROM messages WHERE chatroom_id = ${request} ORDER BY timestamp ASC`;
    return query;
  },

  getLastMessage: (request) => {
    // const query = `SELECT * FROM messages WHERE chatroom_id = ${request} ORDER BY timestamp DESC`;
    const query = `SELECT chatrooms.id, chatrooms.user1_id, chatrooms.user2_id, messages.sender_id, messages.receiver_id, messages.message_text, messages.id AS message_id, messages.image, messages.file, messages.document, messages.timestamp FROM messages INNER JOIN chatrooms ON chatrooms.id = messages.chatroom_id WHERE chatroom_id = ${request} ORDER BY messages.timestamp DESC`;
    return query;
  },

  addNewMessage: (request) => {
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

    return { query, values };
  },

  deleteMessage: (request) => {
    const query = `DELETE FROM messages WHERE id = ${request}`;
    return query;
  },
};

module.exports = queryChat;
