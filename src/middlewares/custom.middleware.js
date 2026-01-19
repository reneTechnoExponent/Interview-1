const fs = require("fs");
const path = require("path");
const { logActivity } = require("../utils/logger");
const { getTrackingIp } = require("../utils/ipTracker");

const BLOCKED_IPS_PATH = path.join(
  __dirname,
  "../../security/blocked_ips.json",
);
const rateLimits = new Map();

const ipBolckerShort = async (req, res, next) => {
  try {
    const clientIp = await getTrackingIp(req);
    const blockedIps = JSON.parse(fs.readFileSync(BLOCKED_IPS_PATH, "utf8"));

    if (blockedIps.includes(clientIp)) {
      return res.status(403).json({
        timestamp: new Date().toISOString(),
        statusCode: 403,
        msg: "Your IP has been blocked",
        data: null,
      });
    }
    next();
  } catch (error) {
    next();
  }
};

const activityLogger = (req, res, next) => {
  const startTime = Date.now();
  res.on("finish", async () => {
    try {
      const skipPaths = ["/favicon.ico", "/health"];
      if (skipPaths.some((p) => req.originalUrl.includes(p))) return;

      const duration = Date.now() - startTime;
      const clientIp = await getTrackingIp(req);

      await logActivity({
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        ip: clientIp,
        userAgent: req.get("User-Agent"),
        payload: req.method !== "GET" ? req.body : null,
      });
    } catch (error) {}
  });
  next();
};

const rateLimiter = (limit = 100, windowMs = 60000) => {
  return async (req, res, next) => {
    const clientIp = await getTrackingIp(req);
    const now = Date.now();

    if (!rateLimits.has(clientIp)) {
      rateLimits.set(clientIp, { count: 1, resetTime: now + windowMs });
      return next();
    }

    const data = rateLimits.get(clientIp);
    if (now > data.resetTime) {
      rateLimits.set(clientIp, { count: 1, resetTime: now + windowMs });
      return next();
    }

    data.count++;
    if (data.count > limit) {
      return res.status(429).json({
        timestamp: new Date().toISOString(),
        statusCode: 429,
        msg: "Too many requests, please try again later",
        data: null,
      });
    }
    next();
  };
};

module.exports = { ipBolckerShort, activityLogger, rateLimiter };
