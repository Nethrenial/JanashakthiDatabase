const express = require("express");
const router = express.Router();
const authController = require("../services/auth.service");

router.get("/", authController.logOut);

module.exports = router;
