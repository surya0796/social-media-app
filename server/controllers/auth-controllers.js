const User = require("../model/user-model");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    //generate new password : using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedpswd = await bcrypt.hash(password, salt);
    const isUserExist = await User.findOne({ email });
    if (isUserExist)
      return res.status(402).json({ error: "user email already exist" });
    //create new user :
    const newUser = new User({
      ...req.body,
      password: hashedpswd,
    });
    //save user and response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    //checking only email: //talk about this return error
    if (!user) {
      return res.status(404).json({ status: 404, error: "User not Found" });
    }
    const validPswd = await bcrypt.compare(password, user.password);
    if (!validPswd) {
      return res.status(401).json({ status: 401, error: "Invalid Password" });
    }
    return res.status(200).json({ status: 200, body: user, error: "" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = { registerUser, loginUser };
