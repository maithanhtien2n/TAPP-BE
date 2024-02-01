require("dotenv").config();

const { throwError } = require("../Utils/index");
const { uploadFile, checkData } = require("./CommonService");

const { Tool } = require("../Models/ToolModel");
const { default: mongoose } = require("mongoose");

module.exports = {
  getTool: async () => {
    try {
      const listTool = await Tool.find({});
      return listTool;
    } catch (error) {
      throw error;
    }
  },

  getOneTool: async (toolId) => {
    try {
      return checkData(toolId, Tool, async (tool) => tool);
    } catch (error) {
      throw error;
    }
  },

  saveTool: async (toolId, data) => {
    try {
      const tool = await Tool.findOne({ routeName: data.routeName });
      if (tool && !toolId) {
        throwError(400, "Tên đường dẫn đã tồn tại!");
      }

      const saveTool = await uploadFile(
        Tool,
        { field: "image", location: "img-tool/" },
        toolId,
        data
      );

      return saveTool;
    } catch (error) {
      throw error;
    }
  },

  deleteTool: async (id) => {
    try {
      return checkData(id, Tool, async () => {
        const deleteTool = await Tool.deleteOne({ _id: id });
        return deleteTool;
      });
    } catch (error) {
      throw error;
    }
  },

  plusAmountTool: async (toolId) => {
    try {
      return checkData(toolId, Tool, async (value) => {
        const toolUpdate = await Tool.updateOne(
          { _id: toolId },
          { amount: +value.amount + 1 }
        );
        return toolUpdate;
      });
    } catch (error) {
      throw error;
    }
  },
};
