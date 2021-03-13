const router = require("express").Router();
const chatroomController = require("../controllers/ChatroomController");

router.get("/:user_id", chatroomController.getAllChatrooms);

router.get("/:user_id/important", chatroomController.getAllChatroomsImportant);

router.get("/:user_id/unread", chatroomController.getAllChatroomsUnread);

router.get("/:user_id/read", chatroomController.getAllChatroomsRead);

router.post("/:user_id", chatroomController.addNewChatroom);

router.delete("/:chatroom_id", chatroomController.deleteChatroom);

module.exports = router;
