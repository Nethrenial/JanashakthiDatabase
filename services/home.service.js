exports.getHomepage = (req, res, next) => {
  const user = req.session.user;
  if (user) {
    res.redirect("user");
  } else {
    res.render("index");
  }
};
