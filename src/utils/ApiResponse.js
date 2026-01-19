/**
 * Standard API Response structure factory (Functional style)
 */
const createApiResponse = (statusCode, data, msg = "Success") => {
  return {
    timestamp: new Date().toISOString(),
    statusCode,
    msg,
    data,
  };
};

module.exports = {
  createApiResponse,
};
