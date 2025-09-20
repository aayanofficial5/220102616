const mongoose = require("mongoose");

const shortUrlSchema = new mongoose.Schema({
  shortcode: {
    type: String,
    required: true,
    unique: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
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
});

module.exports = mongoose.models.ShortUrl || mongoose.model("ShortUrl", shortUrlSchema);
