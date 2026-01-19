/**
 * Standard API Response structure function
 * @param {number} statusCode
 * @param {any} data
 * @param {string} message
 */
const createApiResponse = (statusCode, data, message = "Success") => {
  return {
    statusCode,
    data,
    message,
    success: statusCode < 400,
  };
};

module.exports = {
  createApiResponse,
};
