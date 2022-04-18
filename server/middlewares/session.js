const session = require("express-session");
let RedisStore = require("connect-redis")(session);
const { createClient } = require("redis");
let redisClient = createClient({ legacyMode: true, url: "redis://redis:6379" });
redisClient.connect().catch(console.error);

function sessionMiddleWare(app) {
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: "secret",
      name: "work please",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3 * 60 * 60 * 1000,
      },
    })
  );
}

module.exports = {
  sessionMiddleWare,
};
