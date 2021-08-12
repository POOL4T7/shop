import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asynchandler from "express-async-handler";

export const protect = asynchandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findOne({ _id: decode.id }).select("-password");
      next();
    } catch (error) {
      console.log(error.message);
      res.status(401);
      throw new Error("Invalid token");
    }
  } else {
    throw new Error("Not Authorized , invalid token");
  }
});
