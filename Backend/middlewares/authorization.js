const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/User");
const Authorization = {};

Authorization.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["token"];

    if (!token) return res.status(403).json({ message: "No token provided" });
    const decoded = jwt.verify(token, config.SECRET);
    req.id = decoded.id;

    const user = await User.findById(req.id, { password: 0 });
    if (!user) return res.status(404).json({ message: "No user found" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = Authorization;
