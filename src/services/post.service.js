const apiClient = require("../config/apiClient.config");
const ApiError = require("../utils/ApiError");

/**
 * Service to handle Post data fetching from external API
 */
class PostService {
  /**
   * Fetch posts for a specific user ID
   * @param {string|number} userId
   */
  static async getPostsByUserId(userId) {
    try {
      const response = await apiClient.get(`/posts?userId=${userId}`);
      return response.data;
    } catch (error) {
      throw new ApiError(500, "External API error while fetching user posts");
    }
  }
}

module.exports = PostService;
