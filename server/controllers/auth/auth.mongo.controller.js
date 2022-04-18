const {
  registerUser,
  loginUser,
} = require("../../models/mongo/user/user.mongo.model");

function init() {
  return {
    register,
    login,
    profile,
    logout,
  };
}

async function register(req, res, next) {
  try {
    const { username, password, email, charIdNumber } = req.body;

    if (!username || !password || !email || !charIdNumber) {
      return res.sendStatus(400);
    }
    const registerResponse = await registerUser({
      username,
      password,
      email,
      charIdNumber,
    });

    req.session.auth = registerResponse;
    await req.session.save();
    return res.json(req.session.auth);
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { username, password, email } = req.body;
    const userResponse = await loginUser({ username, password, email });
    console.log(req.session);
    req.session.auth = userResponse;
    await req.session.save();
    return res.json(req.session.auth);
  } catch (error) {
    next(error);
  }
}

async function profile(req, res, next) {
  try {
    if (req.session.auth) {
      return res.json(req.session.auth);
    }

    return res.json({ username: "guest", isAuth: false });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    if (req.session.auth) req.session.destroy();
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

module.exports = init;
