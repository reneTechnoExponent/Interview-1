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
      throw new ApiError(500, "External API error while fetching user details");
    }
  }
}

module.exports = UserService;
