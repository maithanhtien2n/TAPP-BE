require("dotenv").config();

const { onChatBot, throwError, isObjectId } = require("../Utils/index");
const { checkData } = require("./CommonService");

const { VirtualAssistant } = require("../Models/VirtualAssistantModel");
const { User } = require("../Models/UserModel");

const { default: mongoose } = require("mongoose");

module.exports = {
  chat: async (data) => {
    try {
      if (!isObjectId(data.userId)) {
        throwError(401, "Không tồn tại bản ghi!");
      }

      const virtualAssistant = await VirtualAssistant.findOne({
        userId: data.userId,
      });

      if (!virtualAssistant) {
        throwError(401, "Bot chưa được cấu hình!");
      }

      const messages = [
        {
          role: "system",
          content: virtualAssistant.system,
        },
        {
          role: "assistant",
          content:
            virtualAssistant.assistant + "(Trợ lý ảo do tapp.com tạo ra.)",
        },
        {
          role: "user",
          content: data.content,
        },
      ];

      const result = await onChatBot(messages);

      return result;
    } catch (error) {
      throw error;
    }
  },

  getTrain: async (userId) => {
    try {
      return checkData(userId, User, async (value) => {
        if (!value) {
          throwError(401, "Bản ghi không tồn tại!");
        }
        const virtualAssistant = await VirtualAssistant.findOne({
          userId: value._id,
        });

        return virtualAssistant;
      });
    } catch (error) {
      throw error;
    }
  },

  saveTrain: async ({ userId, assistant, system }) => {
    try {
      return checkData(userId, User, async (value) => {
        const virtualAssistant = await VirtualAssistant.findOne({
          userId: value._id,
        });
        if (virtualAssistant) {
          const virtualAssistantUpdate = await VirtualAssistant.updateOne(
            { userId: value._id },
            { assistant, system }
          );
          return virtualAssistantUpdate;
        } else {
          const virtualAssistantCreate = await VirtualAssistant.create({
            assistant,
            system,
          });
          return virtualAssistantCreate;
        }
      });
    } catch (error) {
      throw error;
    }
  },

  checkLinkChat: async (userId) => {
    try {
      return checkData(userId, User, async (value) => {
        return {
          fullName: value.fullName,
          userName: value.userName,
        };
      });
    } catch (error) {
      throw error;
    }
  },
};
