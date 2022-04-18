const express = require("express");

const publicRoutes = require("./public");

const secretRoute = require("./secure/secret");

const { AuthMiddleWare } = require("../middlewares/auth.middleware");

const api = express.Router();

api.use("/", publicRoutes);

AuthMiddleWare(api, "/");

api.use("/", secretRoute);

module.exports = api;
