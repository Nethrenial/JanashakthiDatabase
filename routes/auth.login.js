const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.get("/", authController.getLoginpage);
router.post("/", authController.postLoginpage);

module.exports = router;
