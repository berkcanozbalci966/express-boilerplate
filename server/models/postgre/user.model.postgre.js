const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../../config/server.config");

class UserModel {
  _prisma = new PrismaClient();

  async createUser(data) {
    const { password, payloadWithoutPassword } = data;
    const hashedPassword = await hashPassword(password);

    return this._prisma.user.create({
      data: {
        ...payloadWithoutPassword,
        payload: hashedPassword,
      },
    });
  }

  getAllUsers() {
    return this._prisma.user.findMany();
  }

  private;

  async hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
  }
}

module.exports = {
  UserModel,
};
