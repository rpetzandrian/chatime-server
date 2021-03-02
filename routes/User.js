const router = require("express").Router();
const UserController = require("../controllers/UserController");

router.get("/", UserController.getAllUsers);

router.post("/", UserController.addNewUser);

module.exports = router;
