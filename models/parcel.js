const mongoose = require("mongoose");

const parcelSchema = new mongoose.Schema(
  {
    code: {
      type: Number,
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "departed", "delivered"],
      default: "pending",
    },

    name: {
      type: String,
      required: true,
    },

    origin: {
      type: String,
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    remarks: [
      {
        type: String,
        trim: true,
      },
    ],
    logs: [{ type: mongoose.Schema.Types.Mixed }],
  },

  { timestamps: true }
);

module.exports = mongoose.model("Parcel", parcelSchema);
