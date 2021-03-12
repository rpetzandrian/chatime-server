const router = require("express").Router();
const userController = require("../controllers/UserController");
const fileUpload = require("../helpers/fileUpload");
const verify = require("../helpers/jwt");

router.get("/", verify.isAdminVerify, userController.getAllUsers);

router.get("/search", verify.isAdminVerify, userController.searchUsersByName);

router.get("/:id", verify.verifyUserWithId, userController.getUserById);

router.post(
  "/",
  verify.isAdminVerify,
  fileUpload.uploadPhoto,
  userController.addNewUser
);

router.patch(
  "/update/:id",
  verify.verifyUserWithId,
  fileUpload.uploadPhoto,
  userController.updateProfile
);

router.patch(
  "/:id",
  verify.isAdminVerify,
  fileUpload.uploadPhoto,
  userController.updateUser
);

router.delete("/:id", verify.isAdminVerify, userController.deleteUser);

module.exports = router;
