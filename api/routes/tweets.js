const express = require("express");
const router = express.Router();
const { getTweetsController } = require("../controllers/tweetsController");

router.get("/tweets", getTweetsController);

module.exports = router;
