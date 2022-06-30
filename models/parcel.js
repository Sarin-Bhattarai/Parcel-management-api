const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema; //for references

const parcelSchema = new mongoose.Schema(
  {
    code: {
      type: Number,
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "delivering", "rejected", "delivered"],
      default: "pending",
    },

    name: {
      type: String,
      required: true,
    },

    location: {
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
