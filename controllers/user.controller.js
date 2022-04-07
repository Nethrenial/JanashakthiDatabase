const express = require("express");

const router = express.Router();
const userController = require("../services/user.service");

router.get("/", userController.getUserpage);

module.exports = router;
