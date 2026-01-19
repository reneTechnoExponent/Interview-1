const cache = new Map();
const CACHE_TTL = 60 * 1000; // 1 minute

/**
 * Middleware to cache API responses in-memory
 */
const cacheMiddleware = (req, res, next) => {
  // Generate cache key from URL (or specifically userId for this project)
  const key = req.originalUrl || req.url;

  if (cache.has(key)) {
    const { data, timestamp } = cache.get(key);
    const isExpired = Date.now() - timestamp > CACHE_TTL;

    if (!isExpired) {
      console.log(`[Cache Hit] Serving: ${key}`);
      return res.status(200).json(data);
    }

    cache.delete(key);
  }

  // Override res.json to capture response and store it in cache
  const originalJson = res.json;
  res.json = (body) => {
    // Only cache successful responses (2xx)
    if (res.statusCode >= 200 && res.statusCode < 300) {
      cache.set(key, {
        data: body,
        timestamp: Date.now(),
      });
    }
    return originalJson.call(res, body);
  };

  next();
};

module.exports = cacheMiddleware;
