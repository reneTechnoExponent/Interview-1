const express = require("express");
const router = express.Router();
const { getDashboardData } = require("../controllers/dashboard.controller");
const cacheMiddleware = require("../middlewares/cache.middleware");

/**
 * Dashboard Routes
 */

// Route to get aggregated dashboard data with in-memory caching
router.get("/:userId", cacheMiddleware, getDashboardData);

module.exports = router;
