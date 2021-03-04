const userModel = require("../models/User");
const emptyInputMessage = require("../helpers/emptyInputMessage");

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const result = await userModel.getAllUsers();
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  getUserById: async (req, res) => {
    try {
      const result = await userModel.getUserById(req.params.id);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  addNewUser: async (req, res) => {
    if (req.body.email !== undefined && req.body.password !== undefined) {
      try {
        const result = await userModel.addNewUser(req.body);
        res.status(result.statusCode).send(result);
      } catch (err) {
        res.status(err.statusCode).send(err);
      }
    } else {
      emptyInputMessage(res);
    }
  },

  updateUser: async (req, res) => {
    try {
      const result = await userModel.updateUser(req.params.id, req.body);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  searchUsersByName: async (req, res) => {
    try {
      const result = await userModel.searchUsersByName(req.query.name);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const result = await userModel.deleteUser(req.params.id);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },
};

module.exports = UserController;
