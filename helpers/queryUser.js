const queryUser = {
  getAll: () => {
    return `SELECT id, name, username, email, phone, photo, bio FROM users ORDER BY name ASC`;
  },

  getById: (request) => {
    return `SELECT id, name, username, email, phone, photo, bio FROM users WHERE id = ${request}`;
  },

  addNew: (request) => {
    let {
      name,
      username = null,
      email,
      password,
      phone = null,
      photo = null,
      bio = null,
    } = request;

    const query = `INSERT INTO users(name, username, email, password, phone, photo, bio, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
    const values = [
      name,
      username,
      email,
      password,
      phone,
      photo,
      bio,
      `now()`,
      null,
    ];

    return { query, values };
  },

  update: (request, initialValue) => {
    let {
      name = initialValue.rows[0]?.name,
      username = initialValue.rows[0]?.username,
      email = initialValue.rows[0]?.email,
      password = initialValue.rows[0]?.password,
      phone = initialValue.rows[0]?.phone,
      photo = initialValue.rows[0]?.photo,
      bio = initialValue.rows[0]?.bio,
    } = request;
    return `UPDATE users SET name='${name}', username='${username}', email='${email}', password='${password}', phone='${phone}', photo='${photo}', bio='${bio}', updated_at='now()' WHERE id = '${request.id}'`;
  },

  searchByName: (request) => {
    return `SELECT id, name, username, email, phone, photo, bio FROM users WHERE LOWER(name) LIKE '%${request.toLowerCase()}%' ORDER BY name ASC `;
  },

  delete: (request) => {
    return `DELETE FROM users where id=${request}`;
  },
};

module.exports = queryUser;