const { throwError, isObjectId } = require("../Utils/index");
const { Tool } = require("../Models/ToolModel");

module.exports = async (toolId, isUserPro) => {
  try {
    if (!isObjectId(toolId)) {
      throwError(400, "Trang không tồn tại!");
    }

    const tool = await Tool.findById(toolId);
    if (tool.isProTool) {
      if (!isUserPro) {
        throwError(400, "Tính năng chỉ dành cho tài khoản pro!");
      }
    }
  } catch (error) {
    throw error;
  }
};
