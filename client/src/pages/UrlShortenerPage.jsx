// src/pages/UrlShortenerPage.js
import React, { useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import UrlInputForm from "../components/UrlInputForm";
import UrlResultCard from "../components/UrlResultCard";
import axios from "axios";

export default function UrlShortenerPage() {
  const [urls, setUrls] = useState([
    { id: 1, longUrl: "", validity: "", shortcode: "" },
  ]);
  const [results, setResults] = useState([]);

  // Base API URL from .env (Vite uses import.meta.env)
  const API_URL = import.meta.env.VITE_API_URL;

  const handleAddUrl = () => {
    if (urls.length < 5) {
      setUrls([
        ...urls,
        { id: urls.length + 1, longUrl: "", validity: "", shortcode: "" },
      ]);
    }
  };

  const handleInputChange = (id, field, value) => {
    setUrls(urls.map((u) => (u.id === id ? { ...u, [field]: value } : u)));
  };

  const handleSubmit = async () => {
    try {
      const shortenedResults = [];

      for (let url of urls) {
        if (!url.longUrl) continue;

        const res = await axios.post(`${API_URL}/shorturls`, {
          url: url.longUrl,
          validity: url.validity ? parseInt(url.validity) : 30, // backend default = 30 minutes
          shortcode: url.shortcode || null,
        });

        // Backend returns { shortLink, expiry }
        shortenedResults.push({
          originalUrl: url.longUrl,
          shortLink: res.data.shortLink,
          expiry: res.data.expiry,
        });
      }

      setResults(shortenedResults);
    } catch (err) {
      console.error("Error shortening URL:", err);
      alert(
        err.response?.data?.error ||
          "Something went wrong while shortening URLs."
      );
    }
  };

  return (
    <Container maxWidth="md" className="page-container">
      <Typography variant="h4" gutterBottom className="page-title">
        URL Shortener
      </Typography>

      {urls.map((url, index) => (
        <UrlInputForm
          key={url.id}
          index={index + 1}
          urlData={url}
          onChange={handleInputChange}
        />
      ))}

      <Box className="button-group">
        <Button
          variant="contained"
          onClick={handleAddUrl}
          disabled={urls.length >= 5}
        >
          + Add URL
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Shorten URLs
        </Button>
      </Box>

      {results.length > 0 && (
        <Box className="results-container">
          <Typography variant="h5" gutterBottom>
            Shortened Links
          </Typography>
          {results.map((r, idx) => (
            <UrlResultCard key={idx} result={r} />
          ))}
        </Box>
      )}
    </Container>
  );
}
