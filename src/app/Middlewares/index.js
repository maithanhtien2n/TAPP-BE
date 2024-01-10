const jwt = require("jsonwebtoken");
require("dotenv").config();
const { throwError } = require("../Utils/index");
const { User } = require("../Models/UserModel");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  try {
    if (!token) {
      throwError(401, "Vui lòng đăng nhập để sử dụng tính năng này!");
    }

    jwt.verify(token, process.env.JWT_SECRET, async (error, data) => {
      try {
        if (error) {
          if (error.name === "TokenExpiredError") {
            throwError(402, "Phiên đăng nhập đã hết hạn!");
          } else if (error.name === "JsonWebTokenError") {
            throwError(403, "Lỗi xác thực token!");
          }
        }

        req.data = data;

        const user = await User.findById(data.userId);

        if (user.status === "LOCKED") {
          throwError(405, "Tài khoản của bạn đã bị khóa!");
        }

        next();
      } catch (error) {
        return res.status(400).json({
          success: false,
          statusCode: error?.sttCode || 400,
          statusValue: error?.sttValue || "Xác thực thất bại!",
          data: null,
        });
      }
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: error?.sttCode || 400,
      statusValue: error?.sttValue || "Xác thực thất bại!",
      data: null,
    });
  }
};

const onRouteCustom = (
  app,
  controllerName,
  method,
  route,
  handler,
  requireAuthentication = "USER"
) => {
  const middleware =
    requireAuthentication === "NO_AUTH"
      ? (req, res, next) => next()
      : authenticateToken;

  const checkRole =
    requireAuthentication === "NO_AUTH"
      ? (req, res, next) => next()
      : (req, res, next) => {
          try {
            if (
              req.data.role === requireAuthentication ||
              req.data.role === "ADMIN"
            ) {
              next();
            } else {
              throwError(401, "Bạn không có quyền thực hiện tính năng này!");
            }
          } catch (error) {
            return res.status(400).json({
              success: false,
              statusCode: error?.sttCode || 400,
              statusValue: error?.sttValue || "Xác thực người dùng thất bại!",
              data: null,
            });
          }
        };

  app[method](
    `/api/v1/${controllerName}${route}`,
    middleware,
    checkRole,
    handler
  );
};

module.exports = {
  authenticateToken,
  onRouteCustom,
};
