module.exports = (app) => {
  const BankAccountService = require("../Services/BankAccountService");
  const { onResponse, checkNullRequest } = require("../Utils/index");
  const { onRouteCustom } = require("../Middlewares/index");

  const controllerName = "bank-account";
  const onRoute = (method, route, handler, accuracy) => {
    onRouteCustom(app, controllerName, method, route, handler, accuracy);
  };

  // API lấy danh sách tài khoản ngân hàng
  onRoute(
    "get",
    "",
    async (req, res) => {
      try {
        // Hàm xử lý logic và trả ra kết quả
        const result = await BankAccountService.getAllBankAccount();

        // Hàm trả về response cho người dùng
        onResponse(res, result).ok({ sttValue: "Lấy dữ liệu thành công!" });
      } catch (error) {
        onResponse(res, null).badRequest(error);
      }
    },
    "ADMIN"
  );

  // API lấy thông tin tài khoản ngân hàng
  onRoute("get", "/:bankAccountId", async (req, res) => {
    try {
      // Hàm xử lý logic và trả ra kết quả
      const result = await BankAccountService.getOneBankAccount(
        req.params.bankAccountId
      );

      // Hàm trả về response cho người dùng
      onResponse(res, result).ok({ sttValue: "Lấy dữ liệu thành công!" });
    } catch (error) {
      onResponse(res, null).badRequest(error);
    }
  });

  // API lưu thông tin tài khoản ngân hàng
  onRoute(
    "put",
    "",
    async (req, res) => {
      try {
        // Các hàm xử lý request
        const request = checkNullRequest(req.body, [
          "imgQr",
          "bankName",
          "accountName",
          "accountNumber",
        ]); // Yêu cầu phải có các trường này trong body

        // Hàm xử lý logic và trả ra kết quả
        const result = await BankAccountService.saveOneBankAccount(
          req.query.bankAccountId,
          {
            ...request,
            host: req.headers.host,
          }
        );

        // Hàm trả về response cho người dùng
        onResponse(res, result).ok({ sttValue: "Lưu dữ liệu thành công!" });
      } catch (error) {
        onResponse(res, null).badRequest(error);
      }
    },
    "ADMIN"
  );
};
