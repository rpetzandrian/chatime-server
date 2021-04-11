const { request } = require("express");

const queryChatroom = {
  getAll: (request) => {
    const query1 = `SELECT a.id as chatroom_id, a.timestamp, user1, user2, is_pinned, is_saved, c.id as contact_id, c.friend_name, c.photo as user2_photo, c.phone, c.is_online, count(d.is_read) as unread, e.photo as user1_photo
    from chatrooms as a
    inner join (select a.user_id as user1, b.user_id as user2, a.chatroom_id, a.is_pinned, a.is_saved
    from chatroom_members as a, chatroom_members as b
    where a.chatroom_id = b.chatroom_id and a.user_id = ${request} and b.user_id != ${request}) as b
    on b.chatroom_id = a.id
    inner join (select a.id, a.user_id, a.friend_id, a.friend_name, b.photo, b.phone, c.is_online from contacts as a
    inner join users as b on b.id = a.friend_id inner join user_status as c on c.user_id = a.friend_id) as c on c.user_id = user1 and c.friend_id = user2
    left join (select * from messages where sender != ${request} and is_read = false) as d on d.chatroom_id = a.id
	  inner join users as e on e.id = user1
    where is_saved = false
    group by a.id, user1, user2, is_pinned, is_saved, contact_id, c.friend_name, user2_photo, user1_photo, c.phone, c.is_online
    order by is_pinned desc`;
    const query2 = `SELECT messages.text, messages.sender, messages.is_read FROM messages INNER JOIN chatrooms ON chatrooms.id = messages.chatroom_id WHERE chatrooms.id = ${request} ORDER BY messages.timestamp DESC LIMIT 1`;

    return { query1, query2 };
  },

  getAllImportant: (request) => {
    const query1 = `SELECT a.id as chatroom_id, a.timestamp, user1, user2, is_pinned, is_saved, c.id as contact_id, c.friend_name, c.photo as user2_photo, c.phone, c.is_online, count(d.is_read) as unread, e.photo as user1_photo
    from chatrooms as a
    inner join (select a.user_id as user1, b.user_id as user2, a.chatroom_id, a.is_pinned, a.is_saved
    from chatroom_members as a, chatroom_members as b
    where a.chatroom_id = b.chatroom_id and a.user_id = ${request} and b.user_id != ${request}) as b
    on b.chatroom_id = a.id
    inner join (select a.id, a.user_id, a.friend_id, a.friend_name, b.photo, b.phone, c.is_online from contacts as a
    inner join users as b on b.id = a.friend_id inner join user_status as c on c.user_id = a.friend_id) as c on c.user_id = user1 and c.friend_id = user2
    left join (select * from messages where sender != ${request} and is_read = false) as d on d.chatroom_id = a.id
	  inner join users as e on e.id = user1
    where is_saved = false
    group by a.id, user1, user2, is_pinned, is_saved, contact_id, c.friend_name, user2_photo, user1_photo, c.phone, c.is_online ORDER BY a.timestamp DESC`;
    const query2 = `SELECT messages.text, messages.sender, messages.is_read FROM messages INNER JOIN chatrooms ON chatrooms.id = messages.chatroom_id WHERE chatrooms.id = ${request} ORDER BY messages.timestamp DESC LIMIT 1`;

    return { query1, query2 };
  },

  getAllUnread: (request) => {
    const query1 = `SELECT a.id as chatroom_id, a.timestamp, user1, user2, is_pinned, is_saved, c.id as contact_id, c.friend_name, c.photo as user2_photo, c.phone, c.is_online, count(d.is_read) as unread, e.photo as user1_photo
    from chatrooms as a
    inner join (select a.user_id as user1, b.user_id as user2, a.chatroom_id, a.is_pinned, a.is_saved
    from chatroom_members as a, chatroom_members as b
    where a.chatroom_id = b.chatroom_id and a.user_id = ${request} and b.user_id != ${request}) as b
    on b.chatroom_id = a.id
    inner join (select a.id, a.user_id, a.friend_id, a.friend_name, b.photo, b.phone, c.is_online from contacts as a
    inner join users as b on b.id = a.friend_id inner join user_status as c on c.user_id = a.friend_id) as c on c.user_id = user1 and c.friend_id = user2
    left join (select * from messages where sender != ${request} and is_read = false) as d on d.chatroom_id = a.id
	  inner join users as e on e.id = user1
    where is_saved = false
    group by a.id, user1, user2, is_pinned, is_saved, contact_id, c.friend_name, user2_photo, user1_photo, c.phone, c.is_online
    having count(d.is_read) > 0 
    order by unread desc`;
    const query2 = `SELECT messages.text, messages.sender, messages.is_read FROM messages INNER JOIN chatrooms ON chatrooms.id = messages.chatroom_id WHERE chatrooms.id = ${request} ORDER BY messages.timestamp DESC LIMIT 1`;

    return { query1, query2 };
  },

  getAllRead: (request) => {
    const query1 = `SELECT a.id as chatroom_id, a.timestamp, user1, user2, is_pinned, is_saved, c.id as contact_id, c.friend_name, c.photo as user2_photo, c.phone, c.is_online, count(d.is_read) as unread, e.photo as user1_photo
    from chatrooms as a
    inner join (select a.user_id as user1, b.user_id as user2, a.chatroom_id, a.is_pinned, a.is_saved
    from chatroom_members as a, chatroom_members as b
    where a.chatroom_id = b.chatroom_id and a.user_id = ${request} and b.user_id != ${request}) as b
    on b.chatroom_id = a.id
    inner join (select a.id, a.user_id, a.friend_id, a.friend_name, b.photo, b.phone, c.is_online from contacts as a
    inner join users as b on b.id = a.friend_id inner join user_status as c on c.user_id = a.friend_id) as c on c.user_id = user1 and c.friend_id = user2
    left join (select * from messages where sender != ${request} and is_read = false) as d on d.chatroom_id = a.id
	  inner join users as e on e.id = user1
    where is_saved = false
    group by a.id, user1, user2, is_pinned, is_saved, contact_id, c.friend_name, user2_photo, user1_photo, c.phone, c.is_online
	  having count(d.is_read) = 0
    ORDER BY a.timestamp DESC`;
    const query2 = `SELECT messages.text, messages.sender, messages.is_read FROM messages INNER JOIN chatrooms ON chatrooms.id = messages.chatroom_id WHERE chatrooms.id = ${request} ORDER BY messages.timestamp DESC LIMIT 1`;

    return { query1, query2 };
  },

  search: (request) => {
    const query = `SELECT a.id as chatroom_id, a.timestamp, user1, user2, is_pinned, is_saved, c.id as contact_id, c.friend_name, c.photo as user2_photo, c.phone, c.is_online, count(d.is_read) as unread, e.photo as user1_photo
    from chatrooms as a
    inner join (select a.user_id as user1, b.user_id as user2, a.chatroom_id, a.is_pinned, a.is_saved
    from chatroom_members as a, chatroom_members as b
    where a.chatroom_id = b.chatroom_id and a.user_id = ${request.id} and b.user_id != ${request.id}) as b
    on b.chatroom_id = a.id
    inner join (select a.id, a.user_id, a.friend_id, a.friend_name, b.photo, b.phone, c.is_online from contacts as a
    inner join users as b on b.id = a.friend_id inner join user_status as c on c.user_id = a.friend_id) as c on c.user_id = user1 and c.friend_id = user2
    left join (select * from messages where sender != ${request.id} and is_read = false) as d on d.chatroom_id = a.id
	  inner join users as e on e.id = user1
    where is_saved = false and friend_name like '%${request.search}%'
    group by a.id, user1, user2, is_pinned, is_saved, contact_id, c.friend_name, user2_photo, user1_photo, c.phone, c.is_online
    order by is_pinned desc`;

    return { query };
  },

  addNew: (request, id = null) => {
    const { user1, user2 } = request;
    const find = `select a.user_id as user1, b.user_id as user2, a.chatroom_id, a.is_pinned, a.is_saved
                  from chatroom_members as a, chatroom_members as b
                  where a.chatroom_id = b.chatroom_id and a.user_id = ${user1} and b.user_id = ${user2}`;
    const addChatroom = `INSERT INTO chatrooms(timestamp) VALUES('now()') RETURNING id`;
    const addMember = `INSERT INTO chatroom_members(chatroom_id, user_id, is_pinned, is_saved) 
                        VALUES(${id}, ${user1}, false, false), (${id}, ${user2}, false, false)`;

    return { find, addChatroom, addMember };
  },

  updateChatroom: (request) => {
    const { is_pinned, is_saved, id, chatroom_id } = request;
    const query = `update chatroom_members set is_pinned = ${is_pinned}, is_saved = ${is_saved} where user_id = ${id} and chatroom_id = ${chatroom_id}`;

    return query;
  },

  delete: (request) => {
    const query = `DELETE FROM chatrooms WHERE id = ${request.id}`;

    return query;
  },
};

module.exports = queryChatroom;
