require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
var logger = require("morgan");
var cors = require("cors");

var { devErrorHandler } = require("./helpers/catchHandler");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authsRouter = require("./routes/auth");
var parcelsRouter = require("./routes/parcel");

var app = express();
app.use(cors({ origin: "*" }));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Make frontend-build folder statically available to the world
app.use('/', express.static(path.join(__dirname,'frontend-build')))

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connection successfull"))
  .catch((err) => console.log(err));
  
// app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authsRouter);
app.use("/api/parcels", parcelsRouter);

//Send index.html for all other request
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname,'frontend-build', 'index.html'));
 });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

/**
 * @Displaying error message for undefined Api's
 */
app.use("*", (req, res, next) => {
  return res.json({
    status: "fail",
    data: { url: "api not found" },
  });
});
app.use(devErrorHandler);

module.exports = app;
