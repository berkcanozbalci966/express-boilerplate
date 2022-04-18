const { registerUser } = require("../models/mongo/user/user.mongo.model");

const userInfos = {
  email: "test1@gmail.com",
  username: "admin",
  password: "test123456",
};

async function initUser() {
  await registerUser(userInfos);
}

async function initDb() {
  await initUser();
}

module.exports = {
  initDb,
};
