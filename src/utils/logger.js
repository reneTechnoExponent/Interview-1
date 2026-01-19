const fs = require("fs").promises;
const path = require("path");

const ACTIVITY_LOG_PATH = path.join(__dirname, "../../logs/activity_logs.json");
const ERROR_LOG_PATH = path.join(__dirname, "../../logs/error_logs.json");

/**
 * Common console logger with styling
 */
const commonConsoleLog = (content) => {
  console.log(`\x1b[93m$$$=-Common Console Log Start-=$$$\x1b[0m`);
  console.log(content);
  console.log(`\x1b[93m$$$=-Common Console Log End-=$$$\x1b[0m`);
};

/**
 * Generic JSON log writer
 */
const writeLog = async (filePath, entry) => {
  try {
    let logs = [];
    try {
      const data = await fs.readFile(filePath, "utf8");
      logs = JSON.parse(data);
    } catch (err) {
      // If file doesn't exist or is empty, start with empty array
    }

    logs.push({
      ...entry,
      timestamp: new Date().toISOString(),
    });

    await fs.writeFile(filePath, JSON.stringify(logs, null, 2));
  } catch (error) {
    console.error(`Failed to write log to ${filePath}:`, error);
  }
};

const logActivity = async (data) => {
  commonConsoleLog({ type: "Activity", ...data });
  await writeLog(ACTIVITY_LOG_PATH, data);
};

const logError = async (data) => {
  commonConsoleLog({ type: "Error", ...data });
  await writeLog(ERROR_LOG_PATH, data);
};

module.exports = {
  commonConsoleLog,
  logActivity,
  logError,
};
