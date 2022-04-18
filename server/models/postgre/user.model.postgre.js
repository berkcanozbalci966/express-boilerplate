const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../../config/server.config");

class UserModel {
  _prisma = new PrismaClient();

  async create(data) {
    const { password, ...withoutPassword } = data;
    const hashedPassword = await this.hashPassword(password);
    const createdUser = await this._prisma.user.create({
      data: {
        ...withoutPassword,
        password: hashedPassword,
      },
    });

    return {
      username: createdUser.username,
      isAuth: true,
    };
  }

  async login({ username, password, email }) {
    try {
      if ((!username || !email) && !password) {
        throw new Error("Empty fields");
      }
      const checkPassword = await this.checkPassword({
        username,
        password,
        email,
      });

      if (!checkPassword) {
        throw new Error("Login failled333!");
      }

      return { success: true };
    } catch (error) {
      throw new Error("Login failled!");
    }
  }

  async getAll() {
    return await this._prisma.user.findMany();
  }

  async checkPassword({ username, email, password }) {
    const foundedUser = username
      ? await this.foundByUsername(username)
      : await this.foundByEmail(email);

    const checkPassword = this.comparePassword(password, foundedUser.password);

    return checkPassword;
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
  }

  async comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }

  async foundByUsername(username) {
    const foundedUser = await this._prisma.user.findUnique({
      where: {
        username,
      },
    });

    return foundedUser;
  }

  async foundByEmail(email) {
    const foundedUser = await this._prisma.user.findUnique({
      where: {
        email,
      },
    });

    return foundedUser;
  }
}

module.exports = { UserModel };
