const router = require("express").Router();
const userController = require("../controllers/UserController");

router.get("/", userController.getAllUsers);

router.get("/search", userController.searchUsersByName);

router.get("/:id", userController.getUserById);

router.post("/", userController.addNewUser);

router.patch("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;
