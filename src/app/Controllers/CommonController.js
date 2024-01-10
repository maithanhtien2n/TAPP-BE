module.exports = (app) => {
  const CommonService = require("../Services/DemoService");
  const { onResponse, checkNullRequest } = require("../Utils/index");

  const controllerName = "common";
  const onRoute = (method, route, handler) => {
    app[method](`/api/v1/${controllerName}/${route}`, handler);
  };

  // API mở file ảnh hoặc video
  const onApiOpenFile = (folderName = "") => {
    app.get(`/uploads${folderName}/:name`, (req, res) => {
      const fileName = req.params.name;
      const options = {
        root: `uploads${folderName}`,
        headers: {
          "Content-Type": fileName.endsWith(".mp4") ? "video/mp4" : "image",
        },
      };
      res.sendFile(fileName, options, (err) => {
        if (err) res.status(400).end();
      });
    });
  };
  onApiOpenFile("/avatar-user");
  onApiOpenFile("/img-common");
};
