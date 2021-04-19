const chatroomModel = require("../models/Chatroom");
const emptyInputMessage = require("../helpers/emptyInputMessage");

const ChatroomController = {
  getAllChatrooms: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await chatroomModel.getAllChatrooms(id);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  getAllChatroomsImportant: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await chatroomModel.getAllChatroomsImportant(id);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  getAllChatroomsUnread: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await chatroomModel.getAllChatroomsUnread(id);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  getAllChatroomsRead: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await chatroomModel.getAllChatroomsRead(id);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  searchByKeyword: async (req, res) => {
    const request = {
      id: req.params.id,
      search: req.query.keyword,
    };
    try {
      const result = await chatroomModel.searchChatrooms(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  addNewChatroom: async (req, res) => {
    const request = {
      user1: req.params.id,
      user2: req.body.user2,
    };
    try {
      const result = await chatroomModel.addNewChatroom(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  updateChatroom: async (req, res) => {
    const request = {
      id: req.params.id,
      chatroom_id: req.params.chatroom_id,
      is_pinned: req.body.is_pinned === undefined ? null : req.body.is_pinned,
      is_saved: req.body.is_saved === undefined ? null : req.body.is_saved,
    };
    try {
      const result = await chatroomModel.updateChatroom(request);
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
