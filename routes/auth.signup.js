const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.get("/", authController.getSignuppage);
router.post("/", authController.postSignuppage);

module.exports = router;
