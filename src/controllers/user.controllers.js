const { asyncHandler } = require("../utils/asyncHandler.utils");
const { successResponse } = require("../utils/responseHelper.utils");

module.exports = {
  getUser: (req, res) => {
    console.log(req.params);
    successResponse(res, 200, "user");
  },
  registerController: asyncHandler(async (req, res, next) => {
    return res.send("Lund");
  }),
};
