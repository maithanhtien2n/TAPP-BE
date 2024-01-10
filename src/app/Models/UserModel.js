const mongoose = require("../../Database/ConnectDatabase");
const Schema = mongoose.Schema;

const User = mongoose.model(
  "User",
  new Schema(
    {
      userName: { type: String, required: true },
      password: { type: String, required: true },
      role: { type: String, required: true, default: "USER" },
      avatar: { type: String, required: false, default: "" },
      fullName: { type: String, required: false, default: "" },
      phoneNumber: { type: String, required: false, default: "" },
      gender: { type: String, required: false, default: "" },
      moneyBalance: { type: Number, required: true, default: 0 },
      status: { type: String, required: false, default: "ACTIVE" },
    },
    { timestamps: true }
  )
);

module.exports = { User };
