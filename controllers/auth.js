var User = require("../models/user");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

module.exports = {
  registerUser: async (req, res) => {
    const checkUser = await User.findOne({ email: req.body.email });
    if (checkUser) {
      return res.status(400).json({
        status: "error",
        message: "Email already in use",
      });
    }
    const newUser = new User({
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    const result = await newUser.save();
    const { password, ...user } = result.toObject(); // de-structuring and avoiding meta data
    return res.status(200).json({
      status: "success",
      data: { user: user },
    });
  },

  loginUser: async (req, res) => {
    const user = await User.findOne({ email: req.body.email }).select(
      "password"
    ); //we must select password since the value for selecting password is set to false in model
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User doesn't exist",
      });
    }
    const passwordMatch = bcrypt.compareSync(req.body.password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_PRIVATE_KEY);
      res.header("x-auth-token", token).send(token);
    } else {
      return res.status(400).json({ message: "Invalid password" });
    }
  },
};
