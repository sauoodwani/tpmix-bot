const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    startTime: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Event = new mongoose.model("events", eventSchema);
