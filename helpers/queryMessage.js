const queryMessage = {
  getAll: (request) => {
    const getMessages = `select messages.id, messages.sender, messages.text, messages.is_read, messages.timestamp, message_img.images, message_doc.document, message_file.file, message_loc.long, message_loc.lat from messages 
    left join message_img on message_img.message_id = messages.id
		left join message_doc on message_doc.message_id = messages.id
		left join message_file on message_file.message_id = messages.id
    left join message_loc on message_loc.message_id = messages.id
		where messages.chatroom_id = ${request.chatroom_id} order by timestamp asc`;

    return getMessages;
  },

  findOne: (request) => {
    const { sender, receiver } = request;
    const query = `SELECT * FROM messages where sender = ${sender} ORDER BY timestamp DESC LIMIT 1`;

    return query;
  },

  editRead: (request) => {
    const { chatroom_id, id } = request;
    const query = `UPDATE messages SET is_read = true WHERE chatroom_id = ${chatroom_id} AND sender != ${id}`;

    return query;
  },

  addNew: (request) => {
    const { chatroom_id, sender, text = null } = request;
    const values = [chatroom_id, sender, text, false, "now()"];
    const query = `INSERT INTO messages(chatroom_id, sender, text, is_read, timestamp) VALUES($1, $2, $3, $4, $5) RETURNING id`;

    return { query, values };
  },

  delete: (request) => {
    const get = `select message_img.images, message_doc.document, message_file.file from messages 
    left join message_img on message_img.message_id = messages.id
		left join message_doc on message_doc.message_id = messages.id
		left join message_file on message_file.message_id = messages.id
		where messages.id = ${request}`;
    const query = `DELETE FROM messages WHERE id = ${request}`;

    return { get, query };
  },
};

module.exports = queryMessage;
