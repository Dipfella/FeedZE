const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  FullName: { type: String, required: true },
  Age: { type: Number, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  posts: [{ ref: "Post", type: Schema.Types.ObjectId, required: false }],
},{
  timestamps: true,
  versionKey: false
});

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword)
};

module.exports = mongoose.model("User", userSchema);
