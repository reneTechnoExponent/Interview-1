const apiClient = require("../config/apiClient.config");
const ApiError = require("../utils/ApiError");

/**
 * Service to handle User data fetching from external API
 */
class UserService {
  /**
   * Fetch user profile by ID
   * @param {string|number} userId
   */
  static async getUserById(userId) {
    try {
      const response = await apiClient.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new ApiError(404, "User not found");
      }
      if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
        throw new ApiError(504, "External API request timed out");
      }
      throw new ApiError(
        500,
        "External API is currently unavailable or returned an error",
      );
    }
  }
}

module.exports = UserService;
