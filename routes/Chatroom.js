const router = require("express").Router();
const chatroomController = require("../controllers/ChatroomController");
const verify = require("../helpers/jwt");

router.get("/:id", verify.verifyUserWithId, chatroomController.getAllChatrooms);

router.get(
  "/:id/important",
  verify.verifyUserWithId,
  chatroomController.getAllChatroomsImportant
);

router.get(
  "/:id/unread",
  verify.verifyUserWithId,
  chatroomController.getAllChatroomsUnread
);

router.get(
  "/:id/read",
  verify.verifyUserWithId,
  chatroomController.getAllChatroomsRead
);

router.get(
  "/:id/search",
  verify.verifyUserWithId,
  chatroomController.searchByKeyword
);

router.post("/:id", verify.verifyUserWithId, chatroomController.addNewChatroom);

router.patch(
  "/:id/:chatroom_id",
  verify.verifyUserWithId,
  chatroomController.updateChatroom
);

router.delete(
  "/:id/:chatroom_id",
  verify.verifyUserWithId,
  chatroomController.deleteChatroom
);

module.exports = router;
