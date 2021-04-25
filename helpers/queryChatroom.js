const { request } = require("express");

const queryChatroom = {
  getAll: (request) => {
    const query1 = `SELECT a.id as chatroom_id, a.lastmessage, user1, user2, is_pinned, is_saved, c.id as contact_id, c.friend_name as user2_name, count(d.is_read) as unread, e.photo as user1_photo, f.photo as user2_photo, f.phone as user2_phone, f.is_online, g.text as messagetext, g.timestamp, g.sender as lastsender, g.is_read as lastread
    from chatrooms as a
    inner join (select a.user_id as user1, b.user_id as user2, a.chatroom_id, a.is_pinned, a.is_saved
    from chatroom_members as a, chatroom_members as b
    where a.chatroom_id = b.chatroom_id and a.user_id = ${request} and b.user_id != ${request}) as b
    on b.chatroom_id = a.id
    left join (select a.id, a.user_id, a.friend_id, a.friend_name from contacts as a) as c on c.user_id = user1 and c.friend_id = user2
    left join (select * from messages where sender != ${request} and is_read = false) as d on d.chatroom_id = a.id
	  inner join users as e on e.id = user1
	  inner join (select a.id, a.phone, a.photo, b.is_online from users as a inner join user_status as b on b.user_id = a.id) as f on f.id = user2
	  left join messages as g on g.id = a.lastmessage
    where is_saved = false
    group by a.id, user1, user2, is_pinned, is_saved, contact_id, c.friend_name, user1_photo, user2_photo, user2_phone, f.is_online, g.text, lastsender, lastread, g.timestamp
    order by is_pinned desc`;
    const query2 = `SELECT messages.text, messages.sender, messages.is_read FROM messages INNER JOIN chatrooms ON chatrooms.id = messages.chatroom_id WHERE chatrooms.id = ${request} ORDER BY messages.timestamp DESC LIMIT 1`;

    return { query1, query2 };
  },

  getAllImportant: (request) => {
    const query1 = `SELECT a.id as chatroom_id, a.lastmessage, user1, user2, is_pinned, is_saved, c.id as contact_id, c.friend_name as user2_name, count(d.is_read) as unread, e.photo as user1_photo, f.photo as user2_photo, f.phone as user2_phone, f.is_online, g.text as messagetext, g.timestamp, g.sender as lastsender, g.is_read as lastread
    from chatrooms as a
    inner join (select a.user_id as user1, b.user_id as user2, a.chatroom_id, a.is_pinned, a.is_saved
    from chatroom_members as a, chatroom_members as b
    where a.chatroom_id = b.chatroom_id and a.user_id = ${request} and b.user_id != ${request}) as b
    on b.chatroom_id = a.id
    left join (select a.id, a.user_id, a.friend_id, a.friend_name from contacts as a) as c on c.user_id = user1 and c.friend_id = user2
    left join (select * from messages where sender != ${request} and is_read = false) as d on d.chatroom_id = a.id
	  inner join users as e on e.id = user1
	  inner join (select a.id, a.phone, a.photo, b.is_online from users as a inner join user_status as b on b.user_id = a.id) as f on f.id = user2
	  left join messages as g on g.id = a.lastmessage
    where is_saved = false
    group by a.id, user1, user2, is_pinned, is_saved, contact_id, c.friend_name, user1_photo, user2_photo, user2_phone, f.is_online, g.text, lastsender, lastread, g.timestamp
    ORDER BY g.timestamp DESC`;
    const query2 = `SELECT messages.text, messages.sender, messages.is_read FROM messages INNER JOIN chatrooms ON chatrooms.id = messages.chatroom_id WHERE chatrooms.id = ${request} ORDER BY messages.timestamp DESC LIMIT 1`;

    return { query1, query2 };
  },

  getAllUnread: (request) => {
    const query1 = `SELECT a.id as chatroom_id, a.lastmessage, user1, user2, is_pinned, is_saved, c.id as contact_id, c.friend_name as user2_name, count(d.is_read) as unread, e.photo as user1_photo, f.photo as user2_photo, f.phone as user2_phone, f.is_online, g.text as messagetext, g.timestamp, g.sender as lastsender, g.is_read as lastread
    from chatrooms as a
    inner join (select a.user_id as user1, b.user_id as user2, a.chatroom_id, a.is_pinned, a.is_saved
    from chatroom_members as a, chatroom_members as b
    where a.chatroom_id = b.chatroom_id and a.user_id = ${request} and b.user_id != ${request}) as b
    on b.chatroom_id = a.id
    left join (select a.id, a.user_id, a.friend_id, a.friend_name from contacts as a) as c on c.user_id = user1 and c.friend_id = user2
    left join (select * from messages where sender != ${request} and is_read = false) as d on d.chatroom_id = a.id
	  inner join users as e on e.id = user1
	  inner join (select a.id, a.phone, a.photo, b.is_online from users as a inner join user_status as b on b.user_id = a.id) as f on f.id = user2
	  left join messages as g on g.id = a.lastmessage
    where is_saved = false
    group by a.id, user1, user2, is_pinned, is_saved, contact_id, c.friend_name, user1_photo, user2_photo, user2_phone, f.is_online, g.text, lastsender, lastread, g.timestamp
    having count(d.is_read) > 0 
    order by unread desc`;
    const query2 = `SELECT messages.text, messages.sender, messages.is_read FROM messages INNER JOIN chatrooms ON chatrooms.id = messages.chatroom_id WHERE chatrooms.id = ${request} ORDER BY messages.timestamp DESC LIMIT 1`;

    return { query1, query2 };
  },

  getAllRead: (request) => {
    const query1 = `SELECT a.id as chatroom_id, a.lastmessage, user1, user2, is_pinned, is_saved, c.id as contact_id, c.friend_name as user2_name, count(d.is_read) as unread, e.photo as user1_photo, f.photo as user2_photo, f.phone as user2_phone, f.is_online, g.text as messagetext, g.timestamp, g.sender as lastsender, g.is_read as lastread
    from chatrooms as a
    inner join (select a.user_id as user1, b.user_id as user2, a.chatroom_id, a.is_pinned, a.is_saved
    from chatroom_members as a, chatroom_members as b
    where a.chatroom_id = b.chatroom_id and a.user_id = ${request} and b.user_id != ${request}) as b
    on b.chatroom_id = a.id
    left join (select a.id, a.user_id, a.friend_id, a.friend_name from contacts as a) as c on c.user_id = user1 and c.friend_id = user2
    left join (select * from messages where sender != ${request} and is_read = false) as d on d.chatroom_id = a.id
	  inner join users as e on e.id = user1
	  inner join (select a.id, a.phone, a.photo, b.is_online from users as a inner join user_status as b on b.user_id = a.id) as f on f.id = user2
	  left join messages as g on g.id = a.lastmessage
    where is_saved = false
    group by a.id, user1, user2, is_pinned, is_saved, contact_id, c.friend_name, user1_photo, user2_photo, user2_phone, f.is_online, g.text, lastsender, lastread, g.timestamp
	  having count(d.is_read) = 0
    ORDER BY a.timestamp DESC`;
    const query2 = `SELECT messages.text, messages.sender, messages.is_read FROM messages INNER JOIN chatrooms ON chatrooms.id = messages.chatroom_id WHERE chatrooms.id = ${request} ORDER BY messages.timestamp DESC LIMIT 1`;

    return { query1, query2 };
  },

  search: (request) => {
    const query = `SELECT a.id as chatroom_id, a.lastmessage, user1, user2, is_pinned, is_saved, c.id as contact_id, c.friend_name as user2_name, count(d.is_read) as unread, e.photo as user1_photo, f.photo as user2_photo, f.phone as user2_phone, f.is_online, g.text as messagetext, g.timestamp, g.sender as lastsender, g.is_read as lastread
    from chatrooms as a
    inner join (select a.user_id as user1, b.user_id as user2, a.chatroom_id, a.is_pinned, a.is_saved
    from chatroom_members as a, chatroom_members as b
    where a.chatroom_id = b.chatroom_id and a.user_id = ${request.id} and b.user_id != ${request.id}) as b
    on b.chatroom_id = a.id
    left join (select a.id, a.user_id, a.friend_id, a.friend_name from contacts as a) as c on c.user_id = user1 and c.friend_id = user2
    left join (select * from messages where sender != ${request.id} and is_read = false) as d on d.chatroom_id = a.id
	  inner join users as e on e.id = user1
	  inner join (select a.id, a.phone, a.photo, b.is_online from users as a inner join user_status as b on b.user_id = a.id) as f on f.id = user2
	  left join messages as g on g.id = a.lastmessage
    where is_saved = false and friend_name like '%${request.search}%' or g.text like '%${request.search}%'
    group by a.id, user1, user2, is_pinned, is_saved, contact_id, c.friend_name, user1_photo, user2_photo, user2_phone, f.is_online, g.text, lastsender, lastread, g.timestamp
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
