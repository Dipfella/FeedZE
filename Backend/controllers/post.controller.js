const Post = require("../models/Post");
const User = require("../models/User");
const PostController = {};

PostController.getPost = async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
};

PostController.createPost = async (req, res) => {
  const userFound = await User.findOne({ id: req.body.id });
  if (!userFound) return res.status(400).json({ message: "User not found" });
  const post = new Post({
    Title: req.body.Title,
    Content: req.body.Content,
    userId: req.body.userId,
  });
  await post.save();
  res.json({
    status: "Post Saved",
  });
};

PostController.likePost = async (req, res) => {
  const postFound = await Post.findOne({ id: req.body.id });

  if (postFound) {
    postFound.Likes = postFound.Likes + 1;
    await postFound.save();
    res.json({ likes: postFound.Likes });
  } else {
    res.status(500).json({ error: "Post not found" });
  }
};

PostController.getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
};

PostController.updatPostById = async (req, res) => {
  const { id } = req.params;
  const post = {
    Title: req.body.Title,
    Content: req.body.Content,
    userId: req.body.userId,
  };
  await Post.findByIdAndUpdate(id, { $set: post }, { new: true });

  res.json({
    status: "Edit post succesfull",
  });
};

PostController.deletePostById = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({
    status: "Post delete",
  });
};

module.exports = PostController;
