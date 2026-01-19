const ApiError = require("../utils/ApiError");

/**
 * Global Error Handling Middleware for centralized error responses
 */
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  // If error is not an instance of ApiError, it's an unexpected error
  if (!(err instanceof ApiError)) {
    statusCode = 500;
    message = "Internal Server Error";
  }

  const response = {
    success: false,
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  };

  console.error(`[Error Handler] ${statusCode} - ${message}`);

  return res.status(statusCode).json(response);
};

module.exports = errorHandler;
