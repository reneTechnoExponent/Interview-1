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

    // Fetch user and posts in parallel using allSettled to handle partial failures
    const results = await Promise.allSettled([
      UserService.getUserById(userId),
      PostService.getPostsByUserId(userId),
    ]);

    const userResult = results[0];
    const postsResult = results[1];

    // 1. Handle User Result (Critical)
    // If user profile fails, we cannot build the dashboard response
    if (userResult.status === "rejected") {
      console.error(
        `[DashboardController] User API failed:`,
        userResult.reason,
      );
      throw userResult.reason;
    }
    const user = userResult.value;

    // 2. Handle Posts Result (Non-Critical)
    // If posts fail, we return an empty array instead of failing the whole request
    let posts = [];
    if (postsResult.status === "fulfilled") {
      posts = postsResult.value;
    } else {
      console.warn(
        `[DashboardController] Posts API failed, defaulting to empty list:`,
        postsResult.reason,
      );
    }

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
      // Optional: Add a flag if some data was missing
      _partial: postsResult.status === "rejected",
    };

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          dashboardData,
          postsResult.status === "fulfilled"
            ? "Dashboard data retrieved successfully"
            : "Dashboard data retrieved (posts unavailable)",
        ),
      );
  });
}

module.exports = DashboardController;
