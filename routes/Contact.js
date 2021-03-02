const router = require("express").Router();
const contactController = require("../controllers/ContactController");

router.get("/:id", contactController.getAllContacts);

router.delete("/:id/:friend_id", contactController.deleteContact);

module.exports = router;
