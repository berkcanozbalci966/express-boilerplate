function AuthMiddleWare(app, route) {
  app.use(route, checkLogin);
}

function checkLogin(req, res, next) {
  if (!req.session.auth) {
    throw new Error("session error");
  }

  next();
}

module.exports = {
  AuthMiddleWare,
};
