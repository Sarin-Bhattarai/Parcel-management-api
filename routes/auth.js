var express = require("express");
var router = express.Router();
var authController = require("../controllers/auth");
var {
  registerUserValidation,
  loginUserValidation,
} = require("../validations/index");
var handleError = require("../helpers/handleError");
var { wrapAsync } = require("../helpers/catchHandler");

//register new user into the system
router.post(
  "/register",
  registerUserValidation(),
  handleError,
  wrapAsync(authController.registerUser)
);

// logging existing user into the system
router.post(
  "/login",
  loginUserValidation(),
  handleError,
  wrapAsync(authController.loginUser)
);

module.exports = router;
