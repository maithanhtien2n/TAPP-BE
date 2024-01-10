const format = require("./format");
const render = require("./render");
const openai = require("./openai");
const { default: mongoose } = require("mongoose");
const { ObjectId } = require("mongodb");

module.exports = {
  ...openai,
  ...format,
  ...render,

  onResponse: (res, result) => ({
    ok: (message) => {
      return res.status(+message.sttCode || 200).json({
        success: true,
        statusCode: +message.sttCode || 200,
        statusValue: message.sttValue || "OK",
        executeDate: new Date(),
        data: result || null,
      });
    },
    badRequest: (message) => {
      return res.status(+message.sttCode || 400).json({
        success: false,
        statusCode: +message.sttCode || 400,
        statusValue: message.sttValue || message || "Lỗi call api!",
        executeDate: new Date(),
        data: null,
      });
    },
  }),

  checkNullRequest: (data, arrValue) => {
    for (const key of arrValue) {
      if (!data[key]) {
        throw {
          sttValue: "Lỗi code, không kiểm tra null!",
        };
      }
    }

    return data;
  },

  throwError: (sttCode, sttValue) => {
    throw { sttCode, sttValue };
  },

  isObjectId: (value) => {
    try {
      new ObjectId(value);
      return true;
    } catch (error) {
      return false;
    }
  },

  cloneObjectWithoutFields: (originalObject, fieldsToRemove) => {
    const cloneUser = { ...originalObject };

    let userData = {};

    for (const item of Object.keys(cloneUser._doc)) {
      if (!fieldsToRemove.includes(item)) {
        userData[item] = originalObject[item];
      }
    }

    return userData;
  },
};
