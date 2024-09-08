import jwt from "jsonwebtoken";
import { getTai_KhoanById } from "../Models/Tai_Khoan_Model.js";
import asyncHandler from "express-async-handler";

// @decs Authenticated User & get token
const generateAccessToken = (AUTO_ID) => {
  return jwt.sign({ AUTO_ID }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
};

// @decs Generate Refresh Token
const generateRefreshToken = (AUTO_ID) => {
  return jwt.sign({ AUTO_ID }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

// @decs  refreshToken Login User
const refreshToken = asyncHandler(async (req, res) => {
  const clientRefreshToken =
    req.headers.authorization?.split(" ")[1] || req.body.refreshToken; // Lấy token từ header hoặc body

  if (!clientRefreshToken) {
    res.status(401);
    throw new Error("Refresh token not found, please login again.");
  }

  try {
    const decoded = jwt.verify(
      clientRefreshToken,
      process.env.JWT_REFRESH_SECRET
    );
    const user = await getTai_KhoanById(decoded.AUTO_ID);

    if (!user) {
      res.status(401);
      throw new Error("Invalid refresh token.");
    }

    const newAccessToken = generateAccessToken(user[0].AUTO_ID);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403);
    throw new Error("Invalid refresh token.");
  }
});

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

      // verify token and get user id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get user id from decoded token
      req.user = await getTai_KhoanById(decoded.AUTO_ID);

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
  if (req.user && req.user[0].IS_ADMIN === 1) {
    next();
  } else {
    res.status(403);
    throw new Error("Not authorized as an admin");
  }
});

export {
  generateAccessToken,
  generateRefreshToken,
  refreshToken,
  protect,
  admin,
};
