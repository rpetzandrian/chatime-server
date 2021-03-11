const chatModel = require("../models/Chat");
const emptyInputMessage = require("../helpers/emptyInputMessage");

const ChatController = {
  getChatrooms: async (req, res) => {
    const request = { ...req.query, id: req.params.id };
    try {
      const result = await chatModel.getChatrooms(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  addNewChatroom: async (req, res) => {
    const user1 = req.params.id;
    const { user2 } = req.body;
    if (user1 !== undefined && user2 !== undefined && user1 !== user2) {
      try {
        const request = {
          user1: parseInt(user1),
          user2: parseInt(user2),
        };
        const result = await chatModel.addNewChatroom(request);
        res.status(result.statusCode).send(result);
      } catch (err) {
        res.status(err.statusCode).send(err);
      }
    } else {
      emptyInputMessage(res);
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
    const request = { ...req.query, chatroom_id: req.params.chatroom_id };
    try {
      const result = await chatModel.getMessageByChatroom(request);
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
    const chatroom_id = req.params.chatroom_id;
    const { sender_id, receiver_id } = req.body;
    if (
      chatroom_id !== undefined &&
      sender_id !== undefined &&
      receiver_id !== undefined &&
      sender_id !== receiver_id
    ) {
      const request = {
        ...req.body,
        chatroom_id: chatroom_id,
        sender_id: sender_id,
        receiver_id: receiver_id,
      };
      try {
        const result = await chatModel.addNewMessage(request);
        res.status(result.statusCode).send(result);
      } catch (err) {
        res.status(err.statusCode).send(err);
      }
    } else {
      emptyInputMessage(res);
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
