// src/pages/Redirect.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Typography, Box } from "@mui/material";
import axios from "axios";

export default function RedirectPage() {
  const { shortcode } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const fetchOriginalUrl = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:4000/shorturls/${shortcode}`);

        if (res.data.success && res.data.data) {
          // Redirect to the original URL
          window.location.href = res.data.data;
        } else {
          setError("Unable to redirect. Link may have expired.");
        }
      } catch (err) {
        if (err.response && err.response.status === 410) {
          setError("This link has expired.");
        } else if (err.response && err.response.status === 404) {
          setError("Short URL not found.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOriginalUrl();
  }, [shortcode]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Redirecting...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return null;
}
