const router = require("express").Router();
const chatController = require("../controllers/ChatController");

router.get("/chatrooms/:id", chatController.getChatrooms);

router.post("/chatrooms", chatController.addNewChatroom);

router.delete("/chatrooms/:chatroom_id", chatController.deleteChatroom);

router.get("/messages/:chatroom_id", chatController.getMessageByChatroom);

router.get(
  "/messages/:chatroom_id/last",
  chatController.getLastMessageByChatroom
);

router.post("/messages", chatController.addNewMessage);

router.delete("/messages/:message_id", chatController.deleteMessage);

module.exports = router;
