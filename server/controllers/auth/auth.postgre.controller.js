const { UserModel } = require("../../models/postgre/user.model.postgre");

const userModel = new UserModel();

async function register(req, res, next) {
  try {
    const { username, email, password, name, surname } = req.body;

    if (!username || !password || !email || !name || !surname) {
      return res.sendStatus(400);
    }
    const registerResponse = await userModel.create({
      username,
      email,
      password,
      name,
      surname,
    });

    req.session.auth = registerResponse;

    await req.session.save();

    return res.send(sessionFilter(req.session.auth));
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { username, password, email } = req.body;
    const loginResponse = await userModel.login({ username, password, email });
    req.session.auth = loginResponse;

    await req.session.save();

    return res.json(sessionFilter(req.session.auth));
  } catch (error) {
    next(error);
  }
}

function sessionFilter(session) {
  return {
    username: session.username,
    isAuth: session.isAuth,
  };
}

module.exports = {
  register,
  login,
};
