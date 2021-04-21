const queryMessage = {
  getAll: (request) => {
    const getchatroom = `SELECT a.id as chatroom_id, a.timestamp, user1, user2, is_pinned, is_saved, c.id as contact_id, c.friend_name, count(d.is_read) as unread, e.photo as user1_photo, f.photo as user2_photo, f.phone, f.is_Online
    from chatrooms as a
    inner join (select a.user_id as user1, b.user_id as user2, a.chatroom_id, a.is_pinned, a.is_saved
    from chatroom_members as a, chatroom_members as b
    where a.chatroom_id = b.chatroom_id and a.user_id = ${request.id} and b.user_id != ${request.id}) as b
    on b.chatroom_id = a.id
    left join (select a.id, a.user_id, a.friend_id, a.friend_name from contacts as a) as c on c.user_id = user1 and c.friend_id = user2
    left join (select * from messages where sender != ${request.id} and is_read = false) as d on d.chatroom_id = a.id
	  inner join users as e on e.id = user1
	  inner join (select a.id, a.phone, a.photo, b.is_online from users as a inner join user_status as b on b.user_id = a.id) as f on f.id = user2
    where a.id = ${request.chatroom_id}
    group by a.id, user1, user2, is_pinned, is_saved, contact_id, c.friend_name, user1_photo, user2_photo, f.phone, f.is_online`;

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
    const { chatroom_id, sender, text = null } = request;
    const query = `INSERT INTO messages(chatroom_id, sender, text, is_read, timestamp) VALUES($1, $2, $3, $4, $5) RETURNING id`;
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
