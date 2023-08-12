const User = require("../model/user-model");

const updateUser = async (req, res) => {
  //give userId, and whatever you wannna change.

  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
};

const deleteUser = async (req, res) => {
  //give userId.
  //check user -> if user try block
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log("user is..-> ", user);
    res.status(200).json(user, "User Deleted from DB.");
  } catch {
    res.status(404).json("User not exist.");
  }
};

const bookmarkPost = async (req, res) => {
  const { userId, postId } = req.body;
  try {
    const currentUser = await User.findById(userId);
    if (!currentUser.bookmarks.includes(postId)) {
      await currentUser.updateOne({ $push: { bookmarks: postId } });
      res.status(200).json({
        message: `The post is bookmarked for ${currentUser.username}`,
      });
    } else {
      await currentUser.updateOne({ $pull: { bookmarks: postId } });
      res.status(200).json({
        message: `The post is removed from bookmark for ${currentUser.username}`,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const unfollowUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getUserById,
  bookmarkPost,
  unfollowUser,
};
