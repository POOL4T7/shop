import asynchandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken } from "../Utils/generateToken.js";

// @desc  POST auth user and get token
// @router POST /api/users/login
// @access public
export const authUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && user.matchPassword(password)) {
    return res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  }

  res.status(404);
  throw new Error("Invalid email or password");
});
// @desc  POST register new user
// @router POST /api/users
// @access public
export const registerUser = asynchandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }

  res.status(404);
  throw new Error("Invalid email or password");
});

// @desc    user profile
// @router GET /api/users/profile
// @access private
export const userProfile = asynchandler(async (req, res) => {
  console.log(req.user);
  const user = await User.findById({ _id: req.user._id });
  if (user) {
    return res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }
  res.status(404);
  throw new Error("User not found");
});
