module.exports = (app) => {
  const CategoryService = require("../Services/CategoryService");
  const { onResponse, checkNullRequest } = require("../Utils/index");
  const {
    onRouteCustom,
    authenticateProTool,
  } = require("../Middlewares/index");

  const controllerName = "category";
  const onRoute = (method, route, handler, accuracy) => {
    onRouteCustom(app, controllerName, method, route, handler, accuracy);
  };

  // Api lấy danh sách tool
  onRoute(
    "get",
    "",
    async (req, res) => {
      try {
        // Hàm xử lý logic và trả ra kết quả
        const result = await CategoryService.getTool();

        // Hàm trả về response cho người dùng
        onResponse(res, result).ok({ sttValue: "Lấy dữ liệu thành công!" });
      } catch (error) {
        onResponse(res, null).badRequest(error);
      }
    },
    "NO_AUTH"
  );

  // Api lấy chi tiết tool
  onRoute(
    "get",
    "/:toolId",
    async (req, res) => {
      try {
        // Hàm xử lý logic và trả ra kết quả
        const result = await CategoryService.getOneTool(req.params.toolId);

        // Hàm trả về response cho người dùng
        onResponse(res, result).ok({ sttValue: "Lấy dữ liệu thành công!" });
      } catch (error) {
        onResponse(res, null).badRequest(error);
      }
    },
    "ADMIN"
  );

  // Api lưu tool vào danh sách
  onRoute(
    "put",
    "",
    async (req, res) => {
      try {
        // Các hàm xử lý request
        const request = checkNullRequest(req.body, ["title", "routeName"]); // Yêu cầu phải có các trường này trong body

        // Hàm xử lý logic và trả ra kết quả
        const result = await CategoryService.saveTool(req.query.toolId, {
          ...request,
          host: req.headers.host,
        });

        // Hàm trả về response cho người dùng
        onResponse(res, result).ok({ sttValue: "Thêm dữ liệu thành công!" });
      } catch (error) {
        onResponse(res, null).badRequest(error);
      }
    },
    "ADMIN"
  );

  // Api sửa tool trong danh sách
  onRoute(
    "put",
    "/:toolId",
    async (req, res) => {
      try {
        // Các hàm xử lý request

        // Hàm xử lý logic và trả ra kết quả
        const result = await CategoryService.updateTool(
          req.params.toolId,
          req.body
        );

        // Hàm trả về response cho người dùng
        onResponse(res, result).ok({ sttValue: "Lưu dữ liệu thành công!" });
      } catch (error) {
        onResponse(res, null).badRequest(error);
      }
    },
    "ADMIN"
  );

  // Api xóa tool trong danh sách
  onRoute(
    "delete",
    "/:id",
    async (req, res) => {
      try {
        // Hàm xử lý logic và trả ra kết quả
        const result = await CategoryService.deleteTool(req.params.id);

        // Hàm trả về response cho người dùng
        onResponse(res, result).ok({ sttValue: "Xóa dữ liệu thành công!" });
      } catch (error) {
        onResponse(res, null).badRequest(error);
      }
    },
    "ADMIN"
  );

  // Api cộng số lượt sử dụng tool
  onRoute(
    "put",
    "/plus-amount/:toolId",
    async (req, res) => {
      try {
        // Hàm xử lý logic và trả ra kết quả
        const result = await CategoryService.plusAmountTool(req.params.toolId);

        // Hàm trả về response cho người dùng
        onResponse(res, result).ok({ sttValue: "Lưu dữ liệu thành công!" });
      } catch (error) {
        onResponse(res, null).badRequest(error);
      }
    },
    "NO_AUTH"
  );

  // Api kiểm tra có phải tool pro không
  onRoute("put", "/check/pro-tool", async (req, res) => {
    try {
      const requestHeaders = checkNullRequest(req.headers, ["toolid"]);
      await authenticateProTool(requestHeaders.toolid, req.data.isUserPro);

      // Hàm trả về response cho người dùng
      onResponse(res, "Ứng dụng này được sài free!").ok({
        sttValue: "Lấy dữ liệu thành công!",
      });
    } catch (error) {
      onResponse(res, null).badRequest(error);
    }
  });
};
