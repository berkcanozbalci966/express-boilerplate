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

    req.session.auth = registerResponse;
    await req.session.save();
    return res.json(req.session.auth);
  } catch (error) {
    next(error);
  }
}

module.export = {
  register,
};
