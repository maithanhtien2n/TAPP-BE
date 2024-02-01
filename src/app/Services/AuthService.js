require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { throwError, cloneObjectWithoutFields } = require("../Utils/index");
const { checkData } = require("./CommonService");
const CommonService = require("./CommonService");

const { User } = require("../Models/UserModel");

module.exports = {
  register: async ({ userName, password }) => {
    try {
      const user = await User.findOne({ userName });

      if (user) {
        throwError(201, "Tên người dùng đã tồn tại!");
      }

      await User.create({
        userName,
        password: bcrypt.hashSync(password, 10), // Mã hóa mật khẩu
        role: "USER",
      });

      return { userName, role: "USER" };
    } catch (error) {
      throw error;
    }
  },

  login: async ({ userName, password }) => {
    try {
      const user = await User.findOne({ userName });

      if (!user || !bcrypt.compareSync(password, user.password)) {
        throwError(202, "Tên tài khoản hoặc mật khẩu không chính xác!");
      }

      if (user.status === "LOCKED") {
        throwError(203, "Tài khoản của bạn đã bị khóa!");
      }

      return {
        userData: cloneObjectWithoutFields(user, ["password", "__v"]),
        accessToken: jwt.sign(
          { userId: user._id, role: user.role, isUserPro: user.isUserPro },
          process.env.JWT_SECRET,
          { expiresIn: "2h" }
        ),
      };
    } catch (error) {
      throw error;
    }
  },
};
