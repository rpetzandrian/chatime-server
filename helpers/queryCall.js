const { request } = require("express");

const queryCall = {
  getAll: (request) => {
    const { id, limit = 2, page = 1 } = request;
    const query = `SELECT * FROM call_history WHERE from_id = ${id} OR to_id = ${id} ORDER BY created_at DESC LIMIT ${limit} OFFSET ${
      (page - 1) * limit
    }`;

    return query;
  },

  addNew: (request) => {
    const { from, to, is_missed = false, is_rejected = false } = request;
    const query = `INSERT INTO call_history(from, to, is_missed, is_rejected, timestamp) VALUES(${from}, ${to}, ${is_missed}, ${is_rejected}, 'now()')`;

    return query;
  },

  update: (request, initialValue) => {
    const {
      is_missed = initialValue.rows[0].is_missed,
      is_rejected = initialValue.rows[0].is_rejected,
    } = request;
    const query = `UPDATE FROM call_history SET is_missed = ${is_missed}, is_rejected = ${is_rejected}, timestamp = 'now()'`;

    return query;
  },

  delete: (request) => {
    const query = `DELETE FROM call_history WHERE id = ${request}`;
    return query;
  },
};

module.exports = queryCall;
