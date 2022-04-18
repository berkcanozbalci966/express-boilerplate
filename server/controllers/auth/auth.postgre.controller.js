const { UserModel } = require("../../models/postgre/user.model.postgre");

const userModel = new UserModel();

async function register(req, res, next) {
  try {
    const { username, email, password, name, surname } = req.body;

    if (!username || !password || !email || !name || !surname) {
      return res.sendStatus(400);
    }
    const registerResponse = await userModel.createUser({
      username,
      email,
      password,
      name,
      surname,
    });

    console.log(registerResponse);

    // req.session.auth = registerResponse;
    // await req.session.save();
    return res.send("success");
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { username, password, email } = req.body;
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
};
