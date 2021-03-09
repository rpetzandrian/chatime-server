const queryContact = {
  getAll: (request) => {
    const q1 = `SELECT contact_id, user_id FROM contacts WHERE user_id = ${request}`;
    const q2 = `SELECT contacts.friend_id, contacts.friend_name, username, email, phone, photo, bio FROM contacts INNER JOIN users ON contacts.friend_id = users.id WHERE contacts.user_id = ${request}`;

    return { q1, q2 };
  },

  getByFriend: (request) => {
    const q1 = `SELECT contact_id, user_id FROM contacts WHERE user_id = ${request.user_id} AND friend_id = ${request.friend_id}`;
    const q2 = `SELECT contacts.friend_id, contacts.friend_name, username, email, phone, photo, bio FROM contacts INNER JOIN users ON contacts.friend_id = users.id WHERE contacts.user_id = ${request.user_id} AND friend_id = ${request.friend_id}`;

    return { q1, q2 };
  },

  search: (request) => {
    const query = `SELECT contacts.friend_id, contacts.friend_name, username, email, phone, photo, bio FROM contacts INNER JOIN users ON contacts.friend_id = users.id WHERE LOWER(contacts.friend_name) LIKE '%${request.name.toLowerCase()}%' ORDER BY contacts.friend_name ASC`;

    return query;
  },

  addNew: (request) => {
    let { user_id, friend_id, friend_name = null } = request;
    const query = `INSERT into contacts(user_id, friend_id, friend_name) VALUES($1, $2, $3)`;
    const values = [user_id, friend_id, friend_name];

    return { query, values };
  },

  update: (request, initialValue) => {
    const q1 = `SELECT * FROM contacts WHERE user_id = ${request.userID} AND friend_id=${request.friendID}`;
    let {
      friendName = initialValue.rows[0].friend_name || null,
      userID,
      friendID,
    } = request;
    const q2 = `UPDATE contacts SET friend_name = '${friendName}' WHERE user_id = ${userID} AND friend_id= ${friendID}`;

    return { q1, q2 };
  },

  delete: (request) => {
    const query = `DELETE FROM contacts WHERE user_id = ${request.userID} AND friend_id = ${request.friendID}`;

    return query;
  },
};

module.exports = queryContact;