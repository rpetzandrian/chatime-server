const contactModel = require("../models/Contact");

const ContactController = {
  getAllContacts: async (req, res) => {
    try {
      const result = await contactModel.getAllContacts(req.params.id);
      res.status(200).send({
        message: "Success get all contacts",
        statusCode: 200,
        data: result,
      });
    } catch (err) {
      res.status(err.statusCode).send({
        message: err.message,
        statusCode: err.statusCode,
      });
    }
  },

  deleteContact: async (req, res) => {
    try {
      const request = {
        userID: req.params.id,
        friendID: req.params.friend_id,
      };
      const result = await contactModel.deleteContact(request);
      res.status(200).send({
        message: "Delete contact success",
        statusCode: 200,
      });
    } catch (err) {
      res.status(err.statusCode).send({
        message: err.message,
        statusCode: err.statusCode,
      });
    }
  },
};

module.exports = ContactController;
