module.exports = (app) => {
  const AuthService = require("../Services/AuthService");
  const { onResponse, checkNullRequest } = require("../Utils/index");

  const controllerName = "auth";
  const onRoute = (method, route, handler) => {
    app[method](`/api/v1/${controllerName}/${route}`, handler);
  };

  // API đăng ký tài khoản
  onRoute("post", "register", async (req, res) => {
    try {
      // Các hàm xử lý request
      checkNullRequest(req.body, ["userName", "password"]); // Yêu cầu phải có các trường này trong body

      // Dữ liệu từ request
      const { userName, password } = req.body;

      // Hàm xử lý logic và trả ra kết quả
      const result = await AuthService.register({ userName, password });

      // Hàm trả về response cho người dùng
      onResponse(res, result).ok({ sttValue: "Đăng ký tài khoản thành công!" });
    } catch (error) {
      onResponse(res, null).badRequest(error);
    }
  });

  // API đăng nhập
  onRoute("post", "login", async (req, res) => {
    try {
      // Các hàm xử lý request
      checkNullRequest(req.body, ["userName", "password"]); // Yêu cầu phải có các trường này trong body

      // Dữ liệu từ request
      const { userName, password } = req.body;

      // Hàm xử lý logic và trả ra kết quả
      const result = await AuthService.login({ userName, password });

      // Hàm trả về response cho người dùng
      onResponse(res, result).ok({ sttValue: "Đăng nhập thành công!" });
    } catch (error) {
      onResponse(res, null).badRequest(error);
    }
  });
};
