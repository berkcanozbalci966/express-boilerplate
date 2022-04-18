const { mongoURL } = require("../config/mongodb.config");

const mongoose = require("mongoose");

mongoose.connection.on("open", () => {
  console.log("MongoDB connection ready");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

async function mongoDBConnect() {
  await mongoose.connect(mongoURL);
}

async function mongoDBDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoDBConnect,
  mongoDBDisconnect,
};
