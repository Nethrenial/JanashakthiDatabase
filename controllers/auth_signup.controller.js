const express = require("express");
const router = express.Router();
const authController = require("../services/auth.service");

router.get("/", authController.getSignuppage);
router.post("/", authController.postSignuppage);

module.exports = router;
