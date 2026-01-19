const { getUserById } = require("../services/user.service");
const { getPostsByUserId } = require("../services/post.service");
const asyncHandler = require("../utils/asyncHandler");
const { createApiResponse } = require("../utils/ApiResponse");

/**
 * Aggregates user details and their latest posts
 */
const getDashboardData = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  console.log(`[DashboardController] Fetching data for userId: ${userId}`);

  // Fetch user and posts in parallel using allSettled to handle partial failures
  const results = await Promise.allSettled([
    getUserById(userId),
    getPostsByUserId(userId),
  ]);

  const userResult = results[0];
  const postsResult = results[1];

  // 1. Handle User Result (Critical)
  if (userResult.status === "rejected") {
    console.error(`[DashboardController] User API failed:`, userResult.reason);
    throw userResult.reason;
  }
  const user = userResult.value;

  // 2. Handle Posts Result (Non-Critical)
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
    // _partial: postsResult.status === "rejected",

    // // /* for future use */
    // // const dashboardData = {
    // // ...user,
    // // posts: posts.map((post) => ({
    // //   ...post
    // // })),
    // // _partial: postsResult.status === "rejected",
  };

  return res
    .status(200)
    .json(
      createApiResponse(
        200,
        dashboardData,
        postsResult.status === "fulfilled"
          ? "Dashboard data retrieved successfully"
          : "Dashboard data retrieved (posts unavailable)",
      ),
    );
});

module.exports = {
  getDashboardData,
};
