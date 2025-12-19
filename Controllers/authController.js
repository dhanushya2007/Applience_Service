const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");

// Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(201).json({ status: "Success", data: { user } });
  } catch (err) {
    res.status(400).json({ status: "Fail", message: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ status: "Fail", message: "Please provide email and password" });

  const user = await User.findOne({ email });
  if (!user || !(await user.correctPassword(password, user.password)))
    return res.status(401).json({ status: "Fail", message: "Incorrect email or password" });

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETKEY, { expiresIn: "1d" });

  res.status(200).json({ status: "Success", token, data: { user } });
};