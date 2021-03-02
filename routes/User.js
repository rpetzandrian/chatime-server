const router = require("express").Router();
const UserController = require("../controllers/UserController");

router.get("/", UserController.getAllUsers);

router.get("/:id", UserController.getUserById);

router.post("/", UserController.addNewUser);

router.delete("/:id", UserController.deleteUser);

module.exports = router;
