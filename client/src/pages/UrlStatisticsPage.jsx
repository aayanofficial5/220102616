import React, { useState } from "react";
import { Container, Typography, Box, Button, TextField } from "@mui/material";
import StatsTable from "../components/StatsTable";
import axios from "axios";

export default function UrlStatisticsPage() {
  const [shortcode, setShortcode] = useState("");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchStats = async () => {
    if (!shortcode) {
      alert("Please enter a shortcode first.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/shorturls/${shortcode}?stats=true`);
      setStats({
        shortUrl: `http://localhost:5173/${shortcode}`,
        originalUrl: res.data.originalUrl,
        createdAt: res.data.createdAt,
        expiry: res.data.expiry,
        totalClicks: res.data.totalClicks,
        clicks: res.data.clickDetails,
      });
    } catch (err) {
      console.error("Error fetching stats:", err);
      alert(err.response?.data?.error || "Failed to load statistics.");
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" className="page-container">
      <Typography variant="h4" gutterBottom className="page-title">
        URL Statistics
      </Typography>

      <Box className="button-group">
        <TextField
          label="Enter Shortcode"
          value={shortcode}
          onChange={(e) => setShortcode(e.target.value)}
          variant="outlined"
          size="small"
          style={{ marginRight: "10px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={fetchStats}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load Statistics"}
        </Button>
      </Box>

      {stats && (
        <Box className="results-container" sx={{ marginTop: 3 }}>
          <StatsTable stats={[stats]} />
        </Box>
      )}
    </Container>
  );
}
