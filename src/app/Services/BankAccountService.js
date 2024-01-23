require("dotenv").config();

const { throwError, cloneObjectWithoutFields } = require("../Utils/index");
const { checkData } = require("./CommonService");
const CommonService = require("./CommonService");

const { BankAccount } = require("../Models/BankAccountModel");
const { default: mongoose } = require("mongoose");

module.exports = {
  getAllBankAccount: async () => {
    try {
      const bankAccount = await BankAccount.find();
      return bankAccount;
    } catch (error) {
      throw error;
    }
  },

  getOneBankAccount: async (bankAccountId) => {
    try {
      // return checkData(bankAccountId, BankAccount, (value) =>
      //   cloneObjectWithoutFields(value, ["__v"])
      // );

      const bankAccount = await BankAccount.find();
      return bankAccount[0];
    } catch (error) {
      throw error;
    }
  },

  saveOneBankAccount: async (data) => {
    try {
      const updateBankAccount = await CommonService.uploadFile(
        BankAccount,
        { field: "imgQr", location: "img-common/" },
        data?._id,
        data
      );

      return updateBankAccount;
    } catch (error) {
      throw error;
    }
  },
};
