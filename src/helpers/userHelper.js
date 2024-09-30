const { customError } = require("../middlewares/error.middleware.js");
const User = require("../models/user.models");

module.exports = {
  registerUser: async (data) => {
    const { name, email, password, role } = data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw customError(409, "Email is already taken");
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    if (!user) {
      throw customError(
        500,
        "Something went wrong while registering the user."
      );
    }

    console.log(user);

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    return createdUser;
  },
  loginUser: async (data) => {
    const { email, password } = data;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw customError(404, "User does not exist");
    }
    const isPasswordCorrect = await existingUser.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      throw customError(401, "Invalid Password");
    }

    const { password: pass, refreshToken, ...rest } = existingUser?._doc;

    return rest;
  },
  // generate access and refresh token
  generateAccessAndRefreshToken: async (userId) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw customError(404, "User doesn't exists");
      }
      const accessToken = await user.generateAccessToken();
      const refreshToken = await user.generateRefreshToken();

      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
      return { accessToken, refreshToken };
    } catch (error) {
      throw customError(500, error.message);
    }
  },
};
