const User = require("../models/user.model");
const bcrypt = require("bcrypt");

exports.getLoginpage = (req, res, next) => {
  const user = req.session.user;
  if (user) {
    res.redirect("/user");
  } else {
    let message1 = req.flash("success");
    let message2 = req.flash("error");
    if (message1.length === 0) {
      message1 = null;
    }
    if (message2.length === 0) {
      message2 = null;
    }
    res.status(200).render("login", {
      errorMessage: message2,
      successMessage: message1,
    });
  }
};
exports.postLoginpage = (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({ username: username }).then((user) => {
    if (!user) {
      req.flash("error", "Invalid Email or Password!");
      return res.redirect("/login");
    } else {
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (!doMatch) {
            req.flash("error", "Invalid Email or Password");
            return res.redirect("/login");
          } else {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return res.redirect("/user");
          }
        })
        .catch((err) => {
          console.log(err);
          return res.redirect("/login");
        });
    }
  });
};

exports.logOut = (req, res, next) => {
  req.session.destroy((err) => {
    if (!err) {
      res.redirect("/login");
    } else {
      console.log(err);
    }
  });
};
exports.getSignuppage = (req, res, next) => {
  const user = req.session.user;
  if (user) {
    res.redirect("/user");
  } else {
    res.status(200).render("signup", {
      errorMessage: req.flash("error"),
    });
  }
};
exports.postSignuppage = (req, res, next) => {
  const { username, email, password } = req.body;
  User.findOne({
    username: username,
  })
    .then((user) => {
      if (user) {
        return res.redirect("/signup");
      } else {
        return bcrypt
          .hash(password, 12)
          .then((hashedPassword) => {
            const user = new User({
              username: username,
              email: email,
              password: hashedPassword,
            });
            return user.save();
          })
          .then((response) => {
            console.log(response);
            req.flash("success", "Registered Successfully!");
            res.redirect("/login");
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
