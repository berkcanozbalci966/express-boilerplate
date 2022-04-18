function errorHandler(app) {
  app.use((err, req, res, next) => {
    if (err.message)
      return res.status(500).json(req.organizer(false, err.message));

    return res.status(500).json(req.organizer(false, "We have some problems"));
  });
}

module.exports = {
  errorHandler,
};
