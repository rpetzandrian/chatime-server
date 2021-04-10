const router = require("express").Router();
const messageController = require("../controllers/MessageController");
const fileUpload = require("../helpers/fileUploads");
const verify = require("../helpers/jwt");

router.get(
  "/:id/:chatroom_id",
  verify.verifyUserWithId,
  messageController.getAllMessages
);

router.patch(
  "/:id/:chatroom_id",
  verify.verifyUserWithId,
  messageController.editRead
);

router.post("/:id", verify.verifyUserWithId, messageController.addNewMessage);
router.post(
  "/:id/images",
  verify.verifyUserWithId,
  fileUpload.uploadImage,
  messageController.addNewMessage
);
router.post(
  "/:id/file",
  verify.verifyUserWithId,
  fileUpload.uploadFile,
  messageController.addNewMessage
);
router.post(
  "/:id/document",
  verify.verifyUserWithId,
  fileUpload.uploadDoc,
  messageController.addNewMessage
);

router.delete("/:message_id", messageController.deleteMessage);

module.exports = router;
