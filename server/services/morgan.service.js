const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

var accessLogStream = fs.createWriteStream(
  path.join(__dirname, "..", "logs", "access.log"),
  { flags: "a" }
);

function morganMiddleWare(app) {
  app.use(morgan("combined", { stream: accessLogStream }));
}

module.exports = {
  morganMiddleWare,
};
