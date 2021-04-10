const queryMessage = {
  getAll: (request) => {
    const getchatroom = `SELECT a.id as chatroom_id, user1, user2, c.id as contact_id, c.friend_name, c.photo as user2_photo, c.phone, c.is_online, e.photo as user1_photo
    from chatrooms as a
    inner join (select a.user_id as user1, b.user_id as user2, a.chatroom_id, a.is_pinned, a.is_saved
    from chatroom_members as a, chatroom_members as b
    where a.chatroom_id = b.chatroom_id and a.user_id = ${request.id} and b.user_id != ${request.id}) as b
    on b.chatroom_id = a.id
    inner join (select a.id, a.user_id, a.friend_id, a.friend_name, b.photo, b.phone, c.is_online from contacts as a
    inner join users as b on b.id = a.friend_id inner join user_status as c on c.user_id = a.friend_id) as c on c.user_id = user1 and c.friend_id = user2
	  inner join users as e on e.id = user1
	  where a.id = ${request.chatroom_id}
    group by a.id, user1, user2, contact_id, c.friend_name, user2_photo, user1_photo, c.phone, c.is_online`;

    const getMessages = `select messages.id, messages.sender, messages.text, messages.is_read, messages.timestamp, message_img.images, message_doc.document, message_file.file, message_loc.long, message_loc.lat from messages 
    left join message_img on message_img.message_id = messages.id
		left join message_doc on message_doc.message_id = messages.id
		left join message_file on message_file.message_id = messages.id
    left join message_loc on message_loc.message_id = messages.id
		where messages.chatroom_id = ${request.chatroom_id} order by timestamp asc`;

    return { getchatroom, getMessages };
  },

  findOne: (request) => {
    const { sender, receiver } = request;
    const query = `SELECT id FROM messages where sender = ${sender} ORDER BY timestamp DESC LIMIT 1`;

    return query;
  },

  editRead: (request) => {
    const { chatroom_id, id } = request;
    const query = `UPDATE messages SET is_read = true WHERE chatroom_id = ${chatroom_id} AND sender != ${id}`;

    return query;
  },

  addNew: (request) => {
    const { chatroom_id, sender, text } = request;
    const query = `INSERT INTO messages(chatroom_id, sender, text, is_read, timestamp) VALUES($1, $2, $3, $4, $5)`;
    const values = [chatroom_id, sender, text, false, "now()"];

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
