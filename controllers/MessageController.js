const messageModel = require("../models/Message");

const MessageController = {
  getAllMessages: async (req, res) => {
    const request = {
      id: req.params.id,
      chatroom_id: req.params.chatroom_id,
    };
    try {
      const result = await messageModel.getAllMessages(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  editRead: async (req, res) => {
    const request = {
      id: req.params.id,
      chatroom_id: req.params.chatroom_id,
    };
    try {
      const result = await messageModel.editRead(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  addNewMessage: async (req, res) => {
    if (req.files !== undefined) {
      const request = {
        ...req.body,
        images: req.files[0].fieldname == "images" ? req.files : null,
        file: req.files[0].fieldname == "file" ? req.files : null,
        document: req.files[0].fieldname == "document" ? req.files : null,
      };
      try {
        const result = await messageModel.addNewMessage(request);
        res.status(result.statusCode).send(result);
      } catch (err) {
        console.log(err);
        res.status(err.statusCode).send(err);
      }
      return;
    }

    const request = {
      ...req.body,
      images: null,
      file: null,
      document: null,
    };
    try {
      const result = await messageModel.addNewMessage(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      console.log(err);
      res.status(err.statusCode).send(err);
    }
  },

  deleteMessage: async (req, res) => {
    const request = {
      id: req.params.message_id,
      chatroom: req.query.chatroom,
    };
    try {
      const result = await messageModel.deleteMessage(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },
};

module.exports = MessageController;
