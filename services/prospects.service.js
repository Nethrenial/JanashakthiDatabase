const Prospect = require("../models/prospect.model");
const User = require("../models/user.model");

const ITEMS_PER_PAGE = 2;

exports.getProspectpage = (req, res, next) => {
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
    Prospect.find({ agent: user._id })
      .countDocuments()
      .then((numProspects) => {
        let totalItems = numProspects;
        return Prospect.find({
          agent: user._id,
        })
          .skip((page - 1) * ITEMS_PER_PAGE)
          .limit(ITEMS_PER_PAGE)
          .then((data) => {
            res.render("prospects", {
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

exports.getAddprospectpage = (req, res, next) => {
  const user = req.session.user;
  res.status(200).render("add-prospect", {
    user: user,
  });
};

exports.postAddprospectpage = (req, res, next) => {
  const { name, birthday, address, contactno, familydetails, moredetails } =
    req.body;
  const prospect = new Prospect({
    name: name,
    birthday: birthday,
    address: address,
    contactno: contactno,
    familydetails: familydetails,
    moredetails: moredetails,
    agent: req.session.user._id,
  });

  Prospect.findOne(
    {
      name: name,
    },
    (err, prospector) => {
      if (err) {
        console.log(err);
      } else {
        if (!prospector) {
          prospect
            .save()
            .then((response) => {})
            .catch((err) => {
              console.log(err);
            });
          res.redirect("/prospects");
        } else {
          res.redirect("/prospects/add-prospect");
        }
      }
    }
  );
};
