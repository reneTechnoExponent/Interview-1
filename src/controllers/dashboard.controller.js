const UserService = require("../services/user.service");
const PostService = require("../services/post.service");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

/**
 * Controller to handle dashboard related business logic
 */
class DashboardController {
  /**
   * Aggregates user details and their latest posts
   */
  static getDashboardData = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    console.log(`[DashboardController] Fetching data for userId: ${userId}`);

    // Fetch user and posts in parallel for performance
    const [user, posts] = await Promise.all([
      UserService.getUserById(userId),
      PostService.getPostsByUserId(userId),
    ]);

    // Transform and aggregate the data
    const dashboardData = {
      id: user.id,
      name: user.name,
      email: user.email,
      company: user.company ? user.company.name : "Unknown",
      posts: posts.map((post) => ({
        id: post.id,
        title: post.title,
        body: post.body,
      })),
    };

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          dashboardData,
          "Dashboard data retrieved successfully",
        ),
      );
  });
}

module.exports = DashboardController;
