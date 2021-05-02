const express = require("express");
const router = express.Router();

const radioController = require("../controllers/radioController");

router.get("/channels", radioController.getChannels); //This has nested schedules
router.get("/programs", radioController.getPrograms); //This has nested categories
router.get("/programs/:id", radioController.getProgramsById);


module.exports = router;