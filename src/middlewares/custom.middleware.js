/**
 * Simple IP blocker middleware stub
 */
const ipBolckerShort = (req, res, next) => {
  // Logic for blocking IPs can go here
  next();
};

/**
 * Simple activity logger middleware stub
 */
const activityLogger = (req, res, next) => {
  console.log(
    `[Activity] ${req.method} ${req.url} - ${new Date().toISOString()}`,
  );
  next();
};

module.exports = {
  ipBolckerShort,
  activityLogger,
};
