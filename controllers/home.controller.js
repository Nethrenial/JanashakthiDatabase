exports.getHomepage = (req, res, next) => {
  // req.session.destroy((err) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.status(200).render("index");
  //   }
  // });
  const user = req.session.user;
  if (user) {
    res.redirect("user");
  } else {
    console.log("Not logged in");
    res.render("index");
  }
};
