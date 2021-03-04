const chatModel = require("../models/Chat");

const ChatController = {
  getChatrooms: async (req, res) => {
    try {
      const result = await chatModel.getChatrooms(req.params.id);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  addNewChatroom: async (req, res) => {
    try {
      const request = {
        user1: parseInt(req.body.user1),
        user2: parseInt(req.body.user2),
      };
      const result = await chatModel.addNewChatroom(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  deleteChatroom: async (req, res) => {
    try {
      const result = await chatModel.deleteChatroom(req.params.chatroom_id);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  getMessageByChatroom: async (req, res) => {
    try {
      const result = await chatModel.getMessageByChatroom(
        req.params.chatroom_id
      );
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  getLastMessageByChatroom: async (req, res) => {
    try {
      const result = await chatModel.getLastMessageByChatroom(
        req.params.chatroom_id
      );
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  addNewMessage: async (req, res) => {
    try {
      const result = await chatModel.addNewMessage(req.body);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  deleteMessage: async (req, res) => {
    try {
      const result = await chatModel.deleteMessage(req.params.message_id);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },
};

module.exports = ChatController;
