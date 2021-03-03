const router = require("express").Router();
const contactController = require("../controllers/ContactController");

router.get("/:id", contactController.getAllContacts);

router.get("/search/:id", contactController.searcContactsByName);

router.post("/:id", contactController.addNewContact);

router.patch("/:id/:friend_id", contactController.updateContact);

router.delete("/:id/:friend_id", contactController.deleteContact);

module.exports = router;
