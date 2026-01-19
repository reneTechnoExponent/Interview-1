const os = require("os");
const https = require("https");

const getNetworkInterfaces = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "127.0.0.1";
};

const getPublicIP = () => {
  return new Promise((resolve) => {
    const req = https.get(
      "https://checkip.amazonaws.com",
      { timeout: 3000 },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data.trim()));
      },
    );
    req.on("timeout", () => {
      req.destroy();
      resolve(null);
    });
    req.on("error", () => resolve(null));
  });
};

const getTrackingIp = async (req) => {
  const localIp = getNetworkInterfaces();
  const publicIp = await getPublicIP();

  const forwardedIp = req?.headers["x-forwarded-for"]?.split(",")[0]?.trim();
  let clientIp =
    forwardedIp || req?.ip || req?.connection?.remoteAddress || "127.0.0.1";

  if (clientIp === "::1" || clientIp === "127.0.0.1") {
    clientIp = localIp;
  } else if (clientIp.startsWith("::ffff:")) {
    clientIp = clientIp.substring(7);
  }

  const connectionIp =
    req?.connection?.remoteAddress || req?.socket?.remoteAddress || "127.0.0.1";
  const isLocal =
    connectionIp.startsWith("127.") ||
    connectionIp === localIp ||
    connectionIp === "::1";

  return isLocal ? publicIp : clientIp;
};

module.exports = { getTrackingIp };
