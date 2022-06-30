const { body } = require("express-validator");

const registerUserValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("Not a valid name")
      .isLength({ min: 4 })
      .withMessage("Name must be at least 4 character long"),

    body("email")
      .isEmail()
      .withMessage("Invalid Email")
      .isLength({ min: 7, max: 50 }),

    body("password")
      .isLength({ min: 5, max: 25 })
      .withMessage(
        "Password length must be minimum 5 character and maximum 25 character long"
      ),

    body("phone").isMobilePhone().withMessage("Enter a valid Phone Number"),

    body("location")
      .isString()
      .withMessage("Not a valid location")
      .isLength({ min: 4 })
      .withMessage("Location must be at least 4 character long"),
  ];
};

const loginUserValidation = () => {
  return [
    body("email")
      .isEmail()
      .withMessage("Invalid Email")
      .isLength({ min: 7, max: 50 }),

    body("password")
      .isLength({ min: 5, max: 25 })
      .withMessage(
        "Password length must be minimum 5 character and maximum 25 character long"
      ),
  ];
};

const parcelValidation = () => {
  return [
    body("code")
      .isNumeric()
      .withMessage("Invalid code")
      .isLength({ min: 4, max: 4 })
      .withMessage("Code must be 4 digit and mustn't exceed than that"),

    body("name")
      .isString()
      .withMessage("Invalid name")
      .isLength({ min: 4, max: 25 })
      .withMessage("Name must be at least 4 character long"),

    body("description")
      .isString()
      .withMessage("Invalid description")
      .isLength({ min: 4, max: 255 })
      .withMessage("Description must be at least 4 character long"),

    body("location")
      .isString()
      .withMessage("Not a valid location")
      .isLength({ min: 4 })
      .withMessage("Location must be at least 4 character long"),
  ];
};

const editParcelValidation = () => {
  return [
    body("code")
      .optional()
      .isNumeric()
      .withMessage("Invalid code")
      .isLength({ min: 4, max: 4 })
      .withMessage("Code must be 4 digit and mustn't exceed than that"),

    body("status").optional().isString().withMessage("Not a valid status"),

    body("remarks").optional().isArray().withMessage("Invalid remarks"),

    body("name")
      .optional()
      .isString()
      .withMessage("Invalid name")
      .isLength({ min: 4, max: 25 })
      .withMessage("Name must be at least 4 character long"),

    body("description")
      .optional()
      .isString()
      .withMessage("Invalid description")
      .isLength({ min: 4, max: 255 })
      .withMessage("Description must be at least 4 character long"),

    body("location")
      .optional()
      .isString()
      .withMessage("Not a valid location")
      .isLength({ min: 4 })
      .withMessage("Location must be at least 4 character long"),
  ];
};

module.exports = {
  registerUserValidation,
  loginUserValidation,
  parcelValidation,
  editParcelValidation,
};
