const { logOut } = require("./auth.controller");

exports.getUserpage = (req, res, next) => {
  const user = req.session.user;
  if (user) {
    res.render("user", {
      user: user,
    });
  } else {
    res.redirect("/");
  }
};
