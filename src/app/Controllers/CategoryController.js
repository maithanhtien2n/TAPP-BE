module.exports = (app) => {
  const CategoryService = require("../Services/CategoryService");
  const { onResponse, checkNullRequest } = require("../Utils/index");
  const { onRouteCustom } = require("../Middlewares/index");

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
    "NO_AUTH"
  );

  // Api thêm tool vào danh sách
  onRoute(
    "post",
    "",
    async (req, res) => {
      try {
        // Các hàm xử lý request
        const request = checkNullRequest(req.body, [
          "image",
          "title",
          "routeName",
        ]); // Yêu cầu phải có các trường này trong body

        // Hàm xử lý logic và trả ra kết quả
        const result = await CategoryService.createTool(request);

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
        const result = await CategoryService.PlusAmountTool(req.params.toolId);

        // Hàm trả về response cho người dùng
        onResponse(res, result).ok({ sttValue: "Lưu dữ liệu thành công!" });
      } catch (error) {
        onResponse(res, null).badRequest(error);
      }
    },
    "NO_AUTH"
  );
};
