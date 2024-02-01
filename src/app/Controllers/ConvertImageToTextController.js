module.exports = (app) => {
  const ConvertImageToTextService = require("../Services/ConvertImageToTextService");
  const { onResponse, checkNullRequest } = require("../Utils/index");
  const {
    onRouteCustom,
    authenticateProTool,
  } = require("../Middlewares/index");

  const controllerName = "convert-image-to-text";
  const onRoute = (method, route, handler, accuracy) => {
    onRouteCustom(app, controllerName, method, route, handler, accuracy);
  };

  // Api chuyển đổi hình ảnh sang văn bản
  onRoute("post", "", async (req, res) => {
    try {
      // Các hàm xử lý request
      const requestHeaders = checkNullRequest(req.headers, ["toolid"]);
      await authenticateProTool(requestHeaders.toolid, req.data.isUserPro);
      const request = checkNullRequest(req.body, ["image", "language"]);

      // Hàm xử lý logic và trả ra kết quả
      const result = await ConvertImageToTextService.convert(request);

      // Hàm trả về response cho người dùng
      onResponse(res, result).ok({
        sttValue: "Chuyển đổi dữ liệu thành công!",
      });
    } catch (error) {
      onResponse(res, null).badRequest(error);
    }
  });
};
