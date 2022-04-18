const { errorHandler } = require("./error-handler");
const { morganMiddleWare } = require("./logger");
const { sessionMiddleWare } = require("./session");
const { IocMiddleware } = require("./ioc");

module.exports = {
  errorHandler,
  morganMiddleWare,
  sessionMiddleWare,
  IocMiddleware,
};
