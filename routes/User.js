const router = require("express").Router();
const userController = require("../controllers/UserController");
const fileUpload = require("../helpers/fileUpload");
const verify = require("../helpers/jwt");

router.get("/", userController.getAllUsers);

router.get("/search", userController.searchUsersByName);

router.get("/:id", userController.getUserById);

router.post("/", fileUpload.uploadPhoto, userController.addNewUser);

router.patch("/update/:id", userController.updateProfile);

router.patch("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;
