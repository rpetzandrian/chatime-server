const userModel = require("../models/User");
const emptyInputMessage = require("../helpers/emptyInputMessage");
const { request } = require("express");

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const result = await userModel.getAllUsers(req.query);
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
    const request = {
      ...req.body,
      photo:
        req.file == undefined
          ? undefined
          : `uploads/photos/${req.file.filename}`,
    };
    const { email, password, name } = req.body;
    if (email !== undefined && password !== undefined && name !== undefined) {
      try {
        const result = await userModel.addNewUser(request);
        res.status(result.statusCode).send(result);
      } catch (err) {
        res.status(err.statusCode).send(err);
      }
    } else {
      emptyInputMessage(res);
    }
  },

  updateUser: async (req, res) => {
    const request = {
      ...req.body,
      id: req.params.id,
      photo:
        req.file == undefined
          ? undefined
          : `uploads/photos/${req.file.filename}`,
    };
    try {
      const result = await userModel.updateUser(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  updateProfile: async (req, res) => {
    const request = {
      ...req.body,
      id: req.params.id,
      photo:
        req.file == undefined
          ? undefined
          : `uploads/photos/${req.file.filename}`,
    };
    try {
      const result = await userModel.updateProfile(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  searchUsersByName: async (req, res) => {
    try {
      const result = await userModel.searchUsersByName(req.query);
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
