const express = require("express");
const cors = require("cors");

const { initDb } = require("./config/initialdb.config");
const api = require("./routes/api");

const app = express();

// initDb();

const {
  errorHandler,
  morganMiddleWare,
  sessionMiddleWare,
  IocMiddleware,
} = require("./middlewares");

IocMiddleware(app);

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

morganMiddleWare(app);
sessionMiddleWare(app);
app.use(express.json());

app.use("/v1", api);

errorHandler(app);

module.exports = app;
