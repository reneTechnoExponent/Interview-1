const express = require("express");
const router = express.Router();
const DashboardController = require("../controllers/dashboard.controller");
const cacheMiddleware = require("../middlewares/cache.middleware");

/**
 * Dashboard Routes
 */

// Route to get aggregated dashboard data with in-memory caching
router.get("/:userId", cacheMiddleware, DashboardController.getDashboardData);

module.exports = router;
