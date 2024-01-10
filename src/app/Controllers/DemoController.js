module.exports = (app) => {
  const DemoService = require("../Services/DemoService");
  const { onResponse, checkNullRequest } = require("../Utils/index");

  const controllerName = "demo";
  const onRoute = (method, route, handler) => {
    app[method](`/api/v1/${controllerName}/${route}`, handler);
  };

  // API thêm sản phẩm
  onRoute("post", "product", async (req, res) => {
    try {
      // Các hàm xử lý request
      checkNullRequest(req, ["productName", "productImage", "productPrice"]); // Yêu cầu phải có các trường này trong body

      // Dữ liệu từ request
      const { productId, productName, productImage, productPrice } = req.body;

      // Hàm xử lý logic và trả ra kết quả
      const result = await DemoService.createProduct({
        productId,
        productName,
        productImage,
        productPrice,
        host: req.headers.host,
      });

      // Hàm trả về response cho người dùng
      onResponse(res, result).ok({ sttValue: "Lưu dữ liệu thành công!" });
    } catch (error) {
      onResponse(res, null).badRequest(error);
    }
  });
};
