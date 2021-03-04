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
};

module.exports = ChatController;
