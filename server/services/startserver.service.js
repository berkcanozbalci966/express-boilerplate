const { PORT } = require("../config/server.config");

async function startServer(server, dbConnect) {
  await dbConnect();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

module.exports = {
  startServer,
};
