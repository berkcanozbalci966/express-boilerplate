function errorHandler(app) {
  app.use((err, req, res, next) => {
    if (err.message) return res.status(500).send(err.message);

    return res.status(500).send("We have some problems");
  });
}

module.exports = {
  errorHandler,
};
