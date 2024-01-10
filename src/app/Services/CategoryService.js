require("dotenv").config();

const { throwError } = require("../Utils/index");
const { checkData } = require("./CommonService");

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

  createTool: async (data) => {
    try {
      const tool = await Tool.create(data);
      return tool;
    } catch (error) {
      throw error;
    }
  },

  updateTool: async (toolId, data) => {
    try {
      return checkData(toolId, Tool, async () => {
        const toolUpdate = await Tool.updateOne({ _id: toolId }, data);
        return toolUpdate;
      });
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

  PlusAmountTool: async (toolId) => {
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
