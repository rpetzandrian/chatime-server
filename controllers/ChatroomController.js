const chatroomModel = require("../models/Chatroom");
const emptyInputMessage = require("../helpers/emptyInputMessage");

const ChatroomController = {
  getAllChatrooms: async (req, res) => {
    const id = req.params.user_id;
    try {
      const result = await chatroomModel.getAllChatrooms(id);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  getAllChatroomsImportant: async (req, res) => {
    const id = req.params.user_id;
    try {
      const result = await chatroomModel.getAllChatroomsImportant(id);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  getAllChatroomsUnread: async (req, res) => {
    const id = req.params.user_id;
    try {
      const result = await chatroomModel.getAllChatroomsUnread(id);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  getAllChatroomsRead: async (req, res) => {
    const id = req.params.user_id;
    try {
      const result = await chatroomModel.getAllChatroomsRead(id);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  addNewChatroom: async (req, res) => {
    const request = {
      user1: req.params.user_id,
      user2: req.body.user2,
    };
    try {
      const result = await chatroomModel.addNewChatroom(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  deleteChatroom: async (req, res) => {
    const request = {
      id: req.params.chatroom_id,
    };
    try {
      const result = await chatroomModel.deleteChatroom(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },
};

module.exports = ChatroomController;
