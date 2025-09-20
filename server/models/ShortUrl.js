const mongoose = require("mongoose");

const shortUrlSchema = new mongoose.Schema(
  {
    shortcode: {
      type: String,
      required: true,
      unique: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    expiry: {
      type: Date,
      required: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    clickLogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Click",
      },
    ],
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.ShortUrl || mongoose.model("ShortUrl", shortUrlSchema);
