const express = require("express");
const dashboardRoutes = require("./routes/dashboard.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

// Standard Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/dashboard", dashboardRoutes);

// Root path heartbeat
app.get("/", (req, res) => {
  res.json({ message: "Dashboard Aggregator API is healthy!" });
});

// Global Error Handler (Must be defined last)
app.use(errorHandler);

module.exports = app;
