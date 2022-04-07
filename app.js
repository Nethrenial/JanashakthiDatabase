const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");

//cCONSTANTS
const URI =
  "mongodb+srv://nethrenial:1234@janshakthi-prospect-dat.izszc.mongodb.net/janashakthi?w=majority";

const PORT = process.env.PORT || 3000;
//

const userRoutes = require("./controllers/user");
const prospectRoutes = require("./controllers/prospects");
const homeRoutes = require("./controllers/home");
const loginRoutes = require("./controllers/auth.login");
const logoutRoutes = require("./controllers/auth.logout");
const signupRoutes = require("./controllers/auth.signup");
const customerRoutes = require("./controllers/customers");
const app = express();

const store = new MongoDBStore({
  uri: URI,
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", "views");
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "B@manisawesome1939",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(flash());
app.use("/user", userRoutes);
app.use("/prospects", prospectRoutes);
app.use("/customers", customerRoutes);
app.use("/login", loginRoutes);
app.use("/logout", logoutRoutes);
app.use("/signup", signupRoutes);
app.use(homeRoutes);

app.use("/", (req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Page Not Found",
  });
});

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Connected to MongoDB Successfully");
    app.listen(PORT, () => {
      console.log(`Server running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
