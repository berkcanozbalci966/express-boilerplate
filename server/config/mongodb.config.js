const mongoURL =
  process.env.MONGOURL ||
  "mongodb://root:asdfghj@mongo:27017/sessionAuth?authSource=admin";

module.exports = {
  mongoURL,
};
