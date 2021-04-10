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
    if (req.file !== undefined) {
      const request = {
        ...req.body,
        images:
          req.file.fieldname == "images"
            ? `uploads/images/${req.file.filename}`
            : null,
        file:
          req.file.fieldname == "file"
            ? `uploads/files/${req.file.filename}`
            : null,
        document:
          req.file.fieldname == "document"
            ? `uploads/documents/${req.file.filename}`
            : null,
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
    const id = req.params.message_id;
    try {
      const result = await messageModel.deleteMessage(id);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },
};

module.exports = MessageController;
