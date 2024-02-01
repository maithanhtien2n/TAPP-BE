const mongoose = require("../../Database/ConnectDatabase");
const Schema = mongoose.Schema;

const BankAccount = mongoose.model(
  "BankAccount",
  new Schema(
    {
      imgQr: { type: String, required: true },
      bankName: { type: String, required: true },
      accountName: { type: String, required: true },
      accountNumber: { type: Number, required: true },
      note: { type: String, required: true, default: "" },
    },
    { timestamps: true }
  )
);

module.exports = { BankAccount };
