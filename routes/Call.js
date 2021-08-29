const router = require("express").Router();
const callController = require("../controllers/CallController");

router.get("/", callController.getAllCallHistory);

router.post("/", callController.addNewCall);

router.patch("/:call_id", callController.updateCall);

router.delete("/:call_id", callController.deleteCall);

module.exports = router;
