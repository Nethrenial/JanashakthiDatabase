const express = require("express");
const homeController = require("../services/home.service");

const router = express.Router();

router.get("/", homeController.getHomepage);

module.exports = router;
