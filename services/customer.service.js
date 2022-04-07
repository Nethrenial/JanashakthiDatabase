const { response } = require("express");
const Customer = require("../models/customer.model");
const ITEMS_PER_PAGE = 2;
exports.getCustomerpage = (req, res, next) => {
  let page = req.query.page;
  if (page < 1) {
    page = 1;
  }
  let currentPage = page;
  let previousPage = page - 1;
  let nextPage = currentPage + 1;
  const user = req.session.user;

  if (!user) {
    res.redirect("/");
  } else {
    Customer.find({ agent: user._id })
      .countDocuments()
      .then((numCustomers) => {
        let totalItems = numCustomers;
        return Customer.find({
          agent: user._id,
        })
          .skip((page - 1) * ITEMS_PER_PAGE)
          .limit(ITEMS_PER_PAGE)
          .then((data) => {
            res.render("customers", {
              user: user,
              data: data,
              currentPage: currentPage,
              nextPage: nextPage,
              previousPage: previousPage,
              totalItems: totalItems,
              numOfPages: Math.ceil(totalItems / ITEMS_PER_PAGE),
              hasNextPage: ITEMS_PER_PAGE * page < totalItems,
              hasPreviousPage: page > 1,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch();
  }
};

exports.getAddcustomerpage = (req, res, next) => {
  const user = req.session.user;
  res.status(200).render("add-customer", {
    user: user,
  });
};

exports.postAddcustomerpage = (req, res, next) => {
  const {
    name,
    birthday,
    address,
    contactno,
    familydetails,
    moredetails,
    premiumterm,
    premium,
  } = req.body;
  const customer = new Customer({
    name: name,
    birthday: birthday,
    address: address,
    contactno: contactno,
    familydetails: familydetails,
    moredetails: moredetails,
    premiumterm: premiumterm,
    premium: premium,
    agent: req.session.user._id,
  });
  customer
    .save()
    .then((response) => {
      res.redirect("/customers");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/customers/add-customer");
    });
};
