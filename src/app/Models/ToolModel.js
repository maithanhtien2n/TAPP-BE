const mongoose = require("../../Database/ConnectDatabase");
const Schema = mongoose.Schema;

const Tool = mongoose.model(
  "Tool",
  new Schema(
    {
      image: { type: String, required: true },
      title: { type: String, required: true },
      amount: { type: Number, required: true, default: 0 },
      routeName: { type: String, required: true },
    },
    { timestamps: true }
  )
);

module.exports = { Tool };
