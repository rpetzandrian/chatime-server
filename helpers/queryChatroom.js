const queryChatroom = {
  getAll: (request) => {
    const query1 = `SELECT chatrooms.id, chatrooms.user1, chatrooms.user2, chatrooms.timestamp FROM chatrooms INNER JOIN messages ON messages.chatroom_id = chatrooms.id WHERE chatrooms.user1 = ${request} OR chatrooms.user2 = ${request} GROUP BY chatrooms.id ORDER BY chatrooms.id ASC`;
    const query2 = `SELECT messages.text FROM messages INNER JOIN chatrooms ON chatrooms.id = messages.chatroom_id WHERE chatrooms.id = ${request} ORDER BY messages.timestamp DESC LIMIT 1`;

    return { query1, query2 };
  },

  getAllImportant: (request) => {
    const query1 = `SELECT chatrooms.id, chatrooms.user1, chatrooms.user2, chatrooms.timestamp FROM chatrooms INNER JOIN messages ON messages.chatroom_id = chatrooms.id WHERE chatrooms.user1 = ${request} OR chatrooms.user2 = ${request} GROUP BY chatrooms.id ORDER BY chatrooms.timestamp DESC`;
    const query2 = `SELECT messages.text FROM messages INNER JOIN chatrooms ON chatrooms.id = messages.chatroom_id WHERE chatrooms.id = ${request} ORDER BY messages.timestamp DESC LIMIT 1`;

    return { query1, query2 };
  },

  getAllUnread: (request) => {
    const query1 = `SELECT chatrooms.id, chatrooms.user1, chatrooms.user2, chatrooms.timestamp, count(messages.is_read) AS not_read FROM chatrooms INNER JOIN messages ON messages.chatroom_id = chatrooms.id WHERE messages.is_read = false AND chatrooms.user1 = ${request} OR chatrooms.user2 = ${request} GROUP BY chatrooms.id ORDER BY not_read DESC`;
    const query2 = `SELECT messages.text FROM messages INNER JOIN chatrooms ON chatrooms.id = messages.chatroom_id WHERE chatrooms.id = ${request} ORDER BY messages.timestamp DESC LIMIT 1`;

    return { query1, query2 };
  },

  getAllRead: (request) => {
    const query1 = `SELECT chatrooms.id, chatrooms.user1, chatrooms.user2, chatrooms.timestamp, count(messages.is_read) AS read FROM chatrooms INNER JOIN messages ON messages.chatroom_id = chatrooms.id WHERE messages.is_read = true AND chatrooms.user1 = ${request} OR chatrooms.user2 = ${request} GROUP BY chatrooms.id ORDER BY chatrooms.timestamp DESC`;
    const query2 = `SELECT messages.text FROM messages INNER JOIN chatrooms ON chatrooms.id = messages.chatroom_id WHERE chatrooms.id = ${request} ORDER BY messages.timestamp DESC LIMIT 1`;

    return { query1, query2 };
  },

  addNew: (request) => {
    const { user1, user2 } = request;
    const query = `INSERT INTO chatrooms(user1, user2, timestamp) VALUES(${user1}, ${user2}, 'now()')`;

    return query;
  },

  delete: (request) => {
    const query = `DELETE FROM chatrooms WHERE id = ${request.id}`;

    return query;
  },
};

module.exports = queryChatroom;
