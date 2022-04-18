function IocMiddleware(app) {
  app.use((req, res, next) => {
    req.organizer = function (isSuccess, data) {
      return {
        Header: {
          isSuccess,
        },
        Body: {
          data,
        },
      };
    };

    next();
  });
}

module.exports = {
  IocMiddleware,
};
