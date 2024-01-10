module.exports = (app) => {
  const UserService = require("../Services/UserService");
  const { onResponse, checkNullRequest } = require("../Utils/index");
  const { onRouteCustom } = require("../Middlewares/index");

  const controllerName = "user";
  const onRoute = (method, route, handler, accuracy) => {
    onRouteCustom(app, controllerName, method, route, handler, accuracy);
  };

  // API lấy danh sách thông tin người dùng
  onRoute(
    "get",
    "",
    async (req, res) => {
      try {
        const { tab, keySearch } = req.query;
        // Hàm xử lý logic và trả ra kết quả
        const result = await UserService.getAllUser({ tab, keySearch });

        // Hàm trả về response cho người dùng
        onResponse(res, result).ok({ sttValue: "Lấy dữ liệu thành công!" });
      } catch (error) {
        onResponse(res, null).badRequest(error);
      }
    },
    "ADMIN"
  );

  // API lấy thông tin người dùng
  onRoute("get", "/:userId", async (req, res) => {
    try {
      // Hàm xử lý logic và trả ra kết quả
      const result = await UserService.getOneUser(req.params.userId);

      // Hàm trả về response cho người dùng
      onResponse(res, result).ok({ sttValue: "Lấy dữ liệu thành công!" });
    } catch (error) {
      onResponse(res, null).badRequest(error);
    }
  });

  // API lưu thông tin người dùng
  onRoute("put", "", async (req, res) => {
    try {
      // Các hàm xử lý request
      const request = checkNullRequest(req.body, [
        "fullName",
        "phoneNumber",
        "gender",
      ]); // Yêu cầu phải có các trường này trong body

      // Hàm xử lý logic và trả ra kết quả
      const result = await UserService.saveOneUser(req.query.userId, {
        ...request,
        host: req.headers.host,
      });

      // Hàm trả về response cho người dùng
      onResponse(res, result).ok({ sttValue: "Lưu dữ liệu thành công!" });
    } catch (error) {
      onResponse(res, null).badRequest(error);
    }
  });

  // API cập trạng thái người dùng
  onRoute(
    "put",
    "/update-status",
    async (req, res) => {
      try {
        // Các hàm xử lý request
        const request = checkNullRequest(req.body, ["ids", "status"]); // Yêu cầu phải có các trường này trong body

        // Hàm xử lý logic và trả ra kết quả
        const result = await UserService.updateStatusUser(request);

        // Hàm trả về response cho người dùng
        onResponse(res, result).ok({
          sttValue: `Cập nhật ${result} dữ liệu thành công!`,
        });
      } catch (error) {
        onResponse(res, null).badRequest(error);
      }
    },
    "ADMIN"
  );

  // API nạp tiền cho người dùng
  onRoute(
    "put",
    "/topup",
    async (req, res) => {
      try {
        // Các hàm xử lý request
        const request = checkNullRequest(req.body, ["ids", "moneyBalance"]); // Yêu cầu phải có các trường này trong body

        // Hàm xử lý logic và trả ra kết quả
        const result = await UserService.updateMoneyBalanceUser(request);

        // Hàm trả về response cho người dùng
        onResponse(res, result).ok({
          sttValue: `Cập nhật ${result} dữ liệu thành công!`,
        });
      } catch (error) {
        onResponse(res, null).badRequest(error);
      }
    },
    "ADMIN"
  );
};
