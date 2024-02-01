const jwt = require("jsonwebtoken");
require("dotenv").config();
const { throwError } = require("../Utils/index");
const { User } = require("../Models/UserModel");

module.exports = (role) => ({
  authenticateToken: async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1];

      if (role === "NO_AUTH") {
        return next();
      }

      if (!token) {
        throwError(401, "Vui lòng đăng nhập để sử dụng tính năng này!");
      }

      try {
        const data = await jwt.verify(token, process.env.JWT_SECRET);

        if (role !== data.role && data.role !== "ADMIN") {
          throwError(401, "Bạn không có quyền thực hiện tính năng này!");
        }

        const user = await User.findById(data.userId);

        if (user.status === "LOCKED") {
          throwError(405, "Tài khoản của bạn đã bị khóa!");
        }

        req.data = data;

        next();
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          throwError(402, "Phiên đăng nhập đã hết hạn!");
        } else if (error.name === "JsonWebTokenError") {
          throwError(403, "Lỗi xác thực token!");
        } else {
          throw error;
        }
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        statusCode: error?.sttCode || 400,
        statusValue: error?.sttValue || "Xác thực token thất bại!",
        data: null,
      });
    }
  },
});
