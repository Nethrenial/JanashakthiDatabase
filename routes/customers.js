const express = require("express");
const User = require("../models/user.model");
const Customer = require("../models/customer.model");
const router = express.Router();
const customerController = require("../controllers/customer.controller");

router.get("/", customerController.getCustomerpage);

router.get("/add-customer", customerController.getAddcustomerpage);

router.post("/add-customer", customerController.postAddcustomerpage);

router.get("/:id", (req, res) => {
  Customer.findById(req.params.id)
    .then((customer) => {
      res.render("single-customer", {
        data: customer,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/:id/delete", (req, res) => {
  Customer.findByIdAndDelete(req.params.id)
    .then((response) => {
      res.redirect("/customers");
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
