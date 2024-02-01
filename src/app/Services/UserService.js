require("dotenv").config();

const { throwError, cloneObjectWithoutFields } = require("../Utils/index");
const { uploadFile, checkData } = require("./CommonService");

const { User } = require("../Models/UserModel");
const { default: mongoose } = require("mongoose");

module.exports = {
  getAllUser: async ({ tab, keySearch }) => {
    try {
      const all = await User.find({ role: "USER" });
      const active = all.filter(({ status }) => status === "ACTIVE");
      const locked = all.filter(({ status }) => status === "LOCKED");

      switch (tab) {
        case "ALL":
          return {
            all: all.filter(
              ({ userName, phoneNumber }) =>
                userName.includes(keySearch) || phoneNumber.includes(keySearch)
            ),
            active,
            locked,
          };
        case "ACTIVE":
          return {
            all,
            active: active.filter(
              ({ userName, phoneNumber }) =>
                userName.includes(keySearch) || phoneNumber.includes(keySearch)
            ),
            locked,
          };
        case "LOCKED":
          return {
            all,
            active,
            locked: locked.filter(
              ({ userName, phoneNumber }) =>
                userName.includes(keySearch) || phoneNumber.includes(keySearch)
            ),
          };
      }
    } catch (error) {
      throw error;
    }
  },

  getOneUser: async (userId) => {
    try {
      return checkData(userId, User, (value) =>
        cloneObjectWithoutFields(value, ["password", "__v"])
      );
    } catch (error) {
      throw error;
    }
  },

  saveOneUser: async (userId, data) => {
    try {
      const updateUser = await uploadFile(
        User,
        { field: "avatar", location: "avatar-user/" },
        userId,
        data
      );

      return updateUser;
    } catch (error) {
      throw error;
    }
  },

  updateStatusUser: async ({ ids, status }) => {
    try {
      if (!ids.length) {
        return ids.length + " dòng";
      }

      for (const id of ids) {
        await User.updateOne({ _id: id }, { status });
      }

      return ids.length + " dòng";
    } catch (error) {
      throw error;
    }
  },

  updateMoneyBalanceUser: async ({ ids, moneyBalance }) => {
    try {
      if (!ids.length) {
        return ids.length + " dòng";
      }

      if (+moneyBalance > 1000000) {
        throwError(401, "Số tiền mỗi lần nạp phải nhỏ hơn 1.000.000 vnđ");
      }

      for (const id of ids) {
        const user = await User.findById(id);
        await User.updateOne(
          { _id: id },
          { moneyBalance: +user.moneyBalance + +moneyBalance }
        );
      }

      return ids.length + " dòng";
    } catch (error) {
      throw error;
    }
  },
};
