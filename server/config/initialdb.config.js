const { registerUser } = require("../models/user/user.model");

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
