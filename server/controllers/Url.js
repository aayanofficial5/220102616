const Click = require("../models/Click");
const ShortUrl = require("../models/ShortUrl");
const { nanoid } = require("nanoid");
// require("dotenv").config();
// const { CLIENT_URL } = process?.env;

exports.createShortUrl = async (req, res) => {
  try {
    const { url, validity = 30, shortcode } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    // Check if custom shortcode already exists
    if (shortcode) {
      const exists = await ShortUrl.findOne({ shortcode });
      if (exists) {
        return res.status(400).json({ error: "Shortcode already taken" });
      }
    }

    // Generate code if not provided
    const code = shortcode || nanoid(6);

    // Expiry time
    const expiryDate = new Date(Date.now() + validity * 60 * 1000);

    // Create and save in DB
    const newShortUrl = new ShortUrl({
      shortcode: code,
      originalUrl: url,
      expiry: expiryDate,
    });

    await newShortUrl.save();

    return res.status(201).json({
      shortLink: `http://localhost:${process.env.PORT || 3000}/${code}`,
      expiry: expiryDate.toISOString(),
    });
  } catch (err) {
    console.error("Error creating short URL:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.handleGetShortUrl = async (req, res) => {
  try {
    const { shortcode } = req.params;
    const { stats } = req.query; // ?stats=true or undefined

    const shortUrl = await ShortUrl.findOne({ shortcode }).populate(
      "clickLogs"
    );
    if (!shortUrl) {
      return res.status(404).json({ error: "Shortcode not found" });
    }

    // If stats requested → return analytics JSON
    if (stats === "true") {
      return res.json({
        originalUrl: shortUrl.originalUrl,
        createdAt: shortUrl.createdAt,
        expiry: shortUrl.expiry,
        totalClicks: shortUrl.clicks,
        clickDetails: shortUrl.clickLogs.map((c) => ({
          timestamp: c.timestamp,
          referrer: c.referrer,
          ip: c.ip,
          location: c.location || "unknown",
        })),
      });
    }

    // Otherwise → treat as redirect + log click
    if (new Date() > shortUrl.expiry) {
      return res.status(410).send("Link expired");
    }

    const click = new Click({
      shortUrl: shortUrl._id,
      referrer: req.get("Referrer") || "direct",
      ip: req.ip,
    });
    await click.save();

    shortUrl.clicks++;
    shortUrl.clickLogs.push(click._id);
    await shortUrl.save();

    return res.status(200).json({
      success: true,
      data: shortUrl.originalUrl,
    });
  } catch (err) {
    console.error("Error in GET /shorturls/:shortcode:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
