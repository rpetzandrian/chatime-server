const contactModel = require("../models/Contact");

const ContactController = {
  getAllContacts: async (req, res) => {
    try {
      const result = await contactModel.getAllContacts(req.params.id);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  searcContactsByName: async (req, res) => {
    try {
      const request = {
        id: req.params.id,
        name: req.query.name,
      };
      const result = await contactModel.searchContactsByName(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  addNewContact: async (req, res) => {
    try {
      const request = {
        user_id: parseInt(req.params.id),
        friend_id: parseInt(req.body.friend_id),
        friend_name: req.body.friend_name,
      };
      const result = await contactModel.addNewContact(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  updateContact: async (req, res) => {
    try {
      const request = {
        userID: parseInt(req.params.id),
        friendID: parseInt(req.params.friend_id),
        friendName: req.body.friend_name,
      };
      const result = await contactModel.updateContact(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  deleteContact: async (req, res) => {
    try {
      const request = {
        userID: req.params.id,
        friendID: req.params.friend_id,
      };
      const result = await contactModel.deleteContact(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },
};

module.exports = ContactController;