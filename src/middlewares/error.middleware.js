const messageHelper = require("../utils/messageHelper.utils");
const { errorResponse } = require("../utils/responseHelper.utils");

module.exports = {
  customError: (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
  },
  errorHandler: (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || messageHelper.INTERNAL_SERVER_ERROR;
    errorResponse(res, statusCode, message);
  },
};
