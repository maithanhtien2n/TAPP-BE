require("dotenv").config();

const { chatBot, throwError, isObjectId } = require("../Utils/index");
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

      let messages = [{ role: "system", content: virtualAssistant.system }];

      for (const item of data.contents) {
        messages.push(item);
      }

      const result = await chatBot(messages);

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

  saveTrain: async ({ userId, system }) => {
    try {
      return checkData(userId, User, async (value) => {
        const virtualAssistant = await VirtualAssistant.findOne({
          userId: value._id,
        });
        if (virtualAssistant) {
          const virtualAssistantUpdate = await VirtualAssistant.updateOne(
            { userId: value._id },
            { system }
          );
          return virtualAssistantUpdate;
        } else {
          const virtualAssistantCreate = await VirtualAssistant.create({
            userId: value._id,
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
