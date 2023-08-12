const User = require("../model/user-model");
const Post = require("../model/post-model");

const createPost = async (req, res) => {
  try {
    const { userId, ...postData } = req.body;
    const currentUser = await User.findById(userId);
    const newPost = new Post({ ...postData, user: currentUser });
    const savedPost = await newPost.save();
    res.status(200).json({ status: 200, body: savedPost, error: "" });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (req.body.userId === post.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json(post);
    } else {
      res.status(403).json({ error: "You can only update your posts." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (req.body.userId === post.user) {
      await post.deleteOne();
      res.status(200).json("Post is Deleted.");
    } else {
      res.status(403).json({ error: "You can only delete your posts." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const likeDislikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    const { userId } = req.body;
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      return res.status(200).json({ body: post, message: "Liked the post" });
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      return res
        .status(200)
        .json({ body: post, message: "Disliked the post." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
const getBookmarkedPost = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const bookmarkedPost = await Promise.all(
      user.bookmarks.map((postId) => {
        return Post.find({ _id: postId }).populate("user", {
          id: 1,
          username: 1,
          email: 1,
          firstname: 1,
          lastname: 1,
          profileImage: 1,
          bookmarks: 1,
        });
      })
    );
    res
      .status(200)
      .json({ status: 200, data: bookmarkedPost.flat(1), error: "" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({}).populate("user", {
      id: 1,
      username: 1,
      email: 1,
      firstname: 1,
      lastname: 1,
      profileImage: 1,
      bookmarks: 1,
    });
    res.status(200).json({ status: 200, data: allPosts, error: "" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getAllPostOfCurrUser = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    res.status(200).json(userPosts);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllPostExceptCurrUser = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ user: friendId }).populate("user", {
          id: 1,
          username: 1,
          email: 1,
          firstname: 1,
          lastname: 1,
          profileImage: 1,
          bookmarks: 1,
        });
      })
    );
    res.status(200).json({ status: 200, data: friendPosts.flat(1), error: "" });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  likeDislikePost,
  getPostById,
  getBookmarkedPost,
  getAllPosts,
  getAllPostOfCurrUser,
  getAllPostExceptCurrUser,
};
