const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema({
  Title: { type: String, required: true },
  Content: { type: String, required: true },
  Likes: { type: Number, required: false, default: 0 },
  userId: { ref: "User", type: Schema.Types.ObjectId, required: true },
},{
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Post', postSchema);