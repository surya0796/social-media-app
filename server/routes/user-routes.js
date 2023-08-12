const express = require("express");
const router = express.Router();
// const User = require("../model/user-model")
const {
  updateUser,
  deleteUser,
  getUserById,
  bookmarkPost,
  unfollowUser,
} = require("../controllers/user-controllers");

router.route("/update/:id").put(updateUser);
router.route("/delete/:id").delete(deleteUser);
router.route("/get-user/:id").get(getUserById);
router.route("/bookmark-post").put(bookmarkPost);
router.route("/unfollow-user/:id").put(unfollowUser);

module.exports = router; //exporting line 2.
