const router = require("express").Router();
const chatController = require("../controllers/ChatController");

router.get("/chatrooms/:id", chatController.getChatrooms);

router.get("/messages/:chatroom_id", chatController.getMessageByChatroom);

module.exports = router;
