import User from "../models/user.js";
import bcrypt from "bcrypt";

// Login
const createUser = async (req, res) => {
  try {
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);
    const newUser = await new User({ ...req.body, password: hashPass });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    console.log(err);
  }
};

export { createUser };
