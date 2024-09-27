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
  registerController: asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!(name.trim() && email.trim() && password.trim())) {
      return next(
        customError(404, "Name, Email, Password is a required field")
      );
    }

    const user = await userHelper.registerUser(req.body);
    console.log(user);
  }),
};
