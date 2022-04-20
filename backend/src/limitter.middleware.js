const redis = require("./redis-client");

const rateLimitter = (timeSeconds, allowedRequests) => {
  return async function (req, res, next) {
    try {
      // get ip
      const IP = req.ip;

      // get count of requests for ip
      const requests = await redis.incr(IP);

      // set an expiry time or windowSlot in seconds
      let ttl;
      if (requests === 1) {
        await redis.expire(IP, timeSeconds);
        ttl = timeSeconds;
      } else {
        ttl = await redis.ttl(IP);
      }

      if (requests > allowedRequests) {
        return res.status(200).send({
          error: "You have crossed the api limit",
          requests: requests,
          ttl: ttl,
        });
      } else {
        req.requests = requests;
        req.ttl = ttl;
        next();
      }
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };
};

module.exports = rateLimitter;
