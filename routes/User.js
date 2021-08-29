const router = require("express").Router();
const userController = require("../controllers/UserController");
const photoUpload = require("../helpers/photoUpload");
const verify = require("../helpers/jwt");

router.get("/", verify.isAdminVerify, userController.getAllUsers);

router.get("/search", userController.searchUsersByName);

router.get("/:id", verify.verifyUserWithId, userController.getUserById);

router.post("/", photoUpload.uploadPhoto, userController.addNewUser);

router.patch("/update/:id", userController.updateProfile);

router.patch("/:id", photoUpload.uploadPhoto, userController.updateUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;
