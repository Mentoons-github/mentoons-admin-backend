const userHelper = require("../helpers/userHelper");
const { errorHandler, customError } = require("../middlewares/errorHandler");
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

    if (!(email.trim() && password.trim())) {
      next(customError(400, "Email and password is a required field"));
    }

    const user = await userHelper.loginUser(req.body);
    // const accessToken = user.generateAccessToken();
    // res.cookie("accessToken",);

    console.log(user);
    successResponse(res, 200, "user logged in successfully", user);
  }),
};
