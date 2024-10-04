const userHelper = require("../helpers/userHelper");
const {
  errorHandler,
  customError,
} = require("../middlewares/error.middleware");
const User = require("../models/user.models");
const { asyncHandler } = require("../utils/asyncHandler.utils");
const messageHelper = require("../utils/messageHelper.utils");
const { successResponse } = require("../utils/responseHelper.utils");

module.exports = {
  getUser: (req, res) => {
    console.log(req.params);
    successResponse(res, 200, "user");
  },
  // user registration controller
  registerController: asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!(name?.trim() && email?.trim() && password?.trim())) {
      return next(
        customError(400, "Name, Email, Password is a required field")
      );
    }

    const user = await userHelper.registerUser(req.body);
    return successResponse(res, 201, "User registered successfully!", user);
  }),

  // user login controller
  loginController: asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    console.log(email);
    console.log(password);

    if (!(email?.trim() && password?.trim())) {
      next(customError(400, "Email and password is a required field"));
    }

    const user = await userHelper.loginUser(req.body);

    console.log(user);

    const { accessToken, refreshToken } =
      await userHelper.generateAccessAndRefreshToken(user._id);
    const options = {
      httpOnly: true,
      secure: true,
    };
    res.cookie("accessToken", accessToken, options);
    res.cookie("refreshToken", refreshToken, options);
    successResponse(res, 200, "user logged in successfully", user);
  }),

  makeAdmin: asyncHandler(async (req, res, next) => {
    const user = req.user;
    const fetchedUser = await User.findById(user._id);
    if (!fetchedUser) {
      throw customError(500, "Something went wrong while fetching user data");
    }
    if (fetchedUser.role === "ADMIN") {
      throw customError(400, "User is already an admin");
    }

    fetchedUser.role = "ADMIN";
    await fetchedUser.save({ validateBeforeSave: false });

    return successResponse(res, 200, "User promoted to Admin");
  }),
};
