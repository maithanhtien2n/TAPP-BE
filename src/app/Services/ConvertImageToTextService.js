require("dotenv").config();

const { throwError } = require("../Utils/index");
const { checkData } = require("./CommonService");

const Tesseract = require("tesseract.js");

const { default: mongoose } = require("mongoose");

module.exports = {
  convert: async (data) => {
    try {
      const { image, language } = data;

      const buffer = Buffer.from(image, "base64");

      const result = await Tesseract.recognize(buffer, language || "vie", {});

      return result.data.text;
    } catch (error) {
      throw error;
    }
  },
};
