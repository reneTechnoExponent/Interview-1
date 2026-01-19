const fs = require("fs");
const path = require("path");
const { logActivity } = require("../utils/logger");

const BLOCKED_IPS_PATH = path.join(
  __dirname,
  "../../security/blocked_ips.json",
);

/**
 * IP Blocker Middleware
 * Checks if the request IP is in the blocked list
 */
const ipBolckerShort = (req, res, next) => {
  try {
    const clientIp = req.ip || req.connection.remoteAddress || "127.0.0.1";
    const blockedIps = JSON.parse(fs.readFileSync(BLOCKED_IPS_PATH, "utf8"));

    if (blockedIps.includes(clientIp)) {
      console.warn(`[Security] Blocked request from IP: ${clientIp}`);
      return res.status(403).json({
        timestamp: new Date().toISOString(),
        statusCode: 403,
        msg: "Your IP has been blocked",
        data: null,
      });
    }
    next();
  } catch (error) {
    console.error("IP Blocker Error:", error);
    next();
  }
};

/**
 * Activity Logger Middleware
 * Logs request details after the response is sent
 */
const activityLogger = (req, res, next) => {
  const startTime = Date.now();

  res.on("finish", async () => {
    try {
      // Basic paths to skip
      const skipPaths = ["/favicon.ico", "/health"];
      if (skipPaths.some((p) => req.originalUrl.includes(p))) return;

      const duration = Date.now() - startTime;
      const clientIp = req.ip || req.connection.remoteAddress || "127.0.0.1";

      const logData = {
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        ip: clientIp,
        userAgent: req.get("User-Agent"),
        payload: req.method !== "GET" ? req.body : null,
      };

      await logActivity(logData);
    } catch (error) {
      console.error("Activity Logger Middleware Error:", error);
    }
  });

  next();
};

module.exports = {
  ipBolckerShort,
  activityLogger,
};
