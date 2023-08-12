const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a user name"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    firstname: {
      type: String,
      required: [true, "Please enter your name"],
    },
    lastname: {
      type: String,
      required: false,
    },
    profileImage: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: [true, "Please enter a valid email"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    bookmarks: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);

//Export
module.exports = User;
