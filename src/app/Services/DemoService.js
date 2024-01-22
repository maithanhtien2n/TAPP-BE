require("dotenv").config();

const { throwError } = require("../Utils/index");

const { Product } = require("../Models/DemoModel");

const CommonService = require("./CommonService");

module.exports = {
  createProduct: async (data) => {
    try {
      const product = await CommonService.uploadFile(
        Product,
        { field: "productImage", location: "demo/" },
        data
      );
      return product;
    } catch (error) {
      throw error;
    }
  },
};
