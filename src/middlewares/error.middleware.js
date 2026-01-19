const ApiError = require("../utils/ApiError");
const { logError } = require("../utils/logger");

/**
 * Global Error Handling Middleware
 */
const errorHandler = async (err, req, res, next) => {
  let { statusCode, message } = err;

  // If error is not an instance of ApiError, it's an unexpected error
  if (!(err instanceof ApiError)) {
    statusCode = 500;
    message = "Internal Server Error";
  }

  const response = {
    timestamp: new Date().toISOString(),
    statusCode,
    msg: message,
    data: null,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  };

  // Log the error using our new functional logger
  await logError({
    route: req.originalUrl,
    method: req.method,
    message: err.message,
    statusCode,
    ip: req.ip || req.connection.remoteAddress || "127.0.0.1",
    stack: err.stack,
  });

  return res.status(statusCode).json(response);
};

module.exports = errorHandler;
