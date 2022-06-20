const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema; //for references

const parcelSchema = new mongoose.Schema(
  {
    code: {
      type: Number,
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

    description: {
      type: String,
    },

    remarks: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Parcel", parcelSchema);
