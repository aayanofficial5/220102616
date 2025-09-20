const express = require("express");
const {createShortUrl, handleGetShortUrl } = require("../controllers/Url");

const router = express.Router();

router.post("/",createShortUrl);
router.get("/:shortcode",handleGetShortUrl);

module.exports = router;