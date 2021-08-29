const { request } = require("express");
const db = require("../helpers/connection_db");
const queryCall = require("../helpers/queryCall");
const responseMessage = require("../helpers/responseMessage");

const CallModel = {
  getAllCallHistory: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryCall.getAll(request);
      db.query(query, (err, result) => {
        if (!err) {
          if (result.rows.length < 1) {
            reject(responseMessage("Call not found", 400));
          } else {
            resolve(responseMessage("Success get call", 200, result.rows));
          }
        } else {
          reject(responseMessage("Error when get call", 500));
        }
      });
    });
  },

  addNewCall: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryCall.addNew(request);
      db.query(query, (err) => {
        if (!err) {
          resolve(responseMessage("Success add call", 201, request));
        } else {
          reject(responseMessage("Error when created call", 500));
        }
      });
    });
  },

  updateCall: (request) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM call_history WHERE id = ${request}`;
      db.query(query, (err, result) => {
        if (!err) {
          if (result.rows.length < 1) {
            reject(responseMessage("Call not found", 400));
          } else {
            const query = queryCall.update(result.rows[0]);
            db.query(query, (err) => {
              if (!err) {
                resolve(responseMessage("Success update call"));
              } else {
                reject(responseMessage("Error when update call_history", 500));
              }
            });
          }
        } else {
          reject(responseMessage("Error when update call_history", 500));
        }
      });
    });
  },

  deleteCall: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryCall.delete(request);
      db.query(query, (err) => {
        if (!err) {
          resolve(responseMessage("Success delete call history", 200));
        } else {
          reject(responseMessage("Delete call failed", 500));
        }
      });
    });
  },
};

module.exports = CallModel;
