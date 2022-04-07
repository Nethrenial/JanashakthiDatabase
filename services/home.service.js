exports.getHomepage = (req, res, next) => {
  const user = req.session.user;
  if (user) {
    res.redirect("user");
  } else {
    console.log("Not logged in");
    res.render("index");
  }
};
