const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");

const mongoose = require("mongoose");
const hbs = require("hbs");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const authorisationRouter = require("./routes/authorisation");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect("mongodb://localhost:27017/mytestapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(connection => {
    console.log("successfully connected");
  })
  .catch(err => {
    console.log(err);
  });

//Session middleware. This will take care of storing the session in mongo,
//and
app.use(
  session({
    secret: "wow much secret, very secret", //encrypts cookie (so it hashes)
    cookie: { maxAge: 10000 }, // options for cookie storage
    resave: false, //don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    })
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//authorisation is first callback and checks if
//the session is stored

app.get("/profile", authorisationRouter, (req, res) => {
  res.render("profile", { user: req.session.currentUser });
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
