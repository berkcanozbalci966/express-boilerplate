const http = require("http");

const app = require("./app");

require("dotenv").config();

const { mongoDBConnect } = require("./services/mongodb.service");

const { startServer } = require("./services/startserver.service");

const server = http.createServer(app);

startServer(server, mongoDBConnect);
