const mongoose = require("mongoose");

const dataSchema = mongoose.Schema(
  {
    elecConsumption: {
      type: Number,
      required: true,
    },

    elecCost: {
      type: Number,
      required: true,
    },

    waterConsumption: {
      type: Number,
      required: true,
    },

    waterCost: {
      type: Number,
      required: true,
    },

    gasConsumption: {
      type: Number,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },

  {
    timestamps: true,
  }
);

const MockData = mongoose.model("MockData", dataSchema);
module.exports = MockData;
