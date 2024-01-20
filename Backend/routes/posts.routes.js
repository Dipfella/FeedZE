const express = require("express");
const PostController = require("../controllers/post.controller")
const {verifyToken} = require("../middlewares/authorization");
const router = express.Router();


router.get("/", verifyToken, PostController.getPost)
router.post("/", verifyToken, PostController.createPost);
router.get("/:id", verifyToken, PostController.getPostById);
router.put("/:id", verifyToken, PostController.updatPostById);
router.delete("/:id", verifyToken, PostController.deletePostById);

module.exports = router;