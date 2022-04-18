const User = require("./user.mongo");
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../../config/server.config");

async function registerUser({ username, password, email, charIdNumber }) {
  try {
    if (email && (await foundUserWithEmail(email))) {
      throw new Error("Email exists");
    }

    if (username && (await foundUserWithUsername(username))) {
      throw new Error("Username exists");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      charIdNumber,
    });

    await newUser.save();

    return { username, isAuth: true };
  } catch (error) {
    throw new Error("Register failed");
  }
}

async function loginUser({ username, password, email }) {
  try {
    if ((!username || !email) && !password) {
      throw new Error("Empty fields");
    }

    if (await checkPassword({ username, password, email })) {
      return { username, isAuth: true };
    }
    throw new Error("Login failed!");
  } catch (error) {
    throw new Error("Login failed!");
  }
}

async function foundUserWithEmail(email) {
  const foundedUser = await User.findOne({
    email,
  });

  return foundedUser;
}

async function foundUserWithUsername(username) {
  const foundedUser = await User.findOne({
    username,
  });

  return foundedUser;
}

async function hashPassword(password) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

async function checkPassword({ username, email, password }) {
  const foundedUser = username
    ? await foundUserWithUsername(username)
    : await foundUserWithEmail(email);

  const passwordIsCorrect = await comparePassword(
    password,
    foundedUser.password
  );

  return passwordIsCorrect;
}

module.exports = {
  registerUser,
  loginUser,
};
