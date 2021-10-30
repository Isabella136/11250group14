const mongoose = require("mongoose");

const dataSchema = mongoose.Schema(
  {
    month: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    value: {
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
