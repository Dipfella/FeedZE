const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config");
const AuthController = {};

AuthController.signUp = async (req, res) => {
  const newUser = new User({
    FullName: req.body.FullName,
    Age: req.body.Age,
    Email: req.body.Email,
    Password: await User.encryptPassword(req.body.Password),
    posts: [req.body.posts],
  });

  const savedUser = await newUser.save();
  const token = jwt.sign({ id: savedUser.id }, config.SECRET, {
    expiresIn: 86400,
  });

  res.status(200).json({ token });
};

AuthController.signIn = async (req, res) => {
  try {
    const userFound = await User.findOne({ Email: req.body.Email });
    if (!userFound) return res.status(400).json({ message: "User not found" });

    const matchPassword = await User.comparePassword(
      req.body.Password,
      userFound.Password
    );
    if (!matchPassword)
      return res.status(401).json({ token: null, message: "Invalid Password" });

    const token = jwt.sign({ id: userFound.id }, config.SECRET, {
      expiresIn: 86400,
    });

    res.json({ token });
  } catch (error) {
    return res.status(401).json({ message: "Error at singnIn" });
  }
};

module.exports = AuthController;
