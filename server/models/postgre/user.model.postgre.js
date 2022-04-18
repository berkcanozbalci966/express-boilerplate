const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../../config/server.config");

const prisma = new PrismaClient();
class UserModel {
  _prisma = new PrismaClient();

  async createUser(data) {
    const { password, ...withoutPassword } = data;
    const hashedPassword = await this.hashPassword(password);
    return await this._prisma.user.create({
      data: {
        ...withoutPassword,
        password: hashedPassword,
      },
    });
  }

  async loginUser({ username, password, email }) {
    try {
      if ((!username || !email) && !password) {
        throw new Error("Empty fields");
      }
    } catch (error) {}
  }

  async getAllUsers() {
    return await this._prisma.user.findMany();
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
  }

  async comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }
}

module.exports = { UserModel };
