const express = require("express");
const router = express.Router();
const authController = require("../services/auth.service");

router.get("/", authController.getLoginpage);
router.post("/", authController.postLoginpage);

module.exports = router;
