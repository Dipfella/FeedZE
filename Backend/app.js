const express = require("express");
const morgan = require("morgan");
const postRoutes = require("./routes/posts.routes");
const authRoutes = require("./routes/auth.routes");
const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json("welcome");
});

app.use("/api/post", postRoutes);
app.use("/api/auth", authRoutes);
module.exports = app;
