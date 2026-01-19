const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const dashboardRoutes = require("./routes/dashboard.routes");
const errorHandler = require("./middlewares/error.middleware");
const {
  ipBolckerShort,
  activityLogger,
  rateLimiter,
} = require("./middlewares/custom.middleware");
const { swaggerUi, specs } = require("./config/swagger.config");

const app = express();

// Security and Utility Middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(logger(`[:date[web]] :method :url :status - :response-time ms`));
app.use(express.static("public"));
app.use(cookieParser());

// Custom Middlewares
app.use(ipBolckerShort);
app.use(activityLogger);
app.use(rateLimiter());

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// API Routes
app.use("/api/dashboard", dashboardRoutes);

// Root path heartbeat
app.get("/", (req, res) => {
  res.json({ message: "Dashboard Aggregator API is healthy!" });
});

// Global Error Handler (Must be defined last)
app.use(errorHandler);

module.exports = app;
