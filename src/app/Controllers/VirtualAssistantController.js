module.exports = (app) => {
  const VirtualAssistantService = require("../Services/VirtualAssistantService");
  const { onResponse, checkNullRequest } = require("../Utils/index");
  const { onRouteCustom } = require("../Middlewares/index");

  const controllerName = "virtual-assistant";
  const onRoute = (method, route, handler, accuracy) => {
    onRouteCustom(app, controllerName, method, route, handler, accuracy);
  };

  // Api chat bot
  onRoute(
    "post",
    "/chat",
    async (req, res) => {
      try {
        // Các hàm xử lý request
        const request = checkNullRequest(req.body, ["userId", "content"]); // Yêu cầu phải có các trường này trong body

        // Hàm xử lý logic và trả ra kết quả
        const result = await VirtualAssistantService.chat(request);

        // Hàm trả về response cho người dùng
        onResponse(res, result).ok({
          sttValue: "Lấy dữ liệu thành công!",
        });
      } catch (error) {
        onResponse(res, null).badRequest(error);
      }
    },
    "NO_AUTH"
  );

  // Api lấy nội dung đào tạo bot
  onRoute("get", "/train/:userId", async (req, res) => {
    try {
      // Hàm xử lý logic và trả ra kết quả
      const result = await VirtualAssistantService.getTrain(req.params.userId);

      // Hàm trả về response cho người dùng
      onResponse(res, result).ok({
        sttValue: "Lấy dữ liệu thành công!",
      });
    } catch (error) {
      onResponse(res, null).badRequest(error);
    }
  });

  // Api lưu nội dung đào tạo cho bot
  onRoute("post", "/train", async (req, res) => {
    try {
      // Các hàm xử lý request
      const request = checkNullRequest(req.body, ["userId"]); // Yêu cầu phải có các trường này trong body

      // Hàm xử lý logic và trả ra kết quả
      const result = await VirtualAssistantService.saveTrain(request);

      // Hàm trả về response cho người dùng
      onResponse(res, result).ok({
        sttValue: "Lưu dữ liệu thành công!",
      });
    } catch (error) {
      onResponse(res, null).badRequest(error);
    }
  });

  // Api check link chat
  onRoute(
    "get",
    "/check-link-chat/:id",
    async (req, res) => {
      try {
        // Hàm xử lý logic và trả ra kết quả
        const result = await VirtualAssistantService.checkLinkChat(
          req.params.id
        );

        // Hàm trả về response cho người dùng
        onResponse(res, result).ok({
          sttValue: "Lấy dữ liệu thành công!",
        });
      } catch (error) {
        onResponse(res, null).badRequest(error);
      }
    },
    "NO_AUTH"
  );
};
