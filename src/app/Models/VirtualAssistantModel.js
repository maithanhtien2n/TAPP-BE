const mongoose = require("../../Database/ConnectDatabase");
const Schema = mongoose.Schema;

const VirtualAssistant = mongoose.model(
  "VirtualAssistant",
  new Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      system: { type: String },
    },
    { timestamps: true }
  )
);

module.exports = { VirtualAssistant };
