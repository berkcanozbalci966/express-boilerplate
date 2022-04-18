async function AuthMiddleWare(app, route) {
  app.use(route, checkLogin);
}

async function checkLogin(req, res, next) {
  if (req.session.auth) {
    return next();
  }

  return res.sendStatus(403);
}

module.exports = {
  AuthMiddleWare,
};
