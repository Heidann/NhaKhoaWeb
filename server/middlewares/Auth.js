import jwt from "jsonwebtoken";
import { getTai_KhoanById } from "../Models/Tai_Khoan_Model.js";
import asyncHandler from "express-async-handler";

// @decs Authenticated User & get token
const generateToken = (AUTO_ID) => {
  return jwt.sign({ AUTO_ID }, process.env.JWT_SECRET, {
    expiresIn: "1d", // 1 day
  });
};

// protected middleware
// @decs It's used to authenticate and verify whether the user is logged in or not before accessing the application's secure resources
const protect = asyncHandler(async (req, res, next) => {
  let token;
  // check if token exists in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // set token from Bearer token in headers
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("token jwt", token);

      // verify token and get user id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded.AUTO_ID);
      // get user id from decoded token
      req.user = await getTai_KhoanById(decoded.AUTO_ID);
      console.log(req.user);
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  // if token doesn't exist in headers send error
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// admin middleware
const admin = asyncHandler(async (req, res, next) => {
  console.log("kiểm tra admin", req.user);
  console.log("kiểm tra admin", req.user[0].IS_ADMIN);

  if (req.user && req.user[0].IS_ADMIN === 1) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
});

export { generateToken, protect, admin };
