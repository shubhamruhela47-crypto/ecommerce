const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendmail = require("../unite/sendmail");

const generatetoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const registeruser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedpassword,
    });

    if (user) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      const message = `Welcome to our platform. Your verification OTP is ${otp}`;

      await sendmail(
        email,
        "welcome to shopnext - your OTP for registration",
        message,
      );

      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generatetoken(user._id),
      });
    } else {
      res.status(400).json({
        message: "Invalid user data",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

//login user

const loginuser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generatetoken(user._id),
      });
    } else {
      res.status(400).json({ message: "envalied email and password" });
    }
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};

const logoutuser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const deleteuser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "User removed" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

module.exports = {
  registeruser,
  loginuser,
  logoutuser,
  deleteuser,
};
