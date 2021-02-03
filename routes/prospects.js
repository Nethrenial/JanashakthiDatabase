const User = require("../models/user.model");
const Prospect = require("../models/prospect.model");
const Customer = require("../models/customer.model");
const express = require("express");

const router = express.Router();
const prospectController = require("../controllers/prospects.controller");

router.get("/", prospectController.getProspectpage);

router.get("/add-prospect", prospectController.getAddprospectpage);
router.post("/add-prospect", prospectController.postAddprospectpage);

router.get("/:id", (req, res) => {
  Prospect.findById(req.params.id)
    .then((prospect) => {
      res.render("single-prospect", {
        data: prospect,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id/delete", (req, res) => {
  Prospect.findByIdAndDelete(req.params.id)
    .then((response) => {
      res.redirect("/prospects");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/:id/transform", (req, res) => {
  const { premium, premiumterm } = req.body;
  Prospect.findById(req.params.id)
    .then((response) => {
      const customer = new Customer({
        name: response.name,
        address: response.address,
        birthday: response.birthday,
        moredetails: response.moredetails,
        familydetails: response.familydetails,
        contactno: response.contactno,
        premium: premium,
        premiumterm: premiumterm,
        agent: response.agent,
      });
      customer
        .save()
        .then((response) => {
          Prospect.findByIdAndDelete(req.params.id)
            .then(res.redirect("/user"))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
