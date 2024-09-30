const User = require("../models/user.models");
const { asyncHandler } = require("../utils/asyncHandler.utils");
const { customError } = require("./error.middleware");
const jwt = require("jsonwebtoken");

module.exports = {
  verifyJWT: asyncHandler(async (req, res, next) => {
    try {
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");
      if (!token) {
        throw customError(400, "Unauthorized request");
      }

      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = user;
      console.log(user);
      next();
    } catch (error) {
      throw customError(401, error.message || "Invalid access token");
    }
  }),
  isAdmin: asyncHandler(async (req, res, next) => {
    const user = req.user;
    const fetchedUser = await User.findById(user._id);
    if (fetchedUser.role !== "ADMIN") {
      throw customError(401, "Unauthorized request");
    }
    next();
  }),
};
