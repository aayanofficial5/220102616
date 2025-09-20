const mongoose = require("mongoose");

const clickSchema = new mongoose.Schema({
  shortUrl: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShortUrl",  
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  referrer: {
    type: String,
    default: "direct",
  },
  ip: {
    type: String,
  },
  location: {
    type: String, // e.g. "India" or "US-East"
  },
});

module.exports = mongoose.models.Click || mongoose.model("Click", clickSchema);
