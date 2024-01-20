const mongoose = require("mongoose");
const URI = "mongodb://127.0.0.1/FeedZE";

mongoose
  .connect(URI)
  .then((db) => console.log("DataBase Connect Succesfull"))
  .catch((err) => console.error(err));

module.exports = mongoose;
