const mongoController = require("./auth.mongo.controller.js");
const postgresController = require("./auth.postgre.controller");
const authDb = process.env.AUTH_DB;

function init() {
  if (authDb == "mongo") {
    return mongoController;
  }

  return postgresController;
}

module.exports = init;
